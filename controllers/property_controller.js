const Property = require('../models/property');

module.exports = {
  renderDetail: async function (req, res) {
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
        req.flash('error', err);
        return res.redirect('back');
      }
    }
  },

  createProperty: function (req, res) {
    console.log('created');
    req.flash('success', 'Property created successfully!');
    return res.redirect('back');
  },

  updateProperty: function (req, res) {
    console.log('updated');
    req.flash('success', 'Property updated successfully!');
    return res.redirect('back');
  },
};
