var express = require('express');
var OrderController = require('../controller/order.controller');
const authorize = require('../middleware/authorize');
const router = express.Router();

router.get('/orders', authorize(), OrderController.getOrderList);
router.post("/orders/save",authorize(), OrderController.OrderSchema, OrderController.saveOrder);
router.get('/orders/daily', authorize(), OrderController.getDailyOrderList);

module.exports = router