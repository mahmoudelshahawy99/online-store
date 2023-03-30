const { Op } = require('sequelize');
const db = require('../services/db');
const XLSX = require('xlsx');

module.exports = {
    getAll,
    saveClient,
    getClientById,
    updateClient,
    deleteClient,
    basicDetails
};

async function getAll() {
    const clients = await db.Client.findAll();
    return clients.map(x => basicDetails(x));
}

function basicDetails(client) {
    const { id, email, name, address, city } = client;
    return { id, email, name, address, city };
}

async function saveClient(params,file) {
    if(file){  
        let path = file.path;
        var clientFile = XLSX.readFile(path);
        var clientSheet = clientFile.Sheets[clientFile.SheetNames[0]];
        let data = XLSX.utils.sheet_to_json(clientSheet);
        let clients = [];
        data.forEach((row) => {
            let client = {
            email: row.Email,
            name: row.Name,
            address: row.Address,
            city: row.City
            };
            clients.push(client);
        });      
        await db.Client.bulkCreate(clients)
    }else{
        const client = new db.Client(params);
        await client.save();
    }
}

async function getClientById(id) {
    const client = await db.Client.findByPk(id);
    if (!client) throw 'Client not found';
    return basicDetails(client);
}

async function updateClient(id, params) {
    const client = await db.Client.findByPk(id);
    if (!client) throw 'Client not found';
    Object.assign(client, params);
    client.updatedAt = Date.now();
    await client.save();
}

async function deleteClient(id) {
    const client = await db.Client.findByPk(id);
    if (!client) throw 'Client not found';
    await client.destroy();
}