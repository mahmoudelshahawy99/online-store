const { DataTypes } = require('sequelize');

module.exports = model;

function model(sequelize) {
    const attributes = {
        code: { type: DataTypes.STRING, allowNull: false },
        name: { type: DataTypes.STRING, allowNull: false },
        quantity: { type: DataTypes.TINYINT, allowNull: false },
        description: { type: DataTypes.STRING, allowNull: false },
        category: { type: DataTypes.STRING, allowNull: false },
        trademark: { type: DataTypes.STRING, allowNull: false },
    };

    return sequelize.define('product', attributes);
}