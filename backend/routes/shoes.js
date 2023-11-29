const express = require('express');
const router = express.Router();

const shoesController = require('../controllers/shoes.js');
const { isAuthenticated } = require('../middleware/authenticate.js');

// router.get('/', (req, res) => { res.send('Hello from the shoes.js routes file!'); });

router.get('/', shoesController.getAllShoes);

router.get('/:id', shoesController.getSingleShoe);

router.post('/', isAuthenticated, shoesController.createShoe);

router.put('/:id', isAuthenticated, shoesController.updateShoe);

router.delete('/:id', isAuthenticated, shoesController.deleteShoe);

module.exports = router;
