const {generateID} = require('../utils/other.utils.js')
const tokenService = require('./token.service.js')
const databaseService = require('./database.service.js');
const validatorService = require('./validator.service.js');

class ClientService {
    async login (body) {
        const fcmToken = validatorService.login(body);
        const id = generateID();
        const clientInfo = await databaseService.insertClient([id, fcmToken]);
        const client = { id };
        const jwt_accesToken = tokenService.generateAccesToken(client);
        return {clientInfo, jwt_accesToken};
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

    async online (jwtBody) {
        const { id } = jwtBody;
        const now = new Date().toISOString();
        const client = await databaseService.updateClientLastSeen([now, id]);
        return client;
    }

};

module.exports = new ClientService();