const fetch = require('node-fetch');
const notificationService = require('./notification.service.js');
const databaseService = require('./database.service.js');

const ALERT_API_URL = "http://sirens.in.ua/api/v1/"
const mockAlertData = {
    Mykolayiv: null,
    Chernihiv: null,
    Rivne: null,
    Chernivtsi: null,
    "Ivano-Frankivs'k": null,
    "Khmel'nyts'kyy": null,
    "L'viv": null,
    "Ternopil'": null,
    Transcarpathia: null,
    Volyn: null,
    Cherkasy: null,
    Kirovohrad: null,
    Kyiv: null,
    Odessa: null,
    Vinnytsya: null,
    Zhytomyr: null,
    Sumy: null,
    "Dnipropetrovs'k": null,
    "Donets'k": null,
    Kharkiv: 'full',
    Poltava: null,
    Zaporizhzhya: null,
    'Kyiv City': null,
    Kherson: null,
    "Luhans'k": 'full',
    Sevastopol: 'no_data',
    Crimea: 'no_data'
} 

class AlertAPIService {
    async reqAlerts () {
        const responce = await fetch(ALERT_API_URL);
        const data = await responce.json();
        return data;
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

    changeAlert (key, value)  {
        mockAlertData[key]= value;
    }
};

module.exports = new AlertAPIService();