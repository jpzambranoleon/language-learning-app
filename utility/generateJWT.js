const jwt = require("jsonwebtoken");
require("dotenv").config();

const options = {
  expiresIn: "2h",
};

async function generateJWT(username, userId) {
  try {
    const payload = { username: username, id: userId };
    const token = await jwt.sign(payload, process.env.JWT_SECRET, options);
    return { error: false, token: token };
  } catch (err) {
    console.log(err);
    return { error: true };
  }
}

module.exports = { generateJWT };
