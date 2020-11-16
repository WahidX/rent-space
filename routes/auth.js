const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth_controller");

router.use("/signin", authController.signin);
router.use("/signup", authController.signup);

module.exports = router;
