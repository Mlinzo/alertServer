const {generateID} = require('../utils/other.utils.js')
const tokenService = require('./token.service.js')
const databaseService = require('./database.service.js');
const validatorService = require('./validator.service.js');
const ApiEror = require('../exceptions/api.error.js');

class ClientService {
    async login (body) {
        const fcmToken = validatorService.login(body);
        const id = generateID();
        const clientInfo = await databaseService.insertClient([id, fcmToken]);
        const client = { id };
        const tokens = tokenService.generateTokens(client);
        await tokenService.saveToken(id, tokens.refreshToken);
        return {clientInfo, tokens};
    }

    async updateClientRegion (jwtBody, body) {
        const [region, id] = validatorService.updateClientRegion(jwtBody, body);
        const client = await databaseService.updateClientRegion([region, id]);
        return client;
    }

    async refresh (jwtBody) {
        const {id, token} = jwtBody;
        const tokenFromDb = await databaseService.findToken([token]);
        if (!tokenFromDb) throw ApiEror.UnathorizedError();
        const tokens = tokenService.generateTokens({id});
        await tokenService.saveToken(id, tokens.refreshToken);
        return tokens;
    }
}

module.exports = new ClientService();