const nodemailer = require("nodemailer");

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

async function sendEmail(firstName, email, username, token) {
  let mailOptions = {
    from: '"Verify your email"' + `<${process.env.EMAIL}>`,
    to: email,
    subject: "verify your email",
    text: "Testing send email function",
    html: `<h2> ${firstName}! Thanks for registering on our site </h2>
                  <h4> Please verify your email to continue... <h4>
                  http://localhost:3000/verify/email/${username}/${token}`,
  };
  try {
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      }
      console.log(`Verification email is sent to ${email}`);
    });
  } catch (err) {
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
}

module.exports = { sendEmail };
