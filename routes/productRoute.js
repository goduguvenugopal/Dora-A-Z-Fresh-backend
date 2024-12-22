const express = require("express");
const router = express.Router();
const productController = require("../controller/productController");

router.post("/save-product", productController.saveProductController);
router.get("/get-all-products", productController.getAllProducts);
router.put(
  "/update-product-details/:id",
  productController.updateProductDetails
);
router.delete("/delete-product/:id", productController.deleteProduct);
router.get("/get-single-product/:id", productController.getSingleProduct);

module.exports = router;
