import jwt from 'jsonwebtoken';
import { v4 as uuidv4 } from 'uuid';
import clientUtils from '../utils/client.utils.js';
import databaseUtils from '../utils/database.utils.js'
const {returnQuery} = databaseUtils;
const {addClient} = clientUtils;


const clientService = {
    register: async () => {
        const id = uuidv4();
        const client = { id };
        await addClient(id);
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
        if (!region) return {errorMsg: 'Invalid requst body'};
        const values = [region, id];
        const q = 'update clients set region = $1 where c_id = $2 returning region';
        const r = await returnQuery(q, values);
        const { errorMsg, result } = r;
        if (errorMsg) return {errorMsg};
        const client = result[0];
        return { client };
    }

};

export default clientService;