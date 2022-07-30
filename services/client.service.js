const {generateID} = require('../utils/other.utils.js')
const tokenService = require('./token.service.js')
const databaseService = require('./database.service.js');
const validatorService = require('./validator.service.js');
const ApiEror = require('../exceptions/api.error.js');
const alertAPIService = require('./alertAPI.service.js');
const notificationService = require('./notification.service.js');

class ClientService {
    async login (body) {
        const fcmToken = validatorService.login(body);
        const id = generateID();
        const clientInDb = await databaseService.selectClientByFcmToken(fcmToken);
        if (clientInDb) {
            const client = { id: clientInDb.c_id };
            const tokens = tokenService.generateTokens(client);
            await tokenService.saveToken(clientInDb.c_id, tokens.refreshToken);
            return {clientInDb, tokens};
        } else {
            const clientInfo = await databaseService.insertClient([id, fcmToken]);
            const client = { id };
            const tokens = tokenService.generateTokens(client);
            await tokenService.saveToken(id, tokens.refreshToken);
            return {clientInfo, tokens};
        }
    }

    async getClients () {
        const clients = await databaseService.selectAllClients();
        return clients;
    }

    async updateClientRegion (jwtBody, body) {
        const [region, id] = validatorService.updateClientRegion(jwtBody, body);
        const client = await databaseService.updateClientRegion([region, id]);
        const alertRegions = await alertAPIService.getAlertRegions();
        if (alertRegions.includes(client.region)) await notificationService.airAlert([client.fcm_token])
        return client;
    }

    async deleteClient (body) {
        const [id] = validatorService.deleteClient(body);
        const client = await databaseService.deleteClient([id]);
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