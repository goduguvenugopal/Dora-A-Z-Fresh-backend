 const express = require("express");
const router = express.Router();
const Carousel = require("../model/Carousel");
const Product = require("../model/Product");
const productCategory = require("../model/ProductCategory");
const Offer = require("../model/Offer");

router.get("/home-data", async (req, res) => {
  try {
    const [carousel, categories, products, discounts] = await Promise.all([
      Carousel.find(),
      productCategory.find(),
      Product.find(),
      Offer.find(),
    ]);

    return res.status(200).json({
      carousel,
      categories,
      products,
      discounts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Internal server error", error });
  }
});

module.exports = router;
