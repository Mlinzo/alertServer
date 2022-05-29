const alertAPIService = require("../services/alertAPI.service.js");
const {findCanceled, findAdded} = require('../utils/alertAPI.utils.js');

const alertAPILoop = async (interval_ms, callback) => {
    let lastAlerts = await reqAlerts(); 
    let stringLastAlerts = JSON.stringify(lastAlerts);
    callback();
    setInterval( async () => {
        const currentAlerts = await alertAPIService.reqAlerts()
        if (stringLastAlerts === JSON.stringify(currentAlerts)) return;
        lastAlerts = {...currentAlerts};
        stringLastAlerts = JSON.stringify(lastAlerts);

        const canceled = findCanceled(currentAlerts, lastAlerts);
        const added = findAdded(currentAlerts, lastAlerts);
        
        const [canceledFcmTokens, addedFcmTokens] = alertAPIService.getFcmTokensForRegions(canceled, added);

        await alertAPIService.sendNotifications(canceledFcmTokens, addedFcmTokens);
        
        await alertAPIService.updateAlertsByRegions(canceled, added);
    }, interval_ms);
};

module.exports = alertAPILoop;