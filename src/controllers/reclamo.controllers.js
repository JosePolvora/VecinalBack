const dbcvecinal = require("../models/index.models");

// async function createReclamo(req, res) {
//     const dataReclamos = req.body;

//     try {
//         const crearReclamo = await dbcvecinal.Reclamo.create({
//             nombres: dataReclamos.nombres,
//             apellido: dataReclamos.apellido,
//             direccion: dataReclamos.direccion,
//             email: dataReclamos.email,
//             telefono: dataReclamos.telefono,
//             asunto: dataReclamos.asunto,
//             descripcion: dataReclamos.descripcion,
//         });

//         res.status(201).json({
//             ok: true,
//             status: 201,
//             message: "Reclamo creado",
//             body: crearReclamo,
//         });

//     } catch (error) {
//         res.status(500).json({
//             ok: false,
//             status: 500,
//             message: error.message,
//         });
//     }
// }


async function createReclamo(req, res) {
    const dataReclamos = req.body;

    // Generar número de reclamo: por ejemplo REC + fecha + random 4 dígitos
    const fecha = new Date();
    const fechaStr = fecha.toISOString().slice(0, 10).replace(/-/g, ''); // YYYYMMDD
    const randomNum = Math.floor(1000 + Math.random() * 9000); // número random 4 dígitos
    const numeroReclamo = `REC-${fechaStr}-${randomNum}`;

    try {
        const crearReclamo = await dbcvecinal.Reclamo.create({
            nombres: dataReclamos.nombres,
            apellido: dataReclamos.apellido,
            direccion: dataReclamos.direccion,
            email: dataReclamos.email,
            telefono: dataReclamos.telefono,
            asunto: dataReclamos.asunto,
            descripcion: dataReclamos.descripcion,
            numeroReclamo, // guardar el número generado
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Reclamo creado",
            body: crearReclamo, // contiene numeroReclamo
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}


async function getReclamos(req, res) {
    try {
        const reclamos = await dbcvecinal.Reclamo.findAll();
        res.status(200).json({
            ok: true,
            status: 200,
            body: reclamos,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function getReclamoById(req, res) {
    const id = req.params.id;

    try {
        const reclamo = await dbcvecinal.Reclamo.findOne({
            where: { id: id },
        });

        res.status(200).json({
            ok: true,
            status: 200,
            body: reclamo,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function updateReclamoById(req, res) {
    const id = req.params.id;
    const dataReclamos = req.body;

    try {
        const actualizaReclamo = await dbcvecinal.Reclamo.update(
            {
                nombres: dataReclamos.nombres,
                apellido: dataReclamos.apellido,
                direccion: dataReclamos.direccion,
                email: dataReclamos.email,
                telefono: dataReclamos.telefono,
                asunto: dataReclamos.asunto,
                descripcion: dataReclamos.descripcion,
            },
            {
                where: { id: id },
            }
        );

        res.status(200).json({
            ok: true,
            status: 200,
            body: actualizaReclamo,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function deleteReclamoById(req, res) {
    const id = req.params.id;

    try {
        const eliminaReclamo = await dbcvecinal.Reclamo.destroy({
            where: { id: id },
        });

        res.status(204).json({
            ok: true,
            status: 204,
            body: eliminaReclamo,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}



async function obtenerReclamoPorNumero(req, res) {
    const numeroReclamo = req.params.numero;  // o req.query.numero

    try {
        const reclamo = await dbcvecinal.Reclamo.findOne({
            where: { numeroReclamo }
        });

        if (!reclamo) {
            return res.status(404).json({
                ok: false,
                message: 'Número de reclamo no encontrado'
            });
        }

        res.json({
            ok: true,
            body: reclamo
        });
    } catch (error) {
        res.status(500).json({
            ok: false,
            message: error.message
        });
    }
}

module.exports = {
    createReclamo,
    getReclamos,
    getReclamoById,
    updateReclamoById,
    deleteReclamoById,
    obtenerReclamoPorNumero,
};
