const User = require("../models/user.model");

// Register
exports.register = async (req, res) => {
  try {
    console.log(req.body);
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
