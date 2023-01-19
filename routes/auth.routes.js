const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const {
  checkDuplicateEmail,
  verrifyEmail,
} = require("../middlewares/register.middleware");

router.post("/register", [checkDuplicateEmail], authController.register);

router.post("/login", authController.login);

module.exports = router;
