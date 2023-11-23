const express = require('express');
const router = express.Router();

const brandsController = require('../controllers/brands.js');

// router.get('/', (req, res) => { res.send('Hello from the brands.js routes file!'); });

router.get('/', brandsController.getAllBrands);

router.get('/:id', brandsController.getSingleBrand);

router.post('/', brandsController.createBrand);

router.put('/:id', brandsController.updateBrand);

router.delete('/:id', brandsController.deleteBrand);

module.exports = router;
