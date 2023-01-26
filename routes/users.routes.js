const router = require("express").Router();
const userController = require("../controllers/user.controller");
const verifyToken = require("../middlewares/verify.token.middleware");

// Update user
router.put("/update/:id", verifyToken, userController.updateUser);

router.get("/", userController.getUser);

router.get("/search", userController.searchUser);

module.exports = router;
