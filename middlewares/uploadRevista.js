const multer = require("multer");
const path = require("path");
const fs = require("fs");

// Carpeta temporal antes de mover las imágenes a la carpeta final
const tempDir = path.join(__dirname, "../public/uploads/revistas/tmp");

// Crear carpeta tmp si no existe
if (!fs.existsSync(tempDir)) {
  fs.mkdirSync(tempDir, { recursive: true });
}

// Configuración del almacenamiento
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, tempDir);
  },
  filename: (req, file, cb) => {
    // Guardar con fecha para evitar conflictos de nombres
    cb(null, Date.now() + "-" + file.originalname);
  },
});

// Filtro para aceptar solo imágenes
function fileFilter(req, file, cb) {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Solo se permiten imágenes (jpg, png, webp, etc.)"), false);
  }
}

// Exportar middleware para subir múltiples imágenes (hasta 20 a la vez)
const uploadRevista = multer({ storage, fileFilter }).array("imagenes", 20);

module.exports = uploadRevista;
