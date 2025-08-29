const express = require("express");
const revistaController = require("../controllers/revista.controllers");
const uploadRevista = require("../../middlewares/uploadRevista");

const routes = express.Router();

// Subir revista con varias imágenes

routes.post("/revistas", uploadRevista, revistaController.createRevista);

routes.get("/revistas", revistaController.getRevistas);

routes.get("/revistas/all", revistaController.getRevistas);

routes.get("/revistas/:id/download", revistaController.downloadRevista);

routes.get("/revistas/:id", revistaController.getRevistaById);

routes.delete("/revistas/:id", revistaController.deleteRevistaById);

routes.put("/revistas/:id", revistaController.updaterRevistaById);



module.exports = routes;
