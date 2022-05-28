const {returnQuery} = require('../utils/database.utils.js');
const ApiEror = require('../exceptions/api.error.js');

class DatabaseService {

    async selectAllAlerts () {
        const q = 'select * from a_locations';
        const result = await returnQuery(q, []);
        return result;
    }

    async insertAlert (values) {
        const q = 'insert into a_locations (a_danger_level, a_title) values ($1, $2) returning *';
        const result = await returnQuery(q, values);
        return result; 
    }

    async deleteAlert (values) {
        const q = 'delete from a_locations where a_id = $1 returning *';
        const result = await returnQuery(q, values);
        if (result.length == 0) throw ApiEror.BadRequestError('No such alert location');
        return result;
    }

    async updateAlert (values) {
        const q = 'update a_locations set a_danger_level = $1 where a_id = $2 returning *';
        const result = await returnQuery(q, values);
        if (result.length == 0) throw ApiEror.BadRequestError('No such alert location');
        return result;
    }

    async insertClient (values) {
        const q = 'insert into clients (c_id, fcm_token) values ($1, $2) returning *';
        const result = await returnQuery(q, values);
        return result[0];
    }

    async selectAllClients () {
        const q = 'select * from clients';
        const result = await returnQuery(q, []);
        return result;
    }

    async updateClientRegion (values) {
        const q = 'update clients set region = $1 where c_id = $2 returning *';
        const result = await returnQuery(q, values);
        if (result.length == 0) throw ApiEror.BadRequestError('No such client');
        return result[0];
    }

    async deleteClient (values) {
        const q = 'delete from clients where c_id = $1 returning *';
        const result = await returnQuery(q, values);
        if (result.length == 0) throw ApiEror.BadRequestError('No such client');
        return result[0];
    }

    async updateClientLastSeen (values) {
        const q = 'update clients set last_seen = $1 where c_id = $2 returning *';
        const result = await returnQuery(q, values);
        if (result.length == 0) throw ApiEror.BadRequestError('No such client');
        return result[0];
    }

    async selectAllSanctuaries () {
        const q = 'select * from s_locations';
        const result = await returnQuery(q, []);
        return result;
    }

    async insertSanctuary (values) {
        const q = 'insert into s_locations (s_destination, s_number, s_address) values ($1, $2, $3) returning *';
        const result = await returnQuery(q, values);
        return result;
    }

    async deleteSanctuary (values) {
        const q = 'delete from s_locations where s_id = $1 returning *';
        const result = await returnQuery(q, values);
        if (result.length == 0) throw ApiEror.BadRequestError('No such sanctuary');
        return result;
    }

}

module.exports = new DatabaseService();