const express = require("express");
const novedadController = require("../controllers/novedad.controllers");
const upload = require("../../middlewares/upload"); // multer middleware
const routes = express.Router();

// Para crear novedad con imagen: usamos multer para recibir un solo archivo con campo 'imagen'
routes.post("/novedades", upload.single('imagen'), novedadController.createNovedad);

routes.get("/novedades", novedadController.getNovedades);
routes.get("/novedades/:id", novedadController.getNovedadById);

routes.put("/novedades/:id", novedadController.updateNovedadById);

routes.delete("/novedades/:id", novedadController.deleteNovedadById);

module.exports = routes;
