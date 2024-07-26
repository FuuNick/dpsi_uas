const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    const token = req.headers['authorization'];
    if (token) {
        jwt.verify(token, 'secret', (err, decoded) => {
            if (err) {
                return res.status(401).json({ error: 'Unauthorized' });
            } else {
                req.user = decoded;
                next();
            }
        });
    } else {
        return res.status(401).json({ error: 'Unauthorized' });
    }
};
