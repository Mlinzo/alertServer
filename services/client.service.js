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

    async getClients () {
        const clients = await databaseService.selectAllClients();
        return clients;
    }

    async updateClientRegion (jwtBody, body) {
        const [region, id] = validatorService.updateClientRegion(jwtBody, body);
        const client = await databaseService.updateClientRegion([region, id]);
        return client;
    }

    async deleteClient (body) {
        const [id] = validatorService.deleteClient(body);
        const client = await databaseService.deleteClient([id]);
        return client;
    }

    async refresh (body) {
        const {token} = body;
        if(!token) throw ApiEror.UnathorizedError();
        const tokenData = tokenService.validateRefreshToken(token);
        const tokenFromDb = await databaseService.findToken([token]);
        if (!tokenData || !tokenFromDb) throw ApiEror.UnathorizedError();
        const tokens = tokenService.generateTokens({id: tokenData.id});
        await tokenService.saveToken(tokenData.id, tokens.refreshToken);
        return tokens;
    }
}

module.exports = new ClientService();