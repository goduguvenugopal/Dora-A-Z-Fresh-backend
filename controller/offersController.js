const Offer = require("../model/Offer");

// Create a new offer
const createOffer = async (req, res) => {
  try {
    const { sevenDays, tenDays, twentyDays, thirtyDays, deliveryCharges } =
      req.body;
    const existOffer = await Offer.find();
    if (existOffer.length > 0) {
      return res.status(409).json({ message: "Offer already exists." });
    }
    const newOffer = new Offer({
      sevenDays,
      tenDays,
      twentyDays,
      thirtyDays,
      deliveryCharges,
    });
    await newOffer.save();
    res.status(201).json({ message: "offer created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// Get all offers
const getOffers = async (req, res) => {
  try {
    const offers = await Offer.find();
    res.status(200).json({ message: "offers retrieved successfully ", offers });
  } catch (error) {
    console.error(error);

    res.status(500).json({ message: error.message });
  }
};

// Update an offer by ID
const updateOffer = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedOffer = await Offer.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!updatedOffer) {
      return res.status(404).json({ message: "Offer not found" });
    }
    res.status(200).json({ message: "Offer updated successfully" });
  } catch (error) {
    console.error(error);

    res.status(400).json({ message: error.message });
  }
};

module.exports = { createOffer, getOffers, updateOffer };