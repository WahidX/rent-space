const express = require('express');
const router = express.Router();
const applicationAPI = require('../../../controllers/api/v1/application_api');
const verifyJWT = require('../../../config/verifyJWT');

router.get('/accept', applicationAPI.accept);

module.exports = router;
