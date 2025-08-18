const dbcvecinal = require("../models/index.models");
const path = require("path");
const fs = require("fs");

// const { fromPath } = require("pdf2pic");
// const pdfParse = require("pdf-parse");


// const dbcvecinal = require("../models/index.models");
// const path = require("path");
// const fs = require("fs");

// Crear revista con imágenes
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

    // Crear nombre de carpeta a partir del mes
    const nombreCarpeta = mes.toLowerCase().replace(/\s+/g, "_");
    const paginas_carpeta = `/uploads/revistas/paginas/${nombreCarpeta}`;

    // Crear carpeta física si no existe
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
    if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

    // Mover imágenes subidas a la carpeta de la revista
    req.files.forEach((file, index) => {
      const newPath = path.join(outputDir, `${index + 1}_${file.originalname}`);
      fs.renameSync(file.path, newPath);
    });

    // Guardar en BD
    const nuevaRevista = await dbcvecinal.Revista.create({
      mes,
      descripcion,
      paginas_carpeta,
      pdf_url: "", // ya no usamos PDF
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

module.exports = {
  createRevista,
};














// Función para obtener el total de páginas de un PDF
// async function getTotalPages(pdfPath) {
//   const dataBuffer = fs.readFileSync(pdfPath);
//   const data = await pdfParse(dataBuffer);
//   return data.numpages;
// }

// // Crear revista y convertir a imágenes
// async function createRevista(req, res) {
//   try {
//     const { descripcion, mes } = req.body;

//     if (!req.file) {
//       return res.status(400).json({
//         ok: false,
//         status: 400,
//         message: "No se envió ningún archivo PDF.",
//       });
//     }

//     const pdfPath = req.file.path;
//     const pdf_url = `/uploads/revistas/${req.file.filename}`;
//     const nombreCarpeta = mes.toLowerCase().replace(/\s+/g, "_");
//     const outputDir = path.join(
//       __dirname,
//       "..",
//       "..",
//       "public",
//       "uploads",
//       "revistas",
//       "paginas",
//       nombreCarpeta
//     );

//     // Crear carpeta si no existe
//     if (!fs.existsSync(outputDir)) fs.mkdirSync(outputDir, { recursive: true });

//     // Opciones para pdf2pic
//     const pdf2picOptions = {
//       density: 150,
//       saveFilename: "pagina",
//       savePath: outputDir,
//       format: "png",
//       width: 800,
//       height: 1000,
//     };

//     const convert = fromPath(pdfPath, pdf2picOptions);

//     // Convertir todas las páginas
//     const totalPages = await getTotalPages(pdfPath);
//     const conversionPromises = [];
//     for (let i = 1; i <= totalPages; i++) {
//       conversionPromises.push(convert(i));
//     }
//     await Promise.all(conversionPromises);

//     const paginas_carpeta = `/uploads/revistas/paginas/${nombreCarpeta}`;

//     // Guardar en la base de datos
//     const nuevaRevista = await dbcvecinal.Revista.create({
//       mes,
//       pdf_url,
//       paginas_carpeta,
//       descripcion,
//     });

//     res.status(201).json({
//       ok: true,
//       status: 201,
//       message: "Revista creada correctamente",
//       body: nuevaRevista,
//     });
//   } catch (error) {
//     console.error("❌ Error en createRevista:", error);
//     res.status(500).json({
//       ok: false,
//       status: 500,
//       message: error.message,
//     });
//   }
// }

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

    res.status(200).json({
      ok: true,
      status: 200,
      body: revista,
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
