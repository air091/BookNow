const { SignJWT } = require("jose");
const secret = new TextEncoder().encode(process.env.JWT_SECRET);

const generateToken = async (userId, response) => {
  const payload = { id: userId };
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setExpirationTime(process.env.JWT_EXPIRES_IN)
    .sign(secret);

  response.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "prodution",
    sameSite: "strict",
    maxAge: 1000 * 60 * 60 * 24 * parseInt(process.env.JWT_EXPIRES_IN),
  });

  return token;
};

module.exports = { generateToken };
