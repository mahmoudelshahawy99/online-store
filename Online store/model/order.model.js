const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        firstName: { type: DataTypes.STRING, allowNull: false },
        lastName: { type: DataTypes.STRING, allowNull: false },
        total_price: { type: DataTypes.STRING, allowNull: false }
    };

    return sequelize.define('order', attributes);
}