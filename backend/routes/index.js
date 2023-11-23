const router = require('express').Router();

router.get(
  // #swagger.tags=['Home'];
  '/',
  (req, res) => {
    res.send('Hello from the index.js routes file!');
  }
);

router.use('/api-docs', require('./swagger.js'));

router.use('/brands', require('./brands.js'));

router.use('/categories', require('./categories.js'));

router.use('/shoes', require('./shoes.js'));

module.exports = router;
