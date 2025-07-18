const express = require("express");
const reclamoController = require("../controllers/reclamo.controllers");
const routes = express.Router();


routes.post("/reclamos", reclamoController.createReclamo);

routes.get("/reclamos", reclamoController.getReclamos);
routes.get("/reclamos/:id", reclamoController.getReclamoById);
routes.get("/reclamos/numero/:numero", reclamoController.obtenerReclamoPorNumero);



routes.put("/reclamos/:id", reclamoController.updateReclamoById);

routes.delete("/reclamos/:id", reclamoController.deleteReclamoById);

module.exports = routes;
