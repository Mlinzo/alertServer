const fetch = require('node-fetch');
const notificationService = require('./notification.service.js');
const databaseService = require('./database.service.js');
const { formatDate } = require('../utils/other.utils.js');
const alertService = require('./alert.service.js');

const ALERT_API_URL = "https://alarmmap.online/api/history"

class AlertAPIService {
    async getAlertRegions () {
        const date = new Date();
        const formatedDate = formatDate(date);
        const data = {
            date: formatedDate
        }

        const responce = await fetch(ALERT_API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const responceData = await responce.json();
        const currentAlertRegions = responceData
            .filter( (alert) => alert.end === null )
            .map((alert) => alert.district);

        return currentAlertRegions;
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