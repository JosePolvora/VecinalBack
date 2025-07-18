const express = require("express");
const routes = express.Router();

// Aquí agregar todas las rutas...

const novedadRoutes = require("./novedad.routes");
routes.use("/", novedadRoutes);

const imagenRoutes = require("./imagen.routes");
routes.use("/", imagenRoutes);

const reclamoRoutes = require("./reclamo.routes");
routes.use("/", reclamoRoutes);

const revistaRoutes = require("./revista.routes");
routes.use("/", revistaRoutes);

const usuarioRoutes = require("./usuario.routes");
routes.use("/", usuarioRoutes);

const mensajeRoutes = require("./mensaje.routes");
routes.use("/", mensajeRoutes);

module.exports = routes;
