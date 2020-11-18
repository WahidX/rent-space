const passport = require('passport');
const Property = require('../models/property');
const Seller = require('../models/seller');
const Application = require('../models/application');

module.exports = {
  applicationHome: async function (req, res) {
    // http://localhost:8000/application?mode=all

    let applications;

    if (!req.query.mode) {
      applications = await Application.find({ seller: req.user._id }).populate(
        'seller',
        'property',
        'tenant'
      );
    } else {
      applications = await Application.find({
        seller: req.user._id,
        status: req.query.mode,
      }).populate('property', 'tenant');
    }

    return res.render('application', {
      title: 'Application',
      mode: req.query.mode,
      applications,
    });
  },
};
