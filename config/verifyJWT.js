const jwt = require('jsonwebtoken');
const User = require('../models/tenant');
const env = require('./environment');

module.exports = async function (req, res, next) {
  // Looking for token in Authorization header
  const token = req.header('Authorization');
  if (!token) {
    return res.status(401).send('Access Denied!');
  }

  try {
    // Verifying the token
    const verified = jwt.verify(token, env.jwt_secret);
    let user = await User.findById(verified._id)
      .populate({ path: 'favourites' })
      .populate({ path: 'applied' });
    if (user) {
      req.user = user;
      next();
    } else {
      return res.status(401).send('Access Denied!');
    }
  } catch (err) {
    console.log('ERR: [', err, ']');
    return res.status(401).send('Access Denied!');
  }
};
