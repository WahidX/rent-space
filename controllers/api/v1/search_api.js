const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../../../models/tenant');
const env = require('../../../config/environment');
const Property = require('../../../models/property');

module.exports.searchResults = async function (req, res) {
  try {
    //page TODO
    // let page = req.query.page;
    // delete req.query[page];

    let properties = await Property.find(req.query).sort('-createdAt');

    return res.status(200).json({
      message: 'Properties found!',
      success: true,
      data: {
        properties,
      },
    });
  } catch (err) {
    return res.status(404).json({
      message: 'No Records found',
    });
  }
};
