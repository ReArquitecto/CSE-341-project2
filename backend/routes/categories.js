const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories.js');

// router.get('/', (req, res) => { res.send('Hello from the categories.js routes file!'); });

router.get('/', categoriesController.getAllCategories);

router.get('/:id', categoriesController.getSingleCategory);

router.post('/', categoriesController.createCategory);

router.put('/:id', categoriesController.updateCategory);

router.delete('/:id', categoriesController.deleteCategory);

module.exports = router;
