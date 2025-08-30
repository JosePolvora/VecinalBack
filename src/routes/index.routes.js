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

const bannerRoutes = require("./banner.routes");
routes.use("/", bannerRoutes);

const mascotaRoutes = require("./mascota.routes");
routes.use("/", mascotaRoutes);


// NUEVA RUTA PARA AI
const airoutes = require("./ai.routes");
routes.use("/ai", airoutes);

module.exports = routes;
