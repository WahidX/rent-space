const express = require("express");
const router = express.Router();
const passport = require("passport");

const authController = require("../controllers/auth_controller");

router.use("/signin", authController.signin);
router.use("/signup", authController.signup);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/auth/signin" }),
  authController.createSession
);
router.post("/create-user", authController.createUser);
router.get("/sign-out", authController.destroySession);

module.exports = router;
