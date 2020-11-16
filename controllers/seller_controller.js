const User = require("../models/seller");

module.exports = {
  home: function (req, res) {
    return res.render("home", {
      title: "Home",
    });
  },
};
