const { translateAlerts } = require('../utils/other.utils.js');
const databaseService = require('./database.service.js');
const validatorService = require('./validator.service.js');

class AlertService {
    async getAlerts(){
        const alerts = await databaseService.selectAllAlerts();
        const alertLocations = translateAlerts(alerts);
        return alertLocations;
    }

    async addAlert(body){
        const [dangerLevel, title] = validatorService.addtAlert(body);
        const alert = await databaseService.insertAlert([dangerLevel, title]);
        const alertLocation = translateAlerts(alert)[0];
        return alertLocation;
    }

    async deleteAlert(body){
        const [id] = validatorService.deleteAlert(body);
        const alert = await databaseService.deleteAlert([id]);
        const alertLocation = translateAlerts(alert)[0];
        return alertLocation;
    }

    async updateAlert(body){
        const [dangerLevel, id] = validatorService.updateAlert(body);
        const alert = await databaseService.updateAlert([dangerLevel, id]);
        const alertLocation = translateAlerts(alert)[0];
        return alertLocation;
    }
};

module.exports = new AlertService();