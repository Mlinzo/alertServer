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

const generateID = () => v4();

module.exports = {
    formatDate,
    arrDiff,
    generateID,
    isUndefined
}