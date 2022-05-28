const jwt = require('jsonwebtoken');
const databaseService = require('./database.service.js');

class TokenService {
    generateTokens (payload) {
        const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '3h'});
        const refreshToken = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET, {expiresIn: '30d'});
        return {accessToken, refreshToken};
    }

    validateAccessToken (token) {
        try{
            return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        } catch (e) { return null }
    }

     validateRefreshToken (token) {
        try{
            const client = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
            return client;
        } catch (e) { return null }
    }

    async saveToken (id, token) {
        const inDb = await databaseService.findTokenById([id]);
        if (inDb) return await databaseService.updateToken([token, id]);
        await databaseService.insertToken([id, token]);
    }

    async findToken (token) {
        const inDb = await databaseService.findToken([token]);
        return inDb;
    }

}

module.exports = new TokenService();