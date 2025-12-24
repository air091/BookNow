const bcrypt = require("bcrypt");
const { insertUser, selectUserByEmail } = require("../models/user.model");
const { generateToken } = require("../utils/generateToken");

const register = async (request, response) => {
  try {
    const { name, email, role, password } = request.body;
    if (!name || !email || !password)
      return response
        .status(400)
        .json({ status: false, message: "All fields are required" });

    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const user = await insertUser(name, email, role, hashPassword);
    await generateToken(user.id, response);
    return response.status(201).json({ status: true, user });
  } catch (err) {
    console.log(`Register failed ${err}`);
    return response.status(500).json({ status: false, message: err.message });
  }
};

const login = async (request, response) => {
  try {
    const { email, password } = request.body;
    if (!email || !password)
      return response
        .status(400)
        .json({ status: false, message: "All fields are required" });

    const user = await selectUserByEmail(email);
    if (!user)
      return response
        .status(404)
        .json({ status: false, message: "Email not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return response
        .status(401)
        .json({ status: false, message: "Email or password is incorrect" });
    await generateToken(user.id, response);
    return response
      .status(200)
      .json({ status: true, message: "User logged in successfully", user });
  } catch (err) {
    console.log(`Register failed ${err}`);
    return response.status(500).json({ status: false, message: err.message });
  }
};

module.exports = { register, login };
