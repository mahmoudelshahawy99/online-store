const { Op } = require('sequelize');
const db = require('../services/db');
const XLSX = require('xlsx');

module.exports = {
    getAll,
    saveProduct,
    getProductById,
    updateProduct,
    deleteProduct,
    getZeroQuantity
};

async function getAll() {
    const products = await db.Product.findAll();
    return products.map(x => basicDetails(x));
}

function basicDetails(product) {
    const { id, name, quantity, description, category, trademark } = product;
    return { id, name, quantity, description, category, trademark };
}

async function saveProduct(params,file) {
    if(file){  
        let path = file.path;
        var productFile = XLSX.readFile(path);
        var productSheet = productFile.Sheets[productFile.SheetNames[0]];
        let data = XLSX.utils.sheet_to_json(productSheet);
        let products = [];
        data.forEach((row) => {
            let product = {
            code: row.Code,
            name: row.Name,
            quantity: row.Quantity,
            description: row.Description,
            category: row.Description,
            trademark: row.Trademark
            };
            products.push(product);
        });      
        await db.Product.bulkCreate(products)
    }else{
        const product = new db.Product(params);
        await product.save();
    }
}

async function getProductById(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw 'Product not found';
    return basicDetails(product);
}

async function updateProduct(id, params, file) {
    if(file){  
        let path = file.path;
        var productFile = XLSX.readFile(path);
        var productSheet = productFile.Sheets[productFile.SheetNames[0]];
        let data = XLSX.utils.sheet_to_json(productSheet);
        for($i=0; $i < data.length; $i++) {
            var product = await db.Product.findOne({ where: { code: data[$i].Code } });
            product.quantity = data[$i].Quantity;
            product.updatedAt = Date.now();
            await product.save();
        };
    }else{
        const product = await db.Product.findByPk(id);
        if (!product) throw 'Product not found';
        Object.assign(product, params);
        product.updatedAt = Date.now();
        await product.save();
    }
}

async function deleteProduct(id) {
    const product = await db.Product.findByPk(id);
    if (!product) throw 'Product not found';
    await product.destroy();
}

async function getZeroQuantity(trader_id) {
    const products = await db.Product.findAll({ where: { quantity: 0 } });
    if(!products.length){
        throw 'No products hav zero quantity';
    }else{
        return products.map(x => basicDetails(x));
    }
}