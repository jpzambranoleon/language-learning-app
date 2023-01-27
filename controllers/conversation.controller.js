const Conversation = require("../models/conversation.model");

// New conversation
exports.newConversation = async (req, res) => {
  let newConvo = new Conversation({
    members: [req.body.senderId, req.body.receiverId],
  });
  try {
    let savedConversation = await newConvo.save();
    res.status(200).json(savedConversation);
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

// Get conversation of a user
exports.getConversation = async (req, res) => {
  try {
    let conversation = await Conversation.find({
      members: { $in: [req.params.id] },
    });
    res.status(200).json(conversation);
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};
