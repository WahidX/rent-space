const express = require('express');
const router = express.Router();
const passport = require('passport');

const propertyController = require('../controllers/property_controller');

router.get('/form', propertyController.renderDetail);

module.exports = router;
