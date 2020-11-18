const Property = require('../models/property');
const Seller = require('../models/seller');

module.exports = {
  sellerHome: async function (req, res) {
    try {
      let current_seller = await Seller.findById(req.user.id).populate({
        path: 'properties',
      });

      return res.render('home', {
        title: 'Home',
        properties: current_seller.properties,
      });
    } catch (err) {
      console.log('Err: ', err);
      req.flash('error', 'Internal Error');
      return res.redirect('back');
    }
  },
};
