const jwt = require('jsonwebtoken');
const ApiEror = require('../exceptions/api.error.js');

const verifyJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) throw ApiEror.UnathorizedError();
    jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, client) => {
        if (err) throw new ApiEror(403, 'Invalid token');
        req.client = client;
        next();
    });
}

const verifyRefreshJWT = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) throw ApiEror.UnathorizedError();
    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (err, client) => {
        if (err) throw new ApiEror(403, 'Invalid token');
        req.client = {id: client.id, token};
        next();
    });
}

module.exports = { verifyJWT, verifyRefreshJWT };