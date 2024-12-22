const express = require("express");
const router = express.Router();
const categoryController = require("../controller/categoryController");

router.post("/save-category-products", categoryController.saveProductCategory);
router.get("/get-category-products", categoryController.getAllCategoryProducts);
router.put(
  "/update-category-products/:id",
  categoryController.updateCategoryProduct
);
router.delete(
  "/delete-category-products/:id",
  categoryController.deleteCategory
);

module.exports = router;
