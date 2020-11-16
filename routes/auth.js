const express = require("express");
const router = express.Router();
const passport = require("passport");

const authController = require("../controllers/auth_controller");

router.get("/signin", authController.signin);
router.get("/signup", authController.signup);
router.post(
  "/create-session",
  passport.authenticate("local", { failureRedirect: "/auth/signin" }),
  authController.createSession
);
router.post("/create-user", authController.createUser);
router.get("/sign-out", authController.destroySession);

router.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);
router.get(
  "/google/callback",
  passport.authenticate("google", { failureRedirect: "/auth/signin" }),
  authController.createSession
);

module.exports = router;
