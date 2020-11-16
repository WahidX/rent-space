const User = require("../models/seller");

module.exports = {
  home: function (req, res) {
    if (req.isAuthenticated()) {
      return res.redirect("/seller/profile");
    }

    return res.render("home", {
      title: "Home",
    });
  },
};
