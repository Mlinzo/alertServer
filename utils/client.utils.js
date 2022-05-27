const {returnQuery} = require('./database.utils.js');

const addClient = async (id, fcmToken) => {
    const values = [id, fcmToken];
    const q = 'insert into clients (c_id, fcm_token) values ($1, $2)';
    await returnQuery(q, values);
}

module.exports = { addClient };