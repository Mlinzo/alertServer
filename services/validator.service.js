const ApiEror = require('../exceptions/api.error.js');
const { isUndefined } = require('../utils/other.utils.js');
const jwt = require('jsonwebtoken');

class ValidatorService {
    addAlert (body) {
        const { dangerLevel, title } = body;
        const values = [dangerLevel, title];
        if (isUndefined(values) || Object.keys(body).length !== 2 ) throw ApiEror.BadRequestError('Invalid request body');
        return values;
    }

    deleteAlert (body) {
        const { id } = body;
        const values = [id];
        
        console.log(values)

        if (isUndefined(values) || Object.keys(body).length !== 1) throw ApiEror.BadRequestError('Invalid request body');
        const i = parseInt(id);
        if (isNaN(i) || i < 0) throw ApiEror.BadRequestError('Invalid id field');
        return values;
    }

    updateAlert (body) {
        const { id, dangerLevel } = body;
        const values = [dangerLevel, id];
        if (isUndefined(values) || Object.keys(body).length !== 2) throw ApiEror.BadRequestError('Invalid request body');
        const i = parseInt(id);
        if (isNaN(i) || i < 0) throw ApiEror.BadRequestError('Invalid id field');
        return values;
    }

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

    deleteClient (body) {
        const { id } = body;
        const values = [id];
        if (isUndefined(values) || Object.keys(body).length !== 1) throw ApiEror.BadRequestError('Invalid request body');
        return values;
    }

    insertSanctuary (body) {
        const { destination, number, address } = body;
        const values = [destination, number, address];
        if (isUndefined(values) || Object.keys(body).length !== 3) throw ApiEror.BadRequestError('Invalid request body');
        const dest = parseInt(destination);
        const num = parseInt(number);
        if (isNaN(dest) || dest <0) throw ApiEror.BadRequestError('Invalid destination field'); 
        if (isNaN(num) || num < 0) throw ApiEror.BadRequestError('Invalid number field');
        return [dest, num, address];
    }

    deleteSanctuary (body) {
        const { id } = body;
        const values = [id];
        if (isUndefined(values) || Object.keys(body).length !== 1) throw ApiEror.BadRequestError('Invalid request body');
        const i = parseInt(id);
        if (isNaN(i) || i < 0) throw ApiEror.BadRequestError('Invalid id field');
        return values;
    }
}

module.exports = new ValidatorService();