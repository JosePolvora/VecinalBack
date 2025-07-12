const dbcvecinal = require("../models/index.models");

async function createNovedad(req, res) {
  try {
    const { titulo, descripcion, fecha } = req.body;

    if (!req.file) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "No se envió ninguna imagen.",
      });
    }

    const imagen_url = `/uploads/${req.file.filename}`;

    const nuevaNovedad = await dbcvecinal.Novedad.create({
      titulo,
      descripcion,
      fecha: fecha || new Date(),
      imagen_url,
    });

    res.status(201).json({
      ok: true,
      status: 201,
      message: "Novedad creada con imagen",
      body: nuevaNovedad,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

async function getNovedades(req, res) {
  try {
    const novedades = await dbcvecinal.Novedad.findAll();

    res.status(200).json({
      ok: true,
      status: 200,
      body: novedades,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

async function getNovedadById(req, res) {
  const id = req.params.id;

  try {
    const novedad = await dbcvecinal.Novedad.findOne({
      where: { id },
    });

    res.status(200).json({
      ok: true,
      status: 200,
      body: novedad,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

async function updateNovedadById(req, res) {
  const id = req.params.id;
  const dataNovedades = req.body;

  try {
    const actualizada = await dbcvecinal.Novedad.update(
      {
        titulo: dataNovedades.titulo,
        descripcion: dataNovedades.descripcion,
        fecha: dataNovedades.fecha,
        imagen_url: dataNovedades.imagen_url,
      },
      {
        where: { id },
      }
    );

    res.status(200).json({
      ok: true,
      status: 200,
      body: actualizada,
    });

  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

async function deleteNovedadById(req, res) {
  const id = req.params.id;

  try {
    const eliminado = await dbcvecinal.Novedad.destroy({
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
  createNovedad,
  getNovedades,
  getNovedadById,
  updateNovedadById,
  deleteNovedadById,
};
