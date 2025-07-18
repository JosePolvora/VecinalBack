const express = require("express");
const mensajeController = require("../controllers/mensaje.controllers");
const routes = express.Router();

routes.post("/mensajes", mensajeController.createMensaje);
routes.get("/mensajes", mensajeController.getMensajes);
routes.get("/mensajes/:id", mensajeController.getMensajeById);
routes.delete("/mensajes/:id", mensajeController.deleteMensaje);

module.exports = routes;
