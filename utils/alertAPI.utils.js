const findCanceled = (currentAlerts, lastAlerts) => {
    const alertsArr = Object.entries(currentAlerts);
    const toDelete = alertsArr
        .filter(([_, value]) => value === null)
        .map(([key, _]) => key)
        .filter((nullAlertRegion) => lastAlerts.includes(nullAlertRegion) );
    return toDelete;
}

const findAdded = (currentAlerts, lastAlerts) => {
    const alertsArray = Object.entries(currentAlerts);
    const toInsert = alertsArray
        .filter(([_, value]) => value === 'full')
        .map(([key, _]) => key)
        .filter((nullAlertRegion) => !lastAlerts.includes(nullAlertRegion) );
    return toInsert;
}

module.exports = {findCanceled, findAdded};