const multer = require('multer');
const path = require('path');

// __dirname = middlewares/
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../public/uploads/revistas'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

// Filtro para aceptar solo PDFs
function fileFilter(req, file, cb) {
  if (file.mimetype === 'application/pdf') {
    cb(null, true);
  } else {
    cb(new Error('Solo se permiten archivos PDF'), false);
  }
}

const uploadRevista = multer({ storage, fileFilter });

module.exports = uploadRevista;
