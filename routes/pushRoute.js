const express = require("express");
const router = express.Router();
const {
  subscribeAdmin,
  unsubscribeAdmin,
} = require("../controller/pushSubcription");

router.post("/push/subscribe", subscribeAdmin);
router.post("/push/unsubscribe", unsubscribeAdmin);

module.exports = router;
