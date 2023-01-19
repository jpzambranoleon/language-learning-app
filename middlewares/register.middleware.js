const User = require("../models/user.model");
const nodemailer = require("nodemailer");
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

exports.verrifyEmail = async (req, res, next) => {
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL,
      pass: process.env.EMAIL_PASSWORD,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  let mailOptions = {
    from: '"Verify your email"' + `<${process.env.EMAIL}>`,
    to: req.body.email,
    subject: "verify your email",
    text: "Testing send email function",
    html: `<h2> ${req.body.firstName}! Thanks for registering on our site </h2>
            <h4> Please verify your email to continue... <h4>`,
  };
  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
      console.log(`Verification email is sent to ${req.body.email}`);
      next();
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
};
