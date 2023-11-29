const express = require('express');
const router = express.Router();

const brandsController = require('../controllers/brands.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

// router.get('/', (req, res) => { res.send('Hello from the brands.js routes file!'); });

router.get('/', brandsController.getAllBrands);

router.get('/:id', brandsController.getSingleBrand);

router.post('/', isAuthenticated, brandsController.createBrand);

router.put('/:id', isAuthenticated, brandsController.updateBrand);

router.delete('/:id', isAuthenticated, brandsController.deleteBrand);

module.exports = router;
