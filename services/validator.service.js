const ApiEror = require('../exceptions/api.error.js');
const { isUndefined } = require('../utils/other.utils.js');
const jwt = require('jsonwebtoken');

class ValidatorService {
    login (body) {
        const { fcmToken } = body;
        if (isUndefined([fcmToken]) || Object.keys(body).length !== 1) throw ApiEror.BadRequestError('Invalid request body');
        return fcmToken;
    }

    updateClientRegion (jwtBody, body) {
        const { id } = jwtBody;
        const { region } = body;
        if (isUndefined([region]) || Object.keys(body).length !== 1) throw ApiEror.BadRequestError('Invalid request body');
        return [region, id];
    }
}

module.exports = new ValidatorService();