const Joi = require('joi');
const validateRequest = require('../util/validate-request');
const orderService = require('../services/order.service');

module.exports = {
    getOrderList,
    saveOrder,
    OrderSchema,
    getDailyOrderList
};

function getOrderList(req, res, next) {
    orderService.getAll(req.user.id)
        .then(orders => res.json(orders))
        .catch(next);
}

function saveOrder(req, res, next) {
    orderService.saveOrder(req.body,req.user.id)
        .then(() => res.json({ message: 'Order added successfully' }))
        .catch(next);
}

function OrderSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        total_price: Joi.number().integer().required(),
        items: Joi.array().required()
    });
    validateRequest(req, next, schema);
}

function getDailyOrderList(req, res, next) {
    orderService.getDailyReport()
        .then(orders => res.json(orders))
        .catch(next);
}