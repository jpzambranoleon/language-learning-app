const router = require("express").Router();
const messageController = require("../controllers/message.controller");

// New Message
router.post("/", messageController.newMessage);

// Get Messages of User
router.get("/:conversationId", messageController.getMessage);

module.exports = router;
