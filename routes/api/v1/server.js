const express = require('express');
const router = express.Router();

router.use('/search', require('./search'));
router.use('/user', require('./user'));
router.use('/application', require('./application'));

module.exports = router;
