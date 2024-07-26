const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./user');

const Payment = sequelize.define('Payment', {
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
    method: {
        type: DataTypes.STRING,
    },
    security_code: {
        type: DataTypes.STRING,
    }
}, {
    tableName: 'payments',
    timestamps: false
});

module.exports = Payment;
