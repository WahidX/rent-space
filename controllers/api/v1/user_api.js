const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../../models/tenant');
const env = require('../../../config/environment');

module.exports.createSession = async function (req, res) {
  try {
    console.log('REQ:::: ', req.body);
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      let isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.json(422, {
          message: 'Incorrect email/password',
        });
      }
    }

    return res.json(200, {
      message: 'Sign in successful!',
      data: {
        user,
        token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: '10000' }),
      },
    });
  } catch (err) {
    console.log('Err : ', err);
    return res.json(500, {
      message: 'Internal Server Error',
    });
  }
};
