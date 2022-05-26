import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import clientUtils from '../utils/client.utils.js';
import databaseUtils from '../utils/database.utils.js'
import otherUtils from '../utils/other.utils.js';
const {isUndefined} = otherUtils;
const {returnQuery} = databaseUtils;
const {addClient} = clientUtils;


const clientService = {
    register: async (body) => {
        const { fcmToken } = body;
        if (isUndefined([fcmToken])) return {errorMsg: 'Invalid requst body'};
        const id = uuidv4();
        const client = { id };
        await addClient(id, fcmToken);
        return jwt.sign(client, process.env.ACCESS_TOKEN_SECRET);
    },

    getClients: async () => {
        const q = 'select * from clients';
        const r = await returnQuery(q, []);
        const { errorMsg, result } = r;
        if (errorMsg) return {errorMsg};
        const clients = result;
        return { clients };
    },

    updateClientRegion: async (jwtBody, body) => {
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
    },

    deleteClient: async (body) => {
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

};

export default clientService;