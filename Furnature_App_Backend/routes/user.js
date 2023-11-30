const router = require('express').Router();
const authController = require("../controllers/userController");

router.get('/:id', authController.getUser);
router.delete('/:id', authController.deleteUser);

module.exports = router;