const fetch = require('node-fetch');
const notificationService = require('./notification.service.js');
const databaseService = require('./database.service.js');

const ALERT_API_URL = "http://sirens.in.ua/api/v1/"

class AlertAPIService {
    async getAlertRegions () {
        const responce = await fetch(ALERT_API_URL);
        const data = await responce.json();
        const regions = Object.entries(data)
            .filter(([key, value]) => value === 'full')
            .map(([key, value]) => key);
        return regions;
    }

    async sendNotifications (canceledFcmTokens, addedFcmTokens) {
        await notificationService.airAlert(addedFcmTokens);
        await notificationService.cancelAirAlert(canceledFcmTokens);
    }

    async getFcmTokensForRegions (canceled, added) {
        const canceledFcmTokens = await databaseService.selectFcmForRegions(canceled);
        const addedFcmTokens = await databaseService.selectFcmForRegions(added);
        return [canceledFcmTokens, addedFcmTokens];
    }

    async updateAlertsByRegions (canceled, added) {
        await databaseService.deleteAlertsByRegions(canceled);
        await databaseService.insertAlertsByRegions(added);
    }
};

module.exports = new AlertAPIService();