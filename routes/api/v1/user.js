const express = require('express');
const router = express.Router();
const userAPI = require('../../../controllers/api/v1/user_api');
const verifyJWT = require('../../../config/verifyJWT');
const { verify } = require('jsonwebtoken');

// auth
router.post('/create-session', userAPI.createSession);
router.post('/create-user', userAPI.createUser);
// router.get('/profile/:id', userDetails);

router.get('/toggle-fav/:id', verifyJWT, userAPI.toggleFavourite);
router.get('/favs', verifyJWT, userAPI.getFavourites);

// router.get('/toggle-apply/:id', )
// router.get('/applied', )

module.exports = router;
