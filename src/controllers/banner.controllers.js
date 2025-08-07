const dbcvecinal = require("../models/index.models");

async function createBanner(req, res) {
  try {
    const { descripcion, tipo, link } = req.body;

    if (!req.file) {
      return res.status(400).json({
        ok: false,
        status: 400,
        message: "No se envió ninguna imagen de banner.",
      });
    }

    const imagen_url = `/uploads/banners/${req.file.filename}`;

    const nuevoBanner = await dbcvecinal.Banner.create({
      imagen_url,
      descripcion,
      tipo,
      link, // Usar link directamente, que coincida con el modelo y BD
    });

    res.status(201).json({
      ok: true,
      status: 201,
      message: "Banner creado correctamente",
      body: nuevoBanner,
    });
  } catch (error) {
    console.error("Error en createBanner:", error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

async function getBanners(req, res) {
  try {
    const banners = await dbcvecinal.Banner.findAll({
      limit: 6,
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      ok: true,
      status: 200,
      body: banners,
    });
  } catch (error) {
    console.error("Error en getBanners:", error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

async function deleteBannerById(req, res) {
  const id = req.params.id;

  try {
    const eliminado = await dbcvecinal.Banner.destroy({
      where: { id },
    });

    res.status(204).json({
      ok: true,
      status: 204,
      body: eliminado,
    });
  } catch (error) {
    console.error("Error en deleteBannerById:", error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

async function getBannersAll(req, res) {
  try {
    const banners = await dbcvecinal.Banner.findAll({
      order: [["id", "DESC"]],
    });

    res.status(200).json({
      ok: true,
      status: 200,
      body: banners,
    });
  } catch (error) {
    console.error("Error en getBannersAll:", error);
    res.status(500).json({
      ok: false,
      status: 500,
      message: error.message,
    });
  }
}

module.exports = {
  createBanner,
  getBanners,
  deleteBannerById,
  getBannersAll,
};
