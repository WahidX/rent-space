const express = require('express');
const passport = require('passport');
const router = express.Router();

const sellerController = require('../controllers/seller_controller');

router.get('/', passport.checkAuthentication, sellerController.sellerHome);

module.exports = router;
