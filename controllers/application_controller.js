const passport = require('passport');
const Application = require('../models/application');

module.exports = {
  applicationHome: async function (req, res) {
    // http://localhost:8000/application?mode=Pending

    let applications;

    if (req.query.mode === undefined) {
      applications = await Application.find({ seller: req.user.id })
        .populate({
          path: 'tenant',
          select: 'name email contact',
        })
        .populate({
          path: 'property',
          select: 'title location image rent price',
        });
    } else {
      applications = await Application.find({
        seller: req.user.id,
        status: req.query.mode,
      })
        .populate({
          path: 'tenant',
          select: 'name email contact',
        })
        .populate({
          path: 'property',
          select: 'title location image rent price',
        });
    }

    return res.render('application', {
      title: 'Application',
      mode: req.query.mode,
      applications,
    });
  },
};
