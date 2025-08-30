const dbcvecinal = require("../models/index.models");

async function createMascota(req, res) {
  try {
    const {
      nombre,
      tipo,
      raza,
      edad,
      sexo,
      tamano,
      condicion,
      lugar,
      contacto_nombre,
      contacto_telefono,
      fecha,
    } = req.body;

    //Si no hay imagen, dejamos imagen_url como null
    const imagen_url = req.file
      ? `/uploads/galeria/${req.file.filename}`
      : null;

    const nuevaMascota = await dbcvecinal.Mascota.create({
      nombre,
      tipo,
      raza,
      edad,
      sexo,
      tamano,
      condicion,
      lugar,
      contacto_nombre,
      contacto_telefono,
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

    if (!mascota) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Mascota no encontrada",
      });
    }

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
        nombre: dataMascotas.nombre,
        tipo: dataMascotas.tipo,
        raza: dataMascotas.raza,
        edad: dataMascotas.edad,
        sexo: dataMascotas.sexo,
        tamano: dataMascotas.tamano,
        condicion: dataMascotas.condicion,
        lugar: dataMascotas.lugar,
        contacto_nombre: dataMascotas.contacto_nombre,
        contacto_telefono: dataMascotas.contacto_telefono,
        fecha: dataMascotas.fecha,
        imagen_url: dataMascotas.imagen_url,
      },
      {
        where: { id },
      }
    );

    // Si no se actualizó ninguna fila, devolvemos 404
    if (actualizada[0] === 0) {
      return res.status(404).json({
        ok: false,
        status: 404,
        message: "Mascota no encontrada",
      });
    }

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
