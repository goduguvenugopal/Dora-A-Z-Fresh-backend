const Carousel = require("../model/Carousel");
const User = require("../model/User")

// creating Carousel  controller
const saveCarousel = async (request, response) => {
  try {
    const { offerTitle, carouselImage } = request.body;
    const userId = request.userId;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response
        .status(403)
        .json({ error: "only admin can get all user details" });
    }
    const prevCarousel = Carousel.find();
    if ((await prevCarousel).length === 1) {
      return response.status(401).json({
        message: "carousel already existed in db",
      });
    }
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
    const userId = request.userId;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response
        .status(403)
        .json({ error: "only admin can get all user details" });
    }
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
    const userId = request.userId;
    const isExistUser = await User.findById(userId);
    if (isExistUser.role !== "admin") {
      return response
        .status(403)
        .json({ error: "only admin can get all user details" });
    }
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
