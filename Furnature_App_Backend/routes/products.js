const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProduct);
router.get('/search/:key', productsController.searchProduct);
router.post('/', productsController.createProduct);

module.exports = router;