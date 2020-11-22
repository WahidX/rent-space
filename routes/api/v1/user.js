const express = require('express');
const router = express.Router();
const userAPI = require('../../../controllers/api/v1/user_api');

// auth
router.post('/create-session', userAPI.createSession);

// router.get('/:id', userDetails);

module.exports = router;
