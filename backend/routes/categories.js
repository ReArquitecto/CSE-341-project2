const express = require('express');
const router = express.Router();

const categoriesController = require('../controllers/categories.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

// router.get('/', (req, res) => { res.send('Hello from the categories.js routes file!'); });

router.get('/', categoriesController.getAllCategories);

router.get('/:id', categoriesController.getSingleCategory);

router.post('/', isAuthenticated, categoriesController.createCategory);

router.put('/:id', isAuthenticated, categoriesController.updateCategory);

router.delete('/:id', isAuthenticated, categoriesController.deleteCategory);

module.exports = router;
