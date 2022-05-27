const pg = require('pg');
const format = require('pg-format');

const returnQuery = async (query, values) => {
    const client = new pg.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    try {
        await client.connect();
        const resultObj = await client.query(query, values);
        const result = resultObj.rows;
        return { result };
    }
    catch (e) { console.log('database error: ', e); return {errorMsg: 'database error: '+e}}
    finally { await client.end() };
}
 
const f_returnQuery = async (query, values) => {
    const client = new pg.Client({
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false }
    });
    try {
        await client.connect();
        const resultObj = await client.query(format(query, values, [], (err, _) => console.log(err)));
        const result = resultObj.rows;
        return { result };
    }
    catch (e) { console.log('database error: ', e); return {errorMsg: 'database error: '+e}}
    finally { await client.end() };
}

module.exports = { returnQuery, f_returnQuery};