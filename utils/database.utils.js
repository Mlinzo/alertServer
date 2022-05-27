import pg from 'pg';
import format from 'pg-format';

const databaseUtils = {
    returnQuery: async (query, values) => {
        const client = new pg.Client({
            connectionString: process.env.DATABASE_URL,
            ssl: { rejectUnauthorized: false }
        });
        try {
            await client.connect();
            const resultObj = await client.query(format(query, values, [], (err, res) => console.log(err)));
            const result = resultObj.rows;
            return { result };
        }
        catch (e) { console.log('database error: ', e); return {errorMsg: 'database error: '+e}}
        finally { await client.end() };
    }
};

export default databaseUtils;