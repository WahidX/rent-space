const passport = require('passport');
const Property = require('../models/property');
const Seller = require('../models/seller');

module.exports = {
  renderForm: async function (req, res) {
    // rendering create form or update form based on query
    // property/form?type=edit&id=ID
    // property/form?type=create

    if (req.query.type === 'create') {
      return res.render('detail', {
        title: 'Property',
        type: 'create',
      });
    } else {
      // Passing current values to be updated
      try {
        const current_property = await Property.findById(req.query.id);
        return res.render('detail', {
          title: 'Property',
          type: 'update',
          current_property,
        });
      } catch (err) {
        console.log('ERR: ', err);
        req.flash('error', err);
        return res.redirect('back');
      }
    }
  },

  createProperty: async function (req, res) {
    // Not working
    if (!req.isAuthenticated()) {
      console.log('not');
      return res.redirect('/auth/signin');
    }

    let newProperty;
    try {
      if (req.body.type === 'Rent') {
        newProperty = await Property.create({
          title: req.body.title,
          description: req.body.description,
          location: req.body.location,
          rent: req.body.rent,
          beds: req.body.beds,
          baths: req.body.baths,
          type: 'Rent',
          seller: req.user.id,
        });
      } else {
        newProperty = await Property.create({
          title: req.body.title.trim(),
          description: req.body.description.trim(),
          location: req.body.location,
          price: req.body.price.trim(),
          beds: req.body.beds.trim(),
          baths: req.body.baths.trim(),
          type: 'Sale',
          seller: req.user.id,
        });
      }

      req.user.properties.push(newProperty.id);
      req.user.save();

      req.flash('success', 'Property created successfully!');
      return res.redirect(`/property/form?type=edit&id=${newProperty._id}`);
    } catch (err) {
      console.log('Error in creating property: ', err);
      req.flash('error', `Error: ${err}`);
      return res.redirect('back');
    }
  },

  updateProperty: async function (req, res) {
    // property/form?type=edit&id=ID

    let property = await Property.findById(req.params.id);

    if (property && property.seller == req.user.id) {
      property.title = req.body.title.trim();
      property.description = req.body.description.trim();
      property.location = req.body.location;
      property.beds = req.body.beds.trim();
      property.baths = req.body.baths.trim();
      property.type = req.body.type;
      property.price = req.body.price.trim();
      property.rent = req.body.rent.trim();
      property.save();

      req.flash('success', 'Property updated successfully!');
    } else {
      req.flash('error', 'Invalid request!');
    }

    return res.redirect('back');
  },

  deleteProperty: async function (req, res) {
    let property = await Property.findById(req.params.id);

    if (property && property.seller == req.user.id) {
      req.user.properties.pull(property.id);
      property.remove();

      req.flash('success', 'Property deleted successfully!');
      return res.redirect('back');
    } else {
      req.flash('error', 'Invalid request!');
      return res.redirect('back');
    }
  },
};
