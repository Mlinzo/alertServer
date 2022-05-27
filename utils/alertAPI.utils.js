const fetch = require('node-fetch');

const ALERT_API_URL = "http://sirens.in.ua/api/v1/";
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
};

const reqAlerts = async () => {
    const responce = await fetch(ALERT_API_URL);
    const data = await responce.json();
    return data;
};

const changeAlert = (key, value) => {
    mockAlertData[key]= value;
};

module.exports = {reqAlerts, changeAlert};