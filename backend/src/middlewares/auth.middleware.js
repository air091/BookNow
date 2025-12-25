const { jwtVerify } = require("jose");
const { selectUserById } = require("../models/user.model");

const auth = async (request, response, next) => {
  try {
    const token = request.cookies?.jwt;
    if (!token)
      return response
        .status(401)
        .json({ status: false, message: "Unathorized" });

    const secret = new TextEncoder().encode(process.env.JWT_SECRET);
    const { payload } = await jwtVerify(token, secret);
    const user = await selectUserById(payload.id);
    if (!user)
      return response
        .status(401)
        .json({ status: false, message: "Unauthorized" });

    request.user = { id: user.id, name: user.name, role: user.role };
    next();
  } catch (err) {
    console.error(`Auth middleware failed ${err}`);
    return response
      .status(401)
      .json({ status: false, message: "Invalid or expired token" });
  }
};

const adminOnly = async (request, response, next) => {
  if (request.user.role !== "admin")
    return response.status(403).json({ status: false, message: "Forbidden" });
  next();
};

module.exports = { auth, adminOnly };
