const express = require("express");
const router = express.Router();

const sellerController = require("../controllers/seller_controller");

router.use("/", sellerController.home);

module.exports = router;
