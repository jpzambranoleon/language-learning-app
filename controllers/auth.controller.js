const User = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { sendEmail } = require("../utility/sendEmail");
require("dotenv").config();

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

    const hash = await User.hashPassword(req.body.password);
    req.body.password = hash;

    const emailToken = jwt.sign(
      { username: req.body.username },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );

    await sendEmail(
      req.body.firstName,
      req.body.email,
      req.body.username,
      emailToken
    );

    const newUser = new User(req.body);

    await newUser.save();

    res.status(200).send({
      success: true,
      message: "Registration success",
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

// Login
exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) throw new Error("Please make a valid request");

    const user = await User.findOne({ email: email });
    if (!user) throw new Error("User not found");

    const correctPassword = await bcrypt.compare(password, user.password);

    if (!correctPassword) throw new Error("Invalid credentials");

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .send({
        success: true,
        message: "Login success",
      });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
};
