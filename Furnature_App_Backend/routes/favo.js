const express = require('express');
const router = express.Router();
const favoController = require('../controllers/favoController');
router.get('/getFav/:id', favoController.getUserFavorite);
router.get('/existInFav/:id/:productId', favoController.existInFavorite);
router.post('/addFav/:id/:productId', favoController.addFavorite);
router.delete('/deleteFav/:id/:productId', favoController.deleteFavorite);

module.exports = router;