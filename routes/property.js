const express = require('express');
const router = express.Router();
const passport = require('passport');

const propertyController = require('../controllers/property_controller');

router.get('/form', propertyController.renderDetail);
router.use('/create', propertyController.createProperty);
router.post('/update/:id', propertyController.updateProperty);

module.exports = router;
