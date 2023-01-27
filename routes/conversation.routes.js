const router = require("express").Router();
const conversationController = require("../controllers/conversation.controller");

// New Conversation
router.post("/", conversationController.newConversation);

// Get Conversation of a User
router.get("/:id", conversationController.getConversation);

module.exports = router;
