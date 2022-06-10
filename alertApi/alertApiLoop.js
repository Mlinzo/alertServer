const alertAPIService = require("../services/alertAPI.service.js");
const { arrDiff } = require('../utils/other.utils.js');
const databaseService = require('../services/database.service.js');

const alertAPILoop = async (interval_ms, callback) => {
    callback();
    
    const dbAlerts = await databaseService.selectAllAlerts();
    let lastAlertRegions = dbAlerts.map((alert) => alert.a_title)
    let stringLastAlertRegions = JSON.stringify(lastAlertRegions);
    
    setInterval( async () => {
        let currentAlertRegions = await alertAPIService.getAlertRegions()

        if (stringLastAlertRegions === JSON.stringify(currentAlertRegions)) return;

        const canceled = arrDiff(lastAlertRegions, currentAlertRegions);
        const added = arrDiff(currentAlertRegions, lastAlertRegions);
        
        if (canceled.length != 0) console.log(`Canceled alerts: ${canceled}`)
        if (added.length != 0) console.log(`Added alerts: ${added}`)
        
        const [canceledFcmTokens, addedFcmTokens] = await alertAPIService.getFcmTokensForRegions(canceled, added);
        await alertAPIService.sendNotifications(canceledFcmTokens, addedFcmTokens);
        
        await alertAPIService.updateAlertsByRegions(canceled, added);

        lastAlertRegions = [...currentAlertRegions];
        stringLastAlertRegions = JSON.stringify(lastAlertRegions);
    }, interval_ms);
};

module.exports = alertAPILoop;