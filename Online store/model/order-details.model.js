const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        product_id: { type: DataTypes.INTEGER, allowNull: false },
        quantity: { type: DataTypes.TINYINT, allowNull: false },
        price: { type: DataTypes.STRING, allowNull: false }
    };
    
    return sequelize.define('orderDetail', attributes);
}