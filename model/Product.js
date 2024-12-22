const mongoose = require("mongoose");

// creating product Schema

const productSchema = mongoose.Schema({
  itemName: {
    type: String,
    required: true,
  },
  itemDescription: {
    type: String,
  },
  itemCost: {
    type: String,
    required: true,
  },
  itemImage: {
    type: Array,
    required: true,
    default: [],
  },
  itemQty: {
    type: String,
  },
  minOrderQty: {
    type: String,
  },
  itemWeight: {
    type: Array,
    default: [],
  },
  itemStock: {
    type: String,
    required: true,
  },
  itemCategory: {
    type: String,
    required: true,
  },
  offerCost: {
    type: String,
  },
  productTags: {
    type: Array,
    required: true,
    default: [],
  },
});

const Product = mongoose.model("Product", productSchema);

module.exports = Product;
