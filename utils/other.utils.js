const { v4 } = require('uuid');

const formatDate = (date) => {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2) month = '0' + month;

    return [year, month, day].join('-');
}

const arrDiff = (arr1, arr2) => {
    return arr1.filter((el1) => !arr2.includes(el1));
}

const isUndefined = (arr) => {
    return arr.includes(undefined);
}

const translateAlerts = (arr) => {
    const newArr = [];
    for (const el of arr) {
        const {a_id, a_danger_level, a_title, a_datefrom, a_dateto} = el;
        newArr.push({
            id: a_id,
            dangerLevel: a_danger_level,
            title: a_title,
            dateFrom: a_datefrom
        });
    };
    return newArr;
}
    
 const translateSanctuaries = (arr) => {
    const newArr = [];
    for (const el of arr) {
        const {s_id, s_destination, s_number, s_address} = el;
        newArr.push({
            id: s_id,
            destination: s_destination,
            number: s_number,
            address: s_address
        });
    };
    return newArr;
}

const generateID = () => v4();

module.exports = {
    formatDate,
    arrDiff,
    generateID,
    isUndefined,
    translateAlerts,
    translateSanctuaries
}