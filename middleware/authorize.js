// middleware/authorize.js
const jwt = require('jsonwebtoken');

function authorize(roles = []) {
    if (typeof roles === 'string') {
        roles = [roles];
    }

    return (req, res, next) => {
        const token = req.headers.authorization?.split(' ')[1];
        if (!token) {
            return res.status(401).json({ message: 'Token tidak tersedia' });
        }
        jwt.verify(token, 'your_jwt_secret', (err, user) => {
            if (err) {
                return res.status(403).json({ message: 'Token tidak valid' });
            }
            if (roles.length && !roles.includes(user.role)) {
                return res.status(401).json({ message: 'Tidak diizinkan' });
            }
            req.user = user;
            next();
        });
    };
}

module.exports = authorize;
