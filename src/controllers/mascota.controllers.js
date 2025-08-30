const dbcvecinal = require("../models/index.models");

async function createMascota(req, res) {
  try {
    const { titulo, descripcion, fecha } = req.body;

    if (!req.file) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "No se envió ninguna imagen.",
      });
    }

    const imagen_url = `/uploads/galeria/${req.file.filename}`;

    const nuevaMascota = await dbcvecinal.Mascota.create({
      titulo,
      descripcion,
      fecha: fecha || new Date(),
      imagen_url,
    });

    res.status(201).json({
      ok: true,
      status: 201,
      message: "Mascota creada con imagen",
      body: nuevaMascota,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

async function getMascotas(req, res) {
  try {
    const mascotas = await dbcvecinal.Mascota.findAll();

    res.status(200).json({
      ok: true,
      status: 200,
      body: mascotas,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

async function getMascotaById(req, res) {
  const id = req.params.id;

  try {
    const mascota = await dbcvecinal.Mascota.findOne({
      where: { id },
    });

    res.status(200).json({
      ok: true,
      status: 200,
      body: mascota,
    });
  } catch (error) {
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

async function updateMascotaById(req, res) {
  const id = req.params.id;
  const dataMascotas = req.body;

  try {
    const actualizada = await dbcvecinal.Mascota.update(
      {
        titulo: dataMascotas.titulo,
        descripcion: dataMascotas.descripcion,
        fecha: dataMascotas.fecha,
        imagen_url: dataMascotas.imagen_url,
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

async function deleteMascotaById(req, res) {
  const id = req.params.id;

  try {
    const eliminado = await dbcvecinal.Mascota.destroy({
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
  createMascota,
  getMascotas,
  getMascotaById,
  updateMascotaById,
  deleteMascotaById,
};
