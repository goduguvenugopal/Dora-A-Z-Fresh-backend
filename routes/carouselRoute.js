const express = require("express");
const router = express.Router();
const carouselController = require("../controller/carouselController");

router.post("/save-carousel", carouselController.saveCarousel);
router.get("/get-carousel", carouselController.getCarousel);
router.put("/update-carousel/:id", carouselController.updateCarousel);
router.delete("/delete-carousel/:id", carouselController.deleteCarousel);

module.exports = router;
