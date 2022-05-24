import databaseUtils from '../utils/database.utils.js';
import otherUtils from '../utils/other.utils.js';
const { returnQuery } = databaseUtils;
const { isUndefined, translateAlerts } = otherUtils;

const alertService = {
    getAlerts: async () => {
        const q = 'select * from a_locations';
        const r = await returnQuery(q, []);
        const { errorMsg, result } = r;
        if (errorMsg) return {errorMsg};
        const alertLocations = translateAlerts(result);
        return { alertLocations };
    },

    insertAlert: async (body) => {
        const { dangerLevel, title } = body;
        const values = [dangerLevel, title];
        if (isUndefined(values)) return {errorMsg: 'Invalid request body'};
        const q = 'insert into a_locations (a_danger_level, a_title) values ($1, $2) returning *';
        const r = await returnQuery(q, values);
        const { errorMsg, result } = r;
        if (errorMsg) return {errorMsg};
        const alertLocation = translateAlerts(result)[0];
        return { alertLocation };
    },

    deleteAlert: async (body) => {
        const { id } = body;
        const values = [id];
        if (isUndefined(values)) return {errorMsg: 'Invalid request body'};
        const i = parseInt(id);
        if (isNaN(i) || i < 0) return {errorMsg: 'Invalid index'};
        const q = 'delete from a_locations where a_id = $1 returning *';
        const r = await returnQuery(q, values);
        const { errorMsg, result } = r;
        if (errorMsg) return {errorMsg};
        if (result.length == 0) return {errorMsg: 'No such element'}
        const alertLocation = translateAlerts(result)[0];
        return { alertLocation };
    },

    updateAlert: async (body) => {
        const { id, dangerLevel } = body;
        const values = [dangerLevel, id];
        if (isUndefined(values)) return {errorMsg: 'Invalid request body'};
        const i = parseInt(id);
        if (isNaN(i) || i < 0) return {errorMsg: 'Invalid index'};
        const q = 'update a_locations set a_danger_level = $1 where a_id = $2 returning *';
        const r = await returnQuery(q, values);
        const { errorMsg, result } = r;
        if (errorMsg) return {errorMsg};
        if (result.length == 0) return {errorMsg: 'No such element'}
        const alertLocation = translateAlerts(result)[0];
        return { alertLocation };
    }
};

export default alertService;