const Joi = require('joi');
const validateRequest = require('../util/validate-request');
const traderService = require('../services/trader.service');

module.exports = {
    register,
    registerSchema,
    verifyEmail,
    verifyEmailSchema,
    signin,
    authenticateSchema,
};

function register(req, res, next) {
    traderService.register(req.body)
        .then(() => res.json({ message: 'Registration successful, please check your email for verification' }))
        .catch(next);
}

function registerSchema(req, res, next) {
    const schema = Joi.object({
        firstName: Joi.string().required(),
        lastName: Joi.string().required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        confirmPassword: Joi.string().valid(Joi.ref('password')).required(),
    });
    validateRequest(req, next, schema);
}

function verifyEmail(req, res, next) {
    traderService.verifyEmail(req.body)
        .then(() => res.json({ message: 'Verification successful, you can now login' }))
        .catch(next);
}

function verifyEmailSchema(req, res, next) {
    const schema = Joi.object({
        token: Joi.string().required()
    });
    validateRequest(req, next, schema);
}

function signin(req, res, next) {
    const { email, password } = req.body;
    traderService.authenticate({ email, password })
        .then(({...trader }) => {
            res.json(trader);
        })
        .catch(next);
}

function authenticateSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().required(),
        password: Joi.string().required()
    });
    validateRequest(req, next, schema);
}