const express = require('express');
const router = express.Router();

router.get('/', function (req, res) {
  let data = {
    properties: [
      {
        name: 'Droid',
        hobby: 'Assaulting',
      },
      {
        name: 'Bot',
        hobby: 'Sniping',
      },
      {
        name: 'Wahid',
        hobby: 'Gaming',
      },
    ],
  };

  return res.json(200, {
    data,
  });
});

router.use('/auth', require('./auth'));
router.use('/seller', require('./seller'));
router.use('/property', require('./property'));
router.use('/application', require('./application'));

// router.use('/api', require('./api/server'));

console.log('router loaded');

module.exports = router;
