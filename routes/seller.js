const express = require("express");
const passport = require("passport");
const router = express.Router();

const sellerController = require("../controllers/seller_controller");

router.use("/", passport.checkAuthentication, sellerController.home);

module.exports = router;
