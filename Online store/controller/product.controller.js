const Joi = require('joi');
const validateRequest = require('../util/validate-request');
const productService = require('../services/product.service');

module.exports = {
    getProductList,
    saveProduct,
    productSchema,
    getProductDetails,
    updateProduct,
    deleteProduct,
    getZeroQuantity
};

function getProductList(req, res, next) {
    productService.getAll()
        .then(products => res.json(products))
        .catch(next);
}

function saveProduct(req, res, next) {
    productService.saveProduct(req.body,req.file)
        .then(() => res.json({ message: 'Product added successfully' }))
        .catch(next);
}

function productSchema(req, res, next) {
    const schema = Joi.object({
        code: Joi.string().required(),
        name: Joi.string().required(),
        quantity: Joi.number().integer().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        trademark: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function getProductDetails(req, res, next) {
    productService.getProductById(req.params.productId)
        .then(product => product ? res.json(product) : res.sendStatus(404))
        .catch(next);
}

function updateProduct(req, res, next) {
    productService.updateProduct(req.params.productId, req.body,req.file)
        .then(() => res.json({ message: 'Product updated successfully' }))
        .catch(next);
}
function deleteProduct(req, res, next) {
    productService.deleteProduct(req.params.productId)
        .then(() => res.json({ message: 'Product deleted successfully' }))
        .catch(next);
}

function getZeroQuantity(req, res, next) {
    productService.getZeroQuantity()
        .then(products => res.json(products))
        .catch(next);
}