const express = require('express');
const router = express.Router();

// router.use('/search', require('./search'));
// router.use('/property', require('./property'));
router.use('/user', require('./user'));

module.exports = router;
