const jwt =  require('jsonwebtoken');
const { v4 } = require('uuid');
const {isUndefined} = require('../utils/other.utils.js');
const {returnQuery} = require('../utils/database.utils.js');
const {addClient} = require('../utils/client.utils.js');


class ClientService {
    async register (body) {
        const { fcmToken } = body;
        if (isUndefined([fcmToken])) return {errorMsg: 'Invalid requst body'};
        const id = v4();
        const client = { id };
        await addClient(id, fcmToken);
        return jwt.sign(client, process.env.ACCESS_TOKEN_SECRET);
    }

    async getClients () {
        const q = 'select * from clients';
        const r = await returnQuery(q, []);
        const { errorMsg, result } = r;
        if (errorMsg) return {errorMsg};
        const clients = result;
        return { clients };
    }

    async updateClientRegion (jwtBody, body) {
        const { id } = jwtBody;
        const { region } = body;
        if (isUndefined([region])) return {errorMsg: 'Invalid requst body'};
        const values = [region, id];
        const q = 'update clients set region = $1 where c_id = $2 returning *';
        const r = await returnQuery(q, values);
        const { errorMsg, result } = r;
        if (errorMsg) return {errorMsg};
        const client = result[0];
        return { client };
    }

    async deleteClient (body) {
        const { id } = body;
        const values = [id];
        if (isUndefined(values)) return {errorMsg: 'Invalid request body'};
        const q = 'delete from clients where c_id = $1 returning *';
        const r = await returnQuery(q, values);
        const { errorMsg, result } = r;
        if (errorMsg) return {errorMsg};
        if (result.length == 0) return {errorMsg: 'No such element'}
        const client = result[0];
        return { client };
    }

    async online (jwtBody) {
        const { id } = jwtBody;
        const now = new Date();
        const nowIso = now.toISOString();
        const values = [nowIso, id];
        const q = 'update clients set last_seen = $1 where c_id = $2 returning *';
        const r = await returnQuery(q, values);
        const { errorMsg, result } = r;
        if (errorMsg) return {errorMsg};
        const client = result[0];
        return { client };
    }

};

module.exports = new ClientService();