const { Sequelize } = require('sequelize');
const config = require('../configure')

const sequelize = new Sequelize(config.db.database, config.db.username, config.db.password, {
    host: config.db.host,
    port: config.db.port,
    dialect: config.db.dialect,
    dialectModule: require('mysql2')
});

module.exports = sequelize;
