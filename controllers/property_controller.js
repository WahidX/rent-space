const Property = require("../models/property");

module.exports = {
  renderDetail: function (req, res) {
    return res.render("detail", {
      title: "Property",
      type: "create/update",
    });
  },

  //   Add,
};
