const express = require("express");
const mascotaController = require("../controllers/mascota.controllers");
const upload = require("../../middlewares/upload"); // multer middleware
const routes = express.Router();

// Para crear novedad con imagen: usamos multer para recibir un solo archivo con campo 'imagen'
routes.post(
  "/mascotas",
  upload.single("imagen"),
  mascotaController.createMascota
);

routes.get("/mascotas", mascotaController.getMascotas);
routes.get("/mascotas/:id", mascotaController.getMascotaById);

routes.put("/mascotas/:id", mascotaController.updateMascotaById);

routes.delete("/mascotas/:id", mascotaController.deleteMascotaById);

module.exports = routes;
