const dbcvecinal = require("../models/index.models");

async function createMensaje(req, res) {
    const dataMensajes = req.body;

    try {
        const crearMensaje = await dbcvecinal.Mensaje.create({
            nombre: dataMensajes.nombre,
            apellido: dataMensajes.apellido,
            correo: dataMensajes.correo,
            mensaje: dataMensajes.mensaje,
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Mensaje Creado",
            mensaje: crearMensaje,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function getMensajes(req, res) {
    try {
        const mensajes = await dbcvecinal.Mensaje.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: mensajes,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function getMensajeById(req, res) {
    const id = req.params.id;

    try {
        const mensaje = await dbcvecinal.Mensaje.findOne({
            where: { id: id },
        });

        res.status(200).json({
            ok: true,
            status: 200,
            body: mensaje,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function deleteMensaje(req, res) {
    const id = req.params.id;

    try {
        const eliminaMensaje = await dbcvecinal.Mensaje.destroy({
            where: { id: id },
        });

        res.status(204).json({
            ok: true,
            status: 204,
            body: eliminaMensaje,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

module.exports = {
    createMensaje,
    getMensajes,
    getMensajeById,
    deleteMensaje,
};
