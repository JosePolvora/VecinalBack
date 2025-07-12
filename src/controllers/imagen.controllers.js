const dbcvecinal = require("../models/index.models");

async function createImagen(req, res) {
    try {
        const { descripcion, novedadId } = req.body;

        if (!req.file) {
            return res.status(400).json({
                ok: false,
                status: 400,
                message: "No se envió ninguna imagen.",
            });
        }

        const imagen_url = `/uploads/${req.file.filename}`;

        const nuevaImagen = await dbcvecinal.Imagen.create({
            imagen_url,
            descripcion,
            novedadId
        });

        res.status(201).json({
            ok: true,
            status: 201,
            message: "Imagen creada correctamente",
            body: nuevaImagen,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function getImagenes(req, res) {
    try {
        const imagenes = await dbcvecinal.Imagen.findAll({
            limit: 6,
            order: [['id', 'DESC']],
        });

        res.status(200).json({
            ok: true,
            status: 200,
            body: imagenes,
        });

    } catch (error) {
        res.status(500).json({
            ok: false,
            status: 500,
            message: error.message,
        });
    }
}

async function deleteImagenById(req, res) {
  const id = req.params.id;

  try {
    const eliminado = await dbcvecinal.Imagen.destroy({
      where: { id },
    });

    res.status(204).json({
      ok: true,
      status: 204,
      body: eliminado,
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
    createImagen,
    getImagenes,
    deleteImagenById,
};


