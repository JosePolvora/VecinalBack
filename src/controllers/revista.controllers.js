const dbcvecinal = require("../models/index.models");
const path = require("path");
const fsp = require("fs/promises");
const fs = require("fs"); // lo dejamos para usar existsSync si hace falta
const archiver = require("archiver");


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

    try {
      await fsp.mkdir(outputDir, { recursive: true });
      console.log("📂 Carpeta creada:", outputDir);
    } catch (err) {
      console.error("⚠️ Error creando carpeta:", err);
    }

    // Mover imágenes a carpeta final con el nombre original
    await Promise.all(
      req.files.map((file, index) => {
        const newPath = path.join(outputDir, `${index + 1}_${file.originalname}`);
        return fsp.rename(file.path, newPath);
      })
    );

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

async function getRevistas(req, res) {
  try {
    const revistas = await dbcvecinal.Revista.findAll({
      order: [["creado_en", "DESC"]],
    });

    const revistasConImagenes = await Promise.all(
      revistas.map(async (revista) => {
        const carpetaPath = path.join(
          __dirname,
          "..",
          "..",
          "public",
          revista.paginas_carpeta
        );

        let imagenes = [];
        try {
          const files = await fsp.readdir(carpetaPath);
          imagenes = files
            .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
            .map((file) => `${revista.paginas_carpeta}/${file}`);
        } catch {
          // si no existe la carpeta no pasa nada
        }

        return { ...revista.dataValues, imagenes };
      })
    );

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
    try {
      const files = await fsp.readdir(carpetaPath);
      imagenes = files
        .filter((file) => /\.(jpg|jpeg|png|gif|webp)$/i.test(file))
        .map((file) => `${revista.paginas_carpeta}/${file}`);
    } catch {
      // carpeta no existe
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

    // Ruta a la carpeta de imágenes
    const carpetaPath = path.join(
      __dirname,
      "..",
      "..",
      "public",
      revista.paginas_carpeta
    );

    // Eliminar carpeta e imágenes si existe
    try {
      await fsp.rm(carpetaPath, { recursive: true, force: true });
      console.log("🗑️ Carpeta eliminada:", carpetaPath);
    } catch {
      // si no existe, no pasa nada
    }

    // Eliminar registro de la BD
    await revista.destroy();

    res.status(200).json({
      ok: true,
      status: 200,
      message: "Revista e imágenes eliminadas correctamente",
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


async function downloadRevista(req, res) {
  try {
    const { id } = req.params;
    const revista = await dbcvecinal.Revista.findByPk(id);

    if (!revista) return res.status(404).send("Revista no encontrada");

    const carpetaPath = path.join(__dirname, "..", "..", "public", revista.paginas_carpeta);

    res.setHeader("Content-Type", "application/zip");
    res.setHeader("Content-Disposition", `attachment; filename=${revista.mes}.zip`);

    const archive = archiver("zip", { zlib: { level: 9 } });
    archive.on("error", (err) => res.status(500).send({ error: err.message }));

    archive.pipe(res);
    archive.directory(carpetaPath, false);
    await archive.finalize();
  } catch (error) {
    res.status(500).json({ ok: false, message: error.message });
  }
}


module.exports = {
  createRevista,
  getRevistas,
  getRevistaById,
  deleteRevistaById,
  updaterRevistaById,
  downloadRevista,
};
