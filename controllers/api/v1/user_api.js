// module imports
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

// File imports
const AVATAR_PATH = path.join('/uploads/users/avatars');
const User = require('../../../models/tenant');
const env = require('../../../config/environment');
const Property = require('../../../models/property');
const Application = require('../../../models/application');

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
        token: jwt.sign(newUser.toJSON(), env.jwt_secret, {
          expiresIn: '10000000',
        }),
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
    req.user = await req.user.save();

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

module.exports.toggleApply = async function (req, res) {
  try {
    //check if id is valid
    let property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({
        message: 'Invalid request',
      });
    }

    // Checkingif the prop already applied or not

    let application = await Application.findOne({
      property: property._id,
      tenant: req.user._id,
    });

    if (application === null) {
      console.log('Creating application');
      application = await Application.create({
        property: property.id,
        seller: property.seller,
        tenant: req.user.id,
        status: 'Pending',
      });

      req.user.applied.push(property.id);
      property.applications.push(application.id);
    } else if (application.status === 'Pending') {
      console.log('Cancelling');

      application.remove();
      req.user.applied.splice(req.user.applied.indexOf(property.id), 1);
      property.applications.splice(
        property.applications.indexOf(application.id),
        1
      );
    } else {
      return res.status(401).json({
        message: 'Request not permitted',
      });
    }
    property = await property.save();
    req.user = await req.user.save();

    let user = await User.findById(req.user.id)
      .populate({ path: 'favourites' })
      .populate({ path: 'applied' });

    // console.log('USER: ', user);

    return res.status(200).json({
      message: 'Successful',
      success: true,
      data: {
        applied: user.applied,
      },
    });
  } catch (err) {
    console.log('Err: ', err);
    return res.status(404).json({
      message: 'Invalid Request',
    });
  }
};

module.exports.updateProfile = async function (req, res) {
  if (req.user.id === req.params.id) {
    try {
      let user = await User.findById(req.params.id);

      User.uploadedAvatar(req, res, async function (err) {
        if (err) {
          console.log('*Multer Error*', err);
        }

        user.name = req.body.name;
        user.email = req.body.email;
        user.contact = req.body.contact;

        // checking if there's a file in req
        if (req.file) {
          // checking if user already has an avatar if yes deleting it
          if (fs.existsSync(path.join(__dirname, '../../../', user.avatar))) {
            fs.unlinkSync(path.join(__dirname, '../../../', user.avatar));
          }

          user.avatar = User.avatarPath + '/' + req.file.filename;
        }
        user = await user.save();

        // Getting user's all data
        user = await User.findById(user._id)
          .populate({ path: 'favourites' })
          .populate({ path: 'applied' });

        return res.status(200).json({
          message: 'Upload successful!',
          success: true,
          data: {
            user,
          },
        });
      });
    } catch (err) {
      console.log('Err: ', err);
      return res.status(404).json({
        message: 'Invalid Request',
      });
    }
  } else {
    return res.status(404).json({
      message: 'Else',
    });
  }
};
