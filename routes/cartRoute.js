const express = require("express");
const router = express.Router();
const cartController = require("../controller/cartController");
const verifyToken = require("../middleware");

router.post("/add-to-cart", verifyToken, cartController.addToCart);
router.get(
  "/get-user-cart-products",
  verifyToken,
  cartController.getUserCartProducts
);
router.delete(
  "/delete-user-cart-product/:id",
  cartController.deleteCartProduct
);

module.exports = router;
