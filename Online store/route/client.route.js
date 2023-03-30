var express = require('express');
var clientController = require('../controller/client.controller');
const authorize = require('../middleware/authorize');
const router = express.Router();
const upload = require('../middleware/upload');

router.get('/clients', authorize(), clientController.getClientList);
router.post("/clients/save",authorize(), clientController.clientSchema, clientController.saveClient);
router.post("/clients/uploadFile",authorize(), upload.single("file"), clientController.saveClient);
router.get("/clients/details/:clientId",authorize(), clientController.getClientDetails);
router.put("/clients/update/:clientId",authorize(), clientController.clientSchema, clientController.updateClient);
router.delete("/clients/delete/:clientId",authorize(), clientController.deleteClient);

module.exports = router