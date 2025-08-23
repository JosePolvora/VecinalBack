const dbcvecinal = require("../models/index.models");
const path = require("path");
const fs = require("fs");

// Crear revista con múltiples imágenes
async function createRevista(req, res) {
  try {
    const { descripcion, mes } = req.body;

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

    if (!fs.existsSync(outputDir)) {
      fs.mkdirSync(outputDir, { recursive: true });
    }

    // Mover imágenes a carpeta final con el nombre original
    req.files.forEach((file, index) => {
      const newPath = path.join(outputDir, `${index + 1}_${file.originalname}`);
      fs.renameSync(file.path, newPath);
    });

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
// async function getRevistas(req, res) {
//   try {
//     const revistas = await dbcvecinal.Revista.findAll({
//       order: [["creado_en", "DESC"]],
//     });

//     res.status(200).json({
//       ok: true,
//       status: 200,
//       body: revistas,
//     });
//   } catch (error) {
//     res.status(500).json({
//       ok: false,
//       status: 500,
//       message: error.message,
//     });
//   }
// }

async function getRevistas(req, res) {
  try {
    const revistas = await dbcvecinal.Revista.findAll({
      order: [["creado_en", "DESC"]],
    });

    const revistasConImagenes = revistas.map((revista) => {
      const carpetaPath = path.join(
        __dirname,
        "..",
        "..",
        "public",
        revista.paginas_carpeta
      );

      let imagenes = [];
      if (fs.existsSync(carpetaPath)) {
        imagenes = fs
          .readdirSync(carpetaPath)
          .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
          .map((file) => `${revista.paginas_carpeta}/${file}`);
      }

      return { ...revista.dataValues, imagenes };
    });

    res.status(200).json({
      ok: true,
      status: 200,
      body: revistasConImagenes,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

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

    const carpetaPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      revista.paginas_carpeta
    );

    let imagenes = [];
    if (fs.existsSync(carpetaPath)) {
      imagenes = fs
        .readdirSync(carpetaPath)
        .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map((file) => `${revista.paginas_carpeta}/${file}`);
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

// Actualizar una revista
async function updaterRevistaById(req, res) {
  const { id } = req.params;
  const dataRevistas = req.body;

  try {
    const actualizada = await dbcvecinal.Revista.update(
      { descripcion: dataRevistas.descripcion },
      { where: { id } }
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
