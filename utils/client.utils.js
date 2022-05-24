import databaseUtils from './database.utils.js'
const {returnQuery} = databaseUtils;

const clientUtils = {
    addClient: async (id) => {
        const values = [id];
        const q = 'insert into clients (c_id) values ($1)';
        await returnQuery(q, values);
    }
};

export default clientUtils;