const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Cart = sequelize.define('Cart', {
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
    }
}, {
    tableName: 'carts',
    timestamps: false
});

module.exports = Cart;
