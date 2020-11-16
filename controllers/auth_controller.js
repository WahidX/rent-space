const User = require("../models/seller");
const bcrypt = require("bcrypt");

module.exports = {
  signin: function (req, res) {
    if (req.isAuthenticated()) {
      return res.redirect("/seller/profile");
    }

    return res.render("signin", {
      title: "Signin",
    });
  },

  signup: function (req, res) {
    if (req.isAuthenticated()) {
      return res.redirect("/seller/profile");
    }

    return res.render("signup", {
      title: "Signup",
    });
  },
};
