const passport = require('passport');
const Property = require('../models/property');

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

      console.log('Property created');
      req.flash('success', 'Property created successfully!');
      return res.redirect('back');
    } catch (err) {
      console.log('Error in creating property: ', err);
      req.flash('error', `Error: ${err}`);
      return res.redirect('back');
    }
  },

  updateProperty: async function (req, res) {
    // property/form?type=edit&id=ID

    let property = await Property.findByIdAndUpdate(req.query.id, {
      title: req.body.title.trim(),
      description: req.body.description.trim(),
      location: req.body.location,
      beds: req.body.beds.trim(),
      baths: req.body.baths.trim(),
      type: req.body.type,
      price: req.body.price.trim(),
      rent: req.body.rent.trim(),
    });

    console.log('updated');
    req.flash('success', 'Property updated successfully!');
    return res.redirect('back');
  },
};
