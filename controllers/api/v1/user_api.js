const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../../models/tenant');
const env = require('../../../config/environment');

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email });

    if (user) {
      let isMatch = await bcrypt.compare(req.body.password, user.password);
      if (!isMatch) {
        return res.status(422).json({
          message: 'Incorrect email/password',
        });
      }
    }

    return res.status(200).json({
      message: 'Sign in successful!',
      success: true,
      data: {
        user,
        token: jwt.sign(user.toJSON(), env.jwt_secret, { expiresIn: '10000' }),
      },
    });
  } catch (err) {
    return res.status(422).json({
      message: 'Incorrect email/password',
    });
  }
};

module.exports.createUser = async function (req, res) {
  try {
    let user1 = await User.findOne({ email: req.body.email });
    let user2 = await User.findOne({ contact: req.body.contact });

    if (user1 || user2) {
      return res.status(422).json({
        message: 'Email or Contact No already registered',
      });
    }
    let p1 = req.body.password;
    let p2 = req.body.confirm_password;
    console.log(p1, p2, p1 !== p2);
    if (p1 != p2) {
      return res.status(422).json({
        message: "Passwords didn't match!",
      });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    let newUser = await User.create({
      email: req.body.email,
      password: hashedPassword,
      name: req.body.name,
      contact: req.body.contact,
    });

    return res.status(200).json({
      message: 'User created Successfully',
      success: true,
      data: {
        user: newUser,
      },
    });
  } catch (err) {
    console.log('Err:  ', err);
    return res.status(500).json({
      message: 'Internal Server Error',
    });
  }
};
