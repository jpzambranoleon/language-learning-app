const router = require("express").Router();
const assistantController = require("../controllers/assistant.controller");

router.post("/create", assistantController.createAI);

router.get("/", assistantController.getAI);

router.put("/update/:id", assistantController.updateAI);

router.delete("/delete/:id", assistantController.deleteAI);

router.get("/get/all/:username", assistantController.getAllUsersAI);

//router.post("/conversations", assistantController.newAIConversation);

//router.get("/conversations/get/:id", assistantController.getAIConversation);

//router.post("/messages", assistantController.postHumanMessage);

router.post("/messages/ai", assistantController.postAIMessage);

//router.get("/messages/get/:conversationId", assistantController.getAIMessages);

module.exports = router;
