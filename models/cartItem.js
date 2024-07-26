const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Cart = require('./cart');
const Product = require('./product');

const CartItem = sequelize.define('CartItem', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    cart_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Cart,
            key: 'id'
        }
    },
    product_id: {
        type: DataTypes.INTEGER,
        references: {
            model: Product,
            key: 'id'
        }
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
    }
}, {
    tableName: 'cart_items',
    timestamps: false
});

module.exports = CartItem;
