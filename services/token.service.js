const jwt = require('jsonwebtoken');

class TokenService {
    generateAccesToken (payload) {
        return jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '1h'});
    }
}

module.exports = new TokenService();