const config = require('../config.json');
const mysql = require('mysql2/promise');
const { Sequelize } = require('sequelize');

module.exports = db = {};

initialize();

async function initialize() {
    
    const { host, port, user, password, database } = config.database;
    const connection = await mysql.createConnection({ host, port, user, password });
    await connection.query(`CREATE DATABASE IF NOT EXISTS \`${database}\`;`);

    const sequelize = new Sequelize(database, user, password, { dialect: 'mysql' });

    db.Trader = require('../model/trader.model')(sequelize);
    db.Product = require('../model/product.model')(sequelize);
    db.Client = require('../model/client.model')(sequelize);
    db.Order = require('../model/order.model')(sequelize);
    db.OrderDetails = require('../model/order-details.model')(sequelize);

    db.Trader.hasMany(db.Order, { onDelete: 'CASCADE' });
    db.Order.belongsTo(db.Trader);

    db.Order.hasMany(db.OrderDetails, { onDelete: 'CASCADE' });
    db.OrderDetails.belongsTo(db.Order);
    
    await sequelize.sync();
}