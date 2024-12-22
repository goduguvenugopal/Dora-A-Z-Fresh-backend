const mongoose = require("mongoose");

// creating carousel for images schema
const carouselSchema = new mongoose.Schema({
  offerTitle: {
    type: String,
  },
  carouselImage: {
    type: Array,
    default: [],
  },
});

const Carousel = mongoose.model("Carousel", carouselSchema);

module.exports = Carousel;
