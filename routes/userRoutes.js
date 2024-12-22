const express = require("express");
const router = express.Router();
const userController = require("../controller/userController");
const verifyToken = require("../middleware");

router.get("/get-all-users",userController.getAllUsers)
router.get("/get-single-user",verifyToken,userController.getSingleUser)
router.put("/update-user/:id", userController.updateUser)
router.delete("/delete-user/:id", userController.deleteUser)


module.exports = router