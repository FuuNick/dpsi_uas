const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Order = sequelize.define('Order', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    user_id: {
        type: DataTypes.INTEGER,
        references: {
            model: User,
            key: 'id'
        }
    },
    total: {
        type: DataTypes.DECIMAL(10, 2),
    },
    status: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'orders',
    timestamps: false
});

module.exports = Order;
