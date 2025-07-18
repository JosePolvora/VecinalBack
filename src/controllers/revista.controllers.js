const dbcvecinal = require("../models/index.models");
const { convert } = require("pdf-poppler");
const path = require("path");
const fs = require("fs");

// Crear revista y convertir a imágenes
async function createRevista(req, res) {
    try {
        const { descripcion, mes } = req.body;

        if (!req.file) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "No se envió ningún archivo PDF.",
            });
        }

        const pdfPath = req.file.path;
        const pdf_url = `/uploads/revistas/${req.file.filename}`;
        console.log("📄 PDF recibido en:", pdfPath);

        // Carpeta para guardar las imágenes
        const nombreCarpeta = mes.toLowerCase().replace(/\s+/g, "_");
        const outputDir = path.join(__dirname, "..", "..", "public", "uploads", "revistas", "paginas", nombreCarpeta);

        const paginas_carpeta = `/uploads/revistas/paginas/${nombreCarpeta}`;

        console.log("📁 Carpeta de salida para imágenes:", outputDir);

        // Crear carpeta si no existe
        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
            //console.log("✅ Carpeta creada:", outputDir);
        } else {
            //console.log("📁 Carpeta ya existe:", outputDir);
        }

        // Opciones para conversión
        const opts = {
            format: "jpeg",
            out_dir: outputDir,
            out_prefix: "pagina",
            page: null,
            resolution: 150
        };

        // Convertir PDF a imágenes
        //console.log("🔄 Iniciando conversión de PDF...");
        await convert(pdfPath, opts);
        //console.log("✅ PDF convertido correctamente a imágenes.");

        // Listar archivos generados
        const archivos = fs.readdirSync(outputDir);
        //console.log("📦 Archivos generados:", archivos);

        // Crear registro en la DB
        const nuevaRevista = await dbcvecinal.Revista.create({
            mes,
            pdf_url,
            paginas_carpeta,
            descripcion,
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Revista creada correctamente",
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
            order: [['creado_en', 'DESC']]
        });

        res.status(200).json({
            ok: true,
            status: 200,
            body: revistas
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message
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
                message: "Revista no encontrada"
            });
        }

        res.status(200).json({
            ok: true,
            status: 200,
            body: revista
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message
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
                message: "Revista no encontrada"
            });
        }

        await revista.destroy();

        res.status(200).json({
            ok: true,
            status: 200,
            message: "Revista eliminada correctamente"
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message
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
    updaterRevistaById
};
