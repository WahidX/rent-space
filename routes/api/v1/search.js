const express = require('express');
const router = express.Router();
const searchAPI = require('../../../controllers/api/v1/search_api');

router.get('/', searchAPI.searchResults); // will contain all filters
router.get('/:id', searchAPI.searchByID);

module.exports = router;
