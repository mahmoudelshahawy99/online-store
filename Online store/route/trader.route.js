var express = require('express');
var traderController = require('../controller/trader.controller');
const router = express.Router();

router.post('/register', traderController.registerSchema, traderController.register);
router.post('/verify-email', traderController.verifyEmailSchema, traderController.verifyEmail);
router.post('/signin', traderController.authenticateSchema, traderController.signin);

module.exports = router