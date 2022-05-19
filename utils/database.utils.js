import pg from 'pg';

const databaseUtils = {
    returnQuery: async (query, values) => {
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
    },

    noReturnQuery: async (query, values) => {
        const client = new pg.Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
        try {
            await client.connect();
            await client.query(query, values);
            return { };
        }
        catch (e) { console.log('database error: ', e); return {errorMsg: 'database error: '+e}}
        finally { await client.end() };
    }
};

export default databaseUtils;