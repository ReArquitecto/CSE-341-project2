const router = require('express').Router();
const passport = require('passport');

router.use('/api-docs', require('./swagger.js'));
router.use('/brands', require('./brands.js'));
router.use('/categories', require('./categories.js'));
router.use('/shoes', require('./shoes.js'));

router.get('/login', passport.authenticate('github'), (req, res) => {});

router.get('/logout', function (req, res, next) {
  req.logout(function(err) {
    if (err) { return next(err); }
    res.redirect('/');
  }
)}
);

module.exports = router;
