const User = require("../models/user.model");

// Update user
exports.updateUser = async (req, res) => {
  const authHeader = req.headers.token;
  const token = authHeader.split(" ")[1];
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    try {
      const updatedUser = await User.findByIdAndUpdate(
        req.params.id,
        {
          $set: req.body.data,
        },
        { new: true }
      );
      const { password, ...others } = updatedUser._doc;
      res.status(200).send({
        success: true,
        message: "Account has been updated",
        user: { ...others, accessToken: token },
      });
    } catch (err) {
      return res.status(500).json({
        error: true,
        message: err.message,
      });
    }
  } else {
    return res.status(403).json("You can only update your account!");
  }
};

exports.getUser = async (req, res) => {
  const userId = req.query.userId;
  const username = req.query.username;

  try {
    const user = userId
      ? await User.findById(userId)
      : await User.findOne({ username: username });
    const { password, updatedAt, ...other } = user._doc;
    res.status(200).json(other);
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.searchUser = async (req, res) => {
  const query = req.query.q;
  try {
    console.log(query);
    const users = await User.find({
      $or: [
        { firstName: { $regex: query, $options: "i" } },
        { username: { $regex: query, $options: "i" } },
      ],
    }).limit(40);
    res.status(200).json(users);
  } catch (err) {
    res.status(500).send({
      error: true,
      message: err.message,
    });
  }
};
