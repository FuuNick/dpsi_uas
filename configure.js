require('dotenv').config();

module.exports = {
    secret: process.env.JWT_SECRET || 'default_jwt_secret_key',
    db: {
        database: process.env.DB_NAME || 'sql12722297',
        username: process.env.DB_USER || 'sql12722297',
        password: process.env.DB_PASSWORD || 'iVaMHLEdwE',
        host: process.env.DB_HOST || 'sql12.freesqldatabase.com',
        port: process.env.DB_PORT || '3306',
        dialect: process.env.DB_DIALECT || 'mysql'
    }
};