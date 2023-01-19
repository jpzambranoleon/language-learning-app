const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Register
exports.register = async (req, res) => {
  try {
    console.log(req.body);
    if (!req.body.email) throw new Error("Cannot register without an email");
    if (!req.body.username)
      throw new Error("Cannot register without a username");
    if (!req.body.password)
      throw new Error("Cannot register without a password");
    if (req.body.password.length < 8)
      throw new Error("Password must be at least 8 characters long");

    res.status(200).send({
      success: true,
      message: "Registration Success",
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      res.status(400).send({ error: true, message: err.message });
      return;
    }
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
};

exports.login = async (req, res, next) => {
  try {
    const user = await User.findOne({ name: req.body.name });
    if (!user) return next(createError(404, "User not found!"));

    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) return next(createError(400, "Invalid Credentials"));
  } catch (err) {
    next(err);
  }
};
