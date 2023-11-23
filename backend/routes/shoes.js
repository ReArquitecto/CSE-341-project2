const express = require('express');
const router = express.Router();

const shoesController = require('../controllers/shoes.js');

// router.get('/', (req, res) => { res.send('Hello from the shoes.js routes file!'); });

router.get('/', shoesController.getAllShoes);

router.get('/:id', shoesController.getSingleShoe);

router.post('/', shoesController.createShoe);

router.put('/:id', shoesController.updateShoe);

router.delete('/:id', shoesController.deleteShoe);

module.exports = router;
