const User = require("../model/User");

//fetch all users controller
const getAllUsers = async (request, response) => {
  try {
    const allUsers = await User.find();
    if (!allUsers) {
      return response.status(404).json({ message: "users not found" });
    }
    return response.status(200).json(allUsers);
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

//fetch single user by token controller
const getSingleUser = async (request, response) => {
  try {
    const singleUser = await User.findById(request.userId);
    if (!singleUser) {
      return response.status(404).json({ message: "user not found" });
    }
    return response.status(200).json({message : "single user retrieved successfully" , singleUser});
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};



// update user role controller
const updateUser = async (request, response) => {
  try {
    const { role } = request.body;
    const { id } = request.params;
    await User.findByIdAndUpdate(id, { $set: { role: role } }, { new: true });
    return response
      .status(200)
      .json({ message: "user role updated successfully" });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

// delete user
const deleteUser = async (request, response) => {
  try {
    await User.findByIdAndDelete(request.params.id);
    return response.status(200).json({ message: "user deleted successfully" });
  } catch (error) {
    console.error(error);
    return response
      .status(500)
      .json({ message: "internal server error", error });
  }
};

module.exports = { getAllUsers, getSingleUser, updateUser , deleteUser};