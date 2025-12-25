const { selectAllUsers, deleteUser } = require("../models/user.model");

const getAllUsers = async (request, response) => {
  try {
    const users = await selectAllUsers();
    if (!users.length)
      return response
        .status(404)
        .json({ status: false, message: "No users found" });
    return response.status(200).json({ status: true, users });
  } catch (err) {
    console.log(`Get all users failed ${err}`);
    return response.status(500).json({ status: false, message: err.message });
  }
};

const deleteUserController = async (request, response) => {
  try {
    const { id } = request.params;
    const user = await deleteUser(id);
    if (user === 0)
      return response
        .status(404)
        .json({ status: false, message: "User not found" });
    return response
      .status(200)
      .json({ status: true, message: "User deleted successfully" });
  } catch (err) {
    console.error(`Delete user controller failed ${err}`);
    return response.status(500).json({ status: false, message: err.message });
  }
};

module.exports = { getAllUsers, deleteUserController };
