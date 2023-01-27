const Message = require("../models/message.model");

// Add Messages
exports.newMessage = async (req, res) => {
  let newMess = new Message(req.body);

  try {
    let savedMessage = await newMess.save();
    res.status(200).json(savedMessage);
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};

// Get Messages
exports.getMessage = async (req, res) => {
  try {
    let messages = await Message.find({
      conversationId: req.params.conversationId,
    });
    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({
      error: true,
      message: err.message,
    });
  }
};
