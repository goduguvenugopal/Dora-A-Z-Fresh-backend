const express = require("express");
const router = express.Router();
const addressController = require("../controller/shippingAddressController");
const verifyToken = require("../middleware");

router.post(
  "/save-shipping-address",
  verifyToken,
  addressController.saveAddressController
);
router.get("/get-user-address", verifyToken, addressController.getAddress);
router.put("/update-address/:id", addressController.updateAddress);
router.delete("/delete-address/:id", addressController.deleteAddress);

module.exports = router;
