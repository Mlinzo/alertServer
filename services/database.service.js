const {returnQuery} = require('../utils/database.utils.js');
const { f_returnQuery } = require("../utils/database.utils.js");
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

    async insertToken (values) {
        const q = 'insert into r_tokens (c_id, r_token) values ($1, $2)';
        await returnQuery(q, values);
    }
    
    async findTokenById (values) {
        const q = 'select r_token from r_tokens where c_id = $1';
        const result = await returnQuery(q, values);
        if (result.length == 0) return null;
        return result[0].r_token;
    }

    async updateToken (values) {
        values.push(new Date().toISOString());
        const q = 'update r_tokens set r_token = $1, last_refresh = $3 where c_id = $2';
        await returnQuery(q, values);
    }

    async findToken (values) {
        const q = 'select r_token from r_tokens where r_token = $1';
        const result = await returnQuery(q, values);
        if (result.length == 0) return null;
        return result[0];
    }

    async selectFcmByRegion (values) {
        const q = 'select fcm_token from clients where region = $1';
        const result = await returnQuery(q, values);
        if (result.length == 0) return null;
        return result;
    }

    async deleteAlertsByRegions (regions) {
        if (regions.length == 0) return;
        const q = 'delete from a_locations where a_title = any ($1)';
        await returnQuery(q, [regions]);
    }
    
    async insertAlertsByRegions (fullAlerts) {
        if (fullAlerts.length == 0) return;
        const regions = fullAlerts.map((region) => ['HIGH', region]);
        const q = 'insert into a_locations (a_danger_level, a_title) values %L';
        await f_returnQuery(q, regions);
    }

    async selectFcmForRegions (regions) {
        const q = 'select fcm_token from clients where region = any ($1)';
        const result = await returnQuery(q, [regions]);
        return result.map((record) => record.fcm_token)
    }
}

module.exports = new DatabaseService();