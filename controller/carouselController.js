const Carousel = require("../model/Carousel");

// creating Carousel  controller
const saveCarousel = async (request, response) => {
  try {
    const { offerTitle, carouselImage } = request.body;
    const saveImages = new Carousel({
      offerTitle,
      carouselImage,
    });
    await saveImages.save();
    return response.status(200).json({
      message: "carousel saved successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// get carouse controller
const getCarousel = async (request, response) => {
  try {
    const retrievedCarousel = await Carousel.find();
    return response.status(200).json({
      message: "carousel retrieved successfully",
      retrievedCarousel,
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// update carousel controller
const updateCarousel = async (request, response) => {
  try {
    const carouselData = request.body;
    await Carousel.findByIdAndUpdate(
      request.params.id,
      { $set: carouselData },
      { new: true }
    );
    return response.status(200).json({
      message: "carousel updated successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// delete carousel  controller
const deleteCarousel = async (request, response) => {
  try {
    await Carousel.findByIdAndDelete(request.params.id);
    return response.status(200).json({
      message: "carousel deleted successfully",
    });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

module.exports = { saveCarousel, getCarousel, updateCarousel, deleteCarousel };
