const router = require("express").Router();
const authController = require("../controllers/auth.controller");
const {
  checkDuplicateEmail,
  verrifyEmail,
} = require("../middlewares/register.middleware");

router.post(
  "/register",
  [checkDuplicateEmail, verrifyEmail],
  authController.register
);

module.exports = router;
