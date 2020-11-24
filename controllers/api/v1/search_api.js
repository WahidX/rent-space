const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../../models/tenant');
const env = require('../../../config/environment');
const Property = require('../../../models/property');

module.exports.searchResults = async function (req, res) {
  try {
    // handling the price range
    if (
      typeof req.query.start !== 'undefined' ||
      typeof req.query.end !== 'undefined'
    ) {
      let obj = {};
      if (typeof req.query.start !== 'undefined') {
        obj.$gt = req.query.start - 0.01;
        delete req.query.start;
      }
      if (typeof req.query.end !== 'undefined') {
        obj.$lt = Number(req.query.end) + 0.01;
        delete req.query.end;
      }
      if (req.query.type === 'undefined') {
        req.query.price = obj;
        req.query.rent = obj;
      } else {
        if (req.query.type === 'Sale') {
          req.query.price = obj;
        } else {
          req.query.rent = obj;
        }
      }
    }

    let properties = await Property.find(req.query).sort('-createdAt');

    return res.status(200).json({
      message: 'Properties found!',
      success: true,
      data: {
        properties,
      },
    });
  } catch (err) {
    console.log('ERR: ', err);
    return res.status(404).json({
      message: 'No Records found',
    });
  }
};

module.exports.searchByID = async function (req, res) {
  try {
    let property = await Property.findById(req.params.id).populate(
      'seller',
      'name, contact, email'
    );
    return res.status(200).json({
      message: 'Got the Property',
      data: {
        property,
      },
    });
  } catch (err) {
    // console.log('Err: ', err);
    return res.status(404).json({
      message: "Sorry, We aren't covering Mars for now.",
    });
  }
};
