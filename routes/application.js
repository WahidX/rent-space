const express = require('express');
const passport = require('passport');
const application_controller = require('../controllers/application_controller');
const router = express.Router();

const applicationController = require('../controllers/application_controller');

router.get(
  '/',
  passport.checkAuthentication,
  applicationController.applicationHome
);
router.get(
  '/accept',
  passport.checkAuthentication,
  application_controller.acceptApplication
);
router.get(
  '/reject',
  passport.checkAuthentication,
  application_controller.rejectApplication
);

module.exports = router;
