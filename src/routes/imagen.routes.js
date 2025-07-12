const express = require("express");
const imagenController = require("../controllers/imagen.controllers");
const upload = require("../../middlewares/upload");

const routes = express.Router();

// Ruta para subir imagen (con multer)

routes.post("/imagenes", upload.single("imagen"), imagenController.createImagen);
routes.get("/imagenes", imagenController.getImagenes);
routes.delete("/imagenes/:id", imagenController.deleteImagenById);

// routes.get("/imagenes/:id", imagenController.getImagenById);
// routes.put("/imagenes/:id", imagenController.updateImagenById);


module.exports = routes;
