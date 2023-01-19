const User = require("../models/user.model");
require("dotenv").config();

exports.checkDuplicateEmail = async (req, res, next) => {
  if (req.body.email) {
    let user = await User.findOne({
      email: req.body.email,
    });

    if (user) {
      return res.status(400).json({
        error: true,
        message: "Email is already in use",
      });
    }
  }
  next();
};
