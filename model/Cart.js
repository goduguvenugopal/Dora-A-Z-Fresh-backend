const mongoose = require("mongoose");

// creating cart product schema
const cartSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  products: {
    type: Array,
    required: true,
    default: [],
  },
});


const Cart = mongoose.model("Cart", cartSchema)

module.exports = Cart
