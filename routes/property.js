const express = require('express');
const router = express.Router();
const passport = require('passport');

const propertyController = require('../controllers/property_controller');

router.get(
  '/form',
  passport.checkAuthentication,
  propertyController.renderForm
);
router.post(
  '/create',
  passport.checkAuthentication,
  propertyController.createProperty
);
router.post(
  '/update/:id',
  passport.checkAuthentication,
  propertyController.updateProperty
);
router.get(
  '/delete/:id',
  passport.checkAuthentication,
  propertyController.deleteProperty
);

module.exports = router;
