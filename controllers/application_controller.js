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
          select: 'name email contact avatar',
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
          select: 'name email contact avatar',
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

  acceptApplication: async function (req, res) {
    if (!req.query.id) {
      req.flash('error', 'Invalid Request');
      return res.redirect('back');
    }

    try {
      let application = await Application.findById(req.query.id);

      if (
        application.seller == req.user.id &&
        application.status === 'Pending'
      ) {
        application.status = 'Accepted';
        application.save();
        req.flash('success', 'Accepted!');
      } else {
        throw 'wrong user/status';
      }

      return res.redirect('back');
    } catch (err) {
      req.flash('error', 'Invalid Request!');
      return res.redirect('back');
    }
  },

  rejectApplication: async function (req, res) {
    if (!req.query.id) {
      req.flash('error', 'Invalid Request');
      return res.redirect('back');
    }
    try {
      let application = await Application.findById(req.query.id);

      if (
        application.seller == req.user.id &&
        application.status === 'Pending'
      ) {
        application.status = 'Rejected';
        application.save();
        req.flash('success', 'Rejected!');
      } else {
        throw 'wrong user/status';
      }
      return res.redirect('back');
    } catch (err) {
      req.flash('error', 'Invalid Request!');
      return res.redirect('back');
    }
  },
};
