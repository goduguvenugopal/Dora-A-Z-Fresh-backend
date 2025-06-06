const express = require("express");
const router = express.Router();
const carouselController = require("../controller/carouselController");
const verifyToken = require("../middleware");


router.post("/save-carousel", verifyToken ,carouselController.saveCarousel);
router.get("/get-carousel", carouselController.getCarousel);
router.put("/update-carousel/:id", verifyToken,carouselController.updateCarousel);
router.delete("/delete-carousel/:id",verifyToken, carouselController.deleteCarousel);

module.exports = router;
