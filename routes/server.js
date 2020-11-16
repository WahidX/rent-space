const express = require("express");
const router = express.Router();

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
router.use("/property", require("./property"));

console.log("router loaded");

module.exports = router;
