const User = require("../models/seller");
const bcrypt = require("bcrypt");

module.exports = {
  signin: function (req, res) {
    if (req.isAuthenticated()) {
      return res.redirect("/seller/");
    }

    return res.render("signin", {
      title: "Signin",
    });
  },

  signup: function (req, res) {
    if (req.isAuthenticated()) {
      return res.redirect("/seller/");
    }

    return res.render("signup", {
      title: "Signup",
    });
  },

  createUser: async function (req, res) {
    if (req.body.password != req.body.confirm_password) {
      req.flash("error", "Password doesn't match");
      return res.redirect("back");
    }

    try {
      let user = await User.findOne({ email: req.body.email });
      if (user) {
        req.flash("error", "Email already exists");
        return res.redirect("back");
      }

      // Hashing the given password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(req.body.password, salt);

      let newUser = await User.create({
        email: req.body.email,
        password: hashedPassword,
        name: req.body.name,
        contact: req.body.contact,
      });

      req.flash("success", "New user created");
      return res.redirect("/auth/signin");
    } catch (err) {
      console.log("Err: ", err);
      return res.redirect("back");
    }
  },

  createSession: function (req, res) {
    req.flash("success", "Logged in Successfully!");

    return res.redirect("/seller/");
  },

  destroySession: function (req, res) {
    req.logout();
    req.flash("success", "Logged out successfully!");
    return res.redirect("/seller/");
  },
};
