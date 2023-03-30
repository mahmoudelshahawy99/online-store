const Joi = require('joi');
const validateRequest = require('../util/validate-request');
const clientService = require('../services/client.service');

module.exports = {
    getClientList,
    saveClient,
    clientSchema,
    getClientDetails,
    updateClient,
    deleteClient
};

function getClientList(req, res, next) {
    clientService.getAll()
        .then(clients => res.json(clients))
        .catch(next);
}

function saveClient(req, res, next) {
    clientService.saveClient(req.body,req.file)
        .then(() => res.json({ message: 'Client added successfully' }))
        .catch(next);
}

function clientSchema(req, res, next) {
    const schema = Joi.object({
        email: Joi.string().email().required(),
        name: Joi.string().required(),
        address: Joi.string().required(),
        city: Joi.string().required(),
    });
    validateRequest(req, next, schema);
}

function getClientDetails(req, res, next) {
    clientService.getClientById(req.params.clientId)
        .then(client => client ? res.json(client) : res.sendStatus(404))
        .catch(next);
}

function updateClient(req, res, next) {
    clientService.updateClient(req.params.clientId, req.body)
        .then(() => res.json({ message: 'Client updated successfully' }))
        .catch(next);
}
function deleteClient(req, res, next) {
    clientService.deleteClient(req.params.clientId)
        .then(() => res.json({ message: 'Client deleted successfully' }))
        .catch(next);
}