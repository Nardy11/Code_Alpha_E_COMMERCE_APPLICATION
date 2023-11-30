const router = require('express').Router();
const orderController = require("../controllers/orderController");

router.get('/:id', orderController.getUserOrder);
router.post('/', orderController.addToOrders);
router.delete('/:orderId/:customerId', orderController.removeFromOrders);
module.exports = router;