const express = require('express');
const passport = require('passport');
const router = express.Router();

const applicationController = require('../controllers/application_controller');

router.get(
  '/',
  passport.checkAuthentication,
  applicationController.applicationHome
);

module.exports = router;
