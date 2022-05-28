const jwt = require('jsonwebtoken');

const authenticateClient = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null) return res.status(401).json({errorMsg: 'Authentication is needed'});
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, client) => {
        if (err) return res.status(403).json({errorMsg: 'Invalid token'});
        req.client = client;
        next();
    });
};

module.exports = { authenticateClient };