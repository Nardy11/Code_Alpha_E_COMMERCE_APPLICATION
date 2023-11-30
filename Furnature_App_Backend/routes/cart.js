const router = require('express').Router();
const cartController = require("../controllers/cartController");

router.get('/find/:id', cartController.getCart);
router.post('/', cartController.addToCart);
router.put('/decrementquantity', cartController.decrementCartItem);
router.put('/incrementquantity', cartController.incrementCartItem);
router.delete('/:cartItemId/:userId', cartController.deleteCartItem);
module.exports = router;