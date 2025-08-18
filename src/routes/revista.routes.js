// const express = require("express");
// const revistaController = require("../controllers/revista.controllers");
// const uploadRevista = require("../../middlewares/uploadRevista");

// const routes = express.Router();

// routes.post(
//   "/revistas",
//   uploadRevista.single("pdf"),
//   revistaController.createRevista
// );

// routes.get("/revistas", revistaController.getRevistas);

// routes.get("/revistas/:id", revistaController.getRevistaById);

// routes.delete("/revistas/:id", revistaController.deleteRevistaById);

// routes.put("/revistas/:id", revistaController.updaterRevistaById);

// module.exports = routes;


const express = require("express");
const revistaController = require("../controllers/revista.controllers");
const uploadRevista = require("../../middlewares/uploadRevista");

const routes = express.Router();

// Subir revista con varias imágenes
routes.post(
  "/revistas",
  uploadRevista.array("imagenes", 20), // hasta 20 imágenes de una sola vez
  revistaController.createRevista
);

routes.get("/revistas", revistaController.getRevistas);

routes.get("/revistas/:id", revistaController.getRevistaById);

routes.delete("/revistas/:id", revistaController.deleteRevistaById);

routes.put("/revistas/:id", revistaController.updaterRevistaById);

module.exports = routes;
