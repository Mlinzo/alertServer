const alertAPIService = require("../services/alertAPI.service.js");
const { f_returnQuery } = require("../utils/database.utils.js");

const getCurrentAlerts = async () => {
    const q = 'select a_title from a_locations'
    const { result } = await f_returnQuery(q, []);
    const regions = result.map(({a_title}) => a_title);
    return regions;
};

const findToDelete = (alerts, dbRegions) => {
    const alertsArr = Object.entries(alerts);
    const toDelete = alertsArr
        .filter(([_, value]) => value === null)
        .map(([key, _]) => key)
        .filter((nullAlertRegion) => dbRegions.includes(nullAlertRegion) );
    return toDelete;
};

const findToInsert = (alerts, dbRegions) => {
    const alertsArray = Object.entries(alerts);
    const toInsert = alertsArray
        .filter(([_, value]) => value === 'full')
        .map(([key, _]) => key)
        .filter((nullAlertRegion) => !dbRegions.includes(nullAlertRegion) );
    return toInsert;
};

const deleteRegions = async (values) => {
    if (values.length == 0) return;
    const strAlerts = values.map((region) => `'${region}'`).toString();
    const q = 'delete from a_locations where a_title in ('+ strAlerts +')';
    await f_returnQuery(q, values);
};

const insertRegions = async (fullAlerts) => {
    if (fullAlerts.length == 0) return;
    const values = fullAlerts.map((el) => ['HIGH', el]);
    const q = 'insert into a_locations (a_danger_level, a_title) values %L';
    await f_returnQuery(q, values);
}

const alertAPILoop = async (interval_ms, callback) => {
    let lastAlerts = await reqAlerts(); 
    let stringLastAlerts = JSON.stringify(lastAlerts);
    callback();
    setInterval( async () => {
        const alerts = await reqAlerts()
        if (stringLastAlerts === JSON.stringify(alerts)) return;
        console.log('Alerts updated!');
        lastAlerts = {...alerts};
        stringLastAlerts = JSON.stringify(lastAlerts);
        const dbRegions = await alertAPIService.getCurrentAlerts();
        const toDelete = findToDelete(alerts, dbRegions);
        const toInsert = findToInsert(alerts, dbRegions);
        await deleteRegions(toDelete);
        await insertRegions(toInsert);
    }, interval_ms);
};

module.exports = alertAPILoop;