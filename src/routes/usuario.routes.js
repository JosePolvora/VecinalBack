const express = require("express");
const usuarioController = require("../controllers/usuario.controllers");
const routes = express.Router();

routes.post("/usuarios", usuarioController.createUsuario);
routes.post("/login", usuarioController.loginUsuario);
routes.post('/usuarios/admin', usuarioController.createUsuarioAdmin);

routes.get("/usuarios", usuarioController.getUsuarios);
routes.get("/usuarios/:id", usuarioController.getUsuarioById);

routes.put("/usuarios/:id", usuarioController.updateUsuario);

routes.delete("/usuarios/:id", usuarioController.deleteUsuario);

module.exports = routes;