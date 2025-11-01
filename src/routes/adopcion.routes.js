const express = require("express");
const adopcionController = require("../controllers/adopcion.controllers");
const routes = express.Router();

routes.post("/adopciones", adopcionController.createAdopcion);
routes.get("/adopciones", adopcionController.getAdopciones);
routes.get("/adopciones/:id", adopcionController.getAdopcionById);
routes.delete("/adopciones/:id", adopcionController.deleteAdopcion);

module.exports = routes;
