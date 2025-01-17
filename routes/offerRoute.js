const express = require("express");
const { createOffer, getOffers, updateOffer } = require("../controller/offersController");  
const router = express.Router();

router.post("/create-offer", createOffer);
router.get("/get-offer", getOffers);
router.put("/update-offer/:id", updateOffer);


module.exports = router;
