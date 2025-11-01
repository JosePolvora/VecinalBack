const dbcvecinal = require("../models/index.models");

async function createAdopcion(req, res) {
    const dataAdopciones = req.body;

    try {
        const crearAdopcion = await dbcvecinal.Adopcion.create({
            nombre: dataAdopciones.nombre,
            telefono: dataAdopciones.telefono,
            direccion: dataAdopciones.direccion,
            
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Adopción creada",
            adopcion: crearAdopcion,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function getAdopciones(req, res) {
    try {
        const adopciones = await dbcvecinal.Adopcion.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: adopciones,
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function getAdopcionById(req, res) {
    const id = req.params.id;

    try {
        const adopcion = await dbcvecinal.Adopcion.findOne({
            where: { id: id },
        });

        res.status(200).json({
            ok: true,
            status: 200,
            body: adopcion,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function deleteAdopcion(req, res) {
    const id = req.params.id;

    try {
        const eliminaAdopcion = await dbcvecinal.Adopcion.destroy({
            where: { id: id },
        });

        res.status(204).json({
            ok: true,
            status: 204,
            body: eliminaAdopcion,
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
    createAdopcion,
    getAdopciones,
    getAdopcionById,
    deleteAdopcion,
};
