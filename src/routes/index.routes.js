const express = require("express");
const routes = express.Router();

// Aquí agregar todas las rutas...

const novedadRoutes = require("./novedad.routes");
routes.use("/", novedadRoutes);

const imagenRoutes = require("./imagen.routes");
routes.use("/", imagenRoutes);


module.exports = routes;
