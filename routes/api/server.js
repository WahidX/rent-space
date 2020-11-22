const express = require('express');
const router = express.Router();

// May need to be deleted
router.use('/v1', require('./v1/server'));

module.exports = router;
