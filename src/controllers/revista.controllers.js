const dbcvecinal = require("../models/index.models");
const path = require("path");
const fs = require("fs");

// Crear revista con múltiples imágenes

async function createRevista(req, res) {
  try {
    const { descripcion, mes } = req.body;

    // Verificar que haya archivos
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "No se enviaron imágenes.",
      });
    }

    // Verificar si ya existe revista con ese mes
    const revistaExistente = await dbcvecinal.Revista.findOne({
      where: { mes },
    });
    if (revistaExistente) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "Ya existe una revista con ese mes",
      });
    }

    // Carpeta para las imágenes
    const nombreCarpeta = mes.toLowerCase().replace(/\s+/g, "_");
    const paginas_carpeta = `/uploads/revistas/paginas/${nombreCarpeta}`;
    const outputDir = path.join(
      __dirname,
      "..",
      "..",
      "public",
      "uploads",
      "revistas",
      "paginas",
      nombreCarpeta
    );

    // Crear carpeta si no existe
    if (!fs.existsSync(outputDir)) {
      console.log("La carpeta no existe, creando:", outputDir);
      fs.mkdirSync(outputDir, { recursive: true });
    } else {
      console.log("La carpeta ya existe:", outputDir);
    }

    // Mover imágenes a carpeta final
    req.files.forEach((file, index) => {
      const newPath = path.join(outputDir, `${index + 1}_${file.originalname}`);
      console.log(`Moviendo archivo ${file.originalname} -> ${newPath}`);
      fs.renameSync(file.path, newPath);
    });

    // LOGS de depuración
    console.log("===== LOG REVISTA =====");
    console.log("Mes recibido:", mes);
    console.log("Descripción recibida:", descripcion);
    console.log("Carpeta de páginas:", paginas_carpeta);
    console.log(
      "Archivos subidos:",
      req.files.map((f) => f.originalname)
    );
    console.log("=======================");

    // Guardar en la base de datos
    const nuevaRevista = await dbcvecinal.Revista.create({
      mes,
      descripcion,
      paginas_carpeta,
    });

    res.status(201).json({
      ok: true,
      status: 201,
      message: "Revista creada correctamente con imágenes",
      body: nuevaRevista,
    });
  } catch (error) {
    console.error("❌ Error en createRevista:", error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

// Obtener todas las revistas
async function getRevistas(req, res) {
  try {
    const revistas = await dbcvecinal.Revista.findAll({
      order: [["creado_en", "DESC"]],
    });

    res.status(200).json({
      ok: true,
      status: 200,
      body: revistas,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

// Obtener una revista por ID
// async function getRevistaById(req, res) {
//   try {
//     const { id } = req.params;
//     const revista = await dbcvecinal.Revista.findByPk(id);

//     if (!revista) {
//       return res.status(404).json({
//         ok: false,
//         status: 404,
//         message: "Revista no encontrada",
//       });
//     }

//     res.status(200).json({
//       ok: true,
//       status: 200,
//       body: revista,
//     });
//   } catch (error) {
//     res.status(500).json({
//       ok: false,
//       status: 500,
//       message: error.message,
//     });
//   }
// }

// Obtener una revista por ID con sus imágenes
async function getRevistaById(req, res) {
  try {
    const { id } = req.params;
    const revista = await dbcvecinal.Revista.findByPk(id);

    if (!revista) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Revista no encontrada",
      });
    }

    // Carpeta absoluta
    const carpetaPath = path.join(
      __dirname,
      "../public",
      revista.paginas_carpeta
    );

    // Obtener archivos de la carpeta
    let imagenes = [];
    if (fs.existsSync(carpetaPath)) {
      imagenes = fs
        .readdirSync(carpetaPath)
        .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file)) // solo imágenes
        .map((file) => `${revista.paginas_carpeta}/${file}`); // devolver ruta pública
    }

    res.status(200).json({
      ok: true,
      status: 200,
      body: {
        ...revista.dataValues,
        imagenes,
      },
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

// Eliminar una revista por ID
async function deleteRevistaById(req, res) {
  try {
    const { id } = req.params;
    const revista = await dbcvecinal.Revista.findByPk(id);

    if (!revista) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Revista no encontrada",
      });
    }

    await revista.destroy();

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Revista eliminada correctamente",
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

async function updaterRevistaById(req, res) {
  const id = req.params.id;
  const dataRevistas = req.body;

  try {
    const actualizada = await dbcvecinal.Revista.update(
      {
        descripcion: dataRevistas.descripcion,
      },
      {
        where: { id },
      }
    );

    res.status(200).json({
      ok: true,
      status: 200,
      body: actualizada,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

module.exports = {
  createRevista,
  getRevistas,
  getRevistaById,
  deleteRevistaById,
  updaterRevistaById,
};
