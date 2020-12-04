const express = require('express');
const router = express.Router();
const userAPI = require('../../../controllers/api/v1/user_api');
const verifyJWT = require('../../../config/verifyJWT');

// auth
router.post('/create-session', userAPI.createSession);
router.post('/create-user', userAPI.createUser);
router.get('/authenticate', verifyJWT, userAPI.authenticate);
// router.get('/profile/:id', userDetails);
router.post('/update/:id', verifyJWT, userAPI.updateProfile);

router.get('/toggle-fav/:id', verifyJWT, userAPI.toggleFavourite);
router.get('/favs', verifyJWT, userAPI.getFavourites);

router.get('/toggle-apply/:id', verifyJWT, userAPI.toggleApply);
// router.get('/rm-apply', )
// router.get('/applied', )

module.exports = router;
