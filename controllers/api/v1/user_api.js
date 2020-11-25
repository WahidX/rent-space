const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../../models/tenant');
const env = require('../../../config/environment');
const Property = require('../../../models/property');

module.exports.createSession = async function (req, res) {
  try {
    let user = await User.findOne({ email: req.body.email })
      .populate({ path: 'favourites' })
      .populate({ path: 'applied' });

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
        token: jwt.sign(user.toJSON(), env.jwt_secret, {
          expiresIn: '10000000',
        }),
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

    if (req.body.password !== req.body.confirm_password) {
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

module.exports.toggleFavourite = async function (req, res) {
  try {
    //check if id is valid
    let property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({
        message: 'Invalid request',
      });
    }

    let index = -1;
    let favourites = req.user.favourites;

    for (i = 0; i < favourites.length; i++) {
      if (favourites[i].id === property.id) {
        index = i;
        break;
      }
    }

    let message = '';
    if (index === -1) {
      message = 'Added to favourites';
      req.user.favourites.push(property);
    } else {
      message = 'Removed from favourites';
      req.user.favourites.splice(index, 1);
    }
    req.user.save();

    return res.status(200).json({
      message,
      success: true,
      data: {
        favourites: req.user.favourites,
      },
    });
  } catch (err) {
    console.log('Err: ', err);
    return res.status(404).json({
      message: 'Invalid Request',
    });
  }
};

module.exports.getFavourites = async function (req, res) {
  try {
    req.user = await User.findById(req.user._id).populate({
      path: 'favourites',
    });

    return res.status(200).json({
      message: 'Have your Favourites',
      data: {
        favourites: req.user.favourites,
      },
    });
  } catch (err) {
    console.log('Err: ', err);
    return res.status(404).json({
      message: 'Invalid Request',
    });
  }
};
