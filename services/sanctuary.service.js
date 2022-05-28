const { translateSanctuaries } = require('../utils/other.utils.js');
const databaseService = require('./database.service.js');
const validatorService = require('./validator.service.js');

class SanctuaryService {
    async getSanctuaries () {
        const dbSanctuaries = await databaseService.selectAllSanctuaries();
        const sanctuaries = translateSanctuaries(dbSanctuaries);
        return sanctuaries;
    }

    async insertSanctuary (body) {
        const [destination, number, address] = validatorService.insertSanctuary(body);
        const dbSanctuary = await databaseService.insertSanctuary([destination, number, address]);
        const sanctuaryLocation = translateSanctuaries(dbSanctuary)[0];
        return sanctuaryLocation;
    }

    async deleteSanctuary (body) {
        const [id] = validatorService.deleteSanctuary(body);
        const dbSanctuary = await databaseService.deleteSanctuary([id]);
        const sanctuaryLocation = translateSanctuaries(dbSanctuary)[0];
        return sanctuaryLocation;
    }
    
};

module.exports = new SanctuaryService();