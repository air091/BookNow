const express = require("express");
const {
  getAllUsers,
  deleteUserController,
} = require("../controllers/user.controller");

const router = express.Router();

router.get("/", getAllUsers);
router.delete("/:id", deleteUserController);

module.exports = router;
