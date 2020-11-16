const express = require("express");
const router = express.Router();

// const homeController = require("../controllers/home_controller");

// const { home } = require("../controllers/home_controller");

router.get("/", function (req, res) {
  let data = {
    name: "Droid",
    hobby: "Gaming",
  };

  return res.json(200, {
    data,
  });
});

router.use("/auth", require("./auth"));
router.use("/seller", require("./seller"));

console.log("router loaded");

module.exports = router;
