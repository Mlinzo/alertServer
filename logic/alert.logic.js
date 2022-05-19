import databaseUtils from '../utils/database.utils.js';
import otherUtils from '../utils/other.utils.js';
const { returnQuery, noReturnQuery } = databaseUtils;
const { isUndefined, translateGetAlerts } = otherUtils;

const alertLogic = {
    getAlerts: async () => {
        const q = 'select * from a_locations';
        const r = await returnQuery(q, []);
        const { errorMsg, result } = r;
        if (errorMsg) return {errorMsg};
        const alertLocations = translateGetAlerts(result);
        return { alertLocations };
    },

    insertAlert: async (body) => {
        const { dangerLevel, title, dateFrom, dateTo } = body;
        const values = [dangerLevel, title, dateFrom, dateTo];
        if (isUndefined(values)) return {errorMsg: 'Invalid request body'};
        const q = 'insert into a_locations (a_danger_level, a_title, a_datefrom, a_dateto) values ($1, $2, $3::timestamp, $4::timestamp) returning a_id';
        const r = await returnQuery(q, values);
        const { errorMsg, result } = r;
        if (errorMsg) return {errorMsg};
        const id = result[0].a_id;
        return { id };
    },

    deleteAlert: async (body) => {
        const { id } = body;
        const values = [id];
        if (isUndefined(values)) return {errorMsg: 'Invalid request body'};
        const i = parseInt(id);
        if (isNaN(i) || i < 0) return {errorMsg: 'Invalid index'};
        const q = 'delete from a_locations where a_id = $1';
        const r = await noReturnQuery(q, values);
        const { errorMsg } = r;
        if (errorMsg) return {errorMsg};
        return { };
    }
};

export default alertLogic;