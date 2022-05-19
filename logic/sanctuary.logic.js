import databaseUtils from '../utils/database.utils.js'
import otherUtils from '../utils/other.utils.js';
const { returnQuery, noReturnQuery} = databaseUtils;
const { isUndefined, translateGetSanctuaries } = otherUtils;

const sanctuaryLogic = {
    getSanctuaries: async () => {
        const q = 'select * from s_locations';
        const r = await returnQuery(q, []);
        const { errorMsg, result } = r;
        if (errorMsg) return {errorMsg};
        const sanctuaries = translateGetSanctuaries(result);
        return { sanctuaries };
    },

    insertSanctuary: async (body) => {
        const { destination, number, address } = body;
        const values = [destination, number, address];
        if (isUndefined(values)) return {errorMsg: 'Invalid request body'};
        const dest = parseInt(destination);
        const num = parseInt(number);
        if (isNaN(dest) || dest <0) return {errorMsg: 'Invalid destination'}; 
        if (isNaN(num) || num < 0) return {errorMsg: 'Invalid number'};
        const goodValues = [dest, num, address];
        const q = 'insert into s_locations (s_destination, s_number, s_address) values ($1, $2, $3) returning s_id';
        const r = await returnQuery(q, goodValues);
        const { errorMsg, result } = r;
        if (errorMsg) return {errorMsg};
        const id = result[0].s_id;
        return { id };
    },

    deleteSanctuary: async (body) => {
        const { id } = body;
        const values = [id];
        if (isUndefined(values)) return {errorMsg: 'Invalid request body'};
        const i = parseInt(id);
        if (isNaN(i) || i < 0) return {errorMsg: 'Invalid index'};
        const q = 'delete from s_locations where s_id = $1';
        const r = await noReturnQuery(q, values);
        const { errorMsg } = r;
        if (errorMsg) return {errorMsg};
        return {  };
    }
};

export default sanctuaryLogic;