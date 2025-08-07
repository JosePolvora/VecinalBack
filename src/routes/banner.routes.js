const express = require("express");
const bannerController = require("../controllers/banner.controllers");

const uploadBanner = require("../../middlewares/uploadBanner");

const routes = express.Router();

routes.post(
  "/banners",
  uploadBanner.single("imagen"),
  bannerController.createBanner
);

routes.get("/banners", bannerController.getBanners);
routes.delete("/banners/:id", bannerController.deleteBannerById);
routes.get("/banners/all", bannerController.getBannersAll);

module.exports = routes;
