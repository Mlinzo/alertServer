const admin = require('firebase-admin');
const serviceAccount = require('../firebase-admin-sdk.json')

class NotificationService {
    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }

    async airAlert (fcmTokens) {
        if (fcmTokens.length == 0) return;
        const messages = [];     
        fcmTokens.map((fcmToken) => {
            const message = {
                notification: {title: 'Air alert!', body: 'It is air alert in your region! Please take cover!'},
                token: fcmToken
            }
            messages.push(message);
        });
        admin.messaging().sendAll(messages).catch((err) => console.log(err));
    }

    async cancelAirAlert (fcmTokens) {
        if (fcmTokens.length == 0) return;
        const messages = [];
        fcmTokens.map((fcmToken) => {
            const message = {
                notification: {title: 'Cancel', body: 'Air alert in your region has been canceled'},
                token: fcmToken
            }
            messages.push(message);
        });
        admin.messaging().sendAll(messages).catch((err) => console.log(err));
    }
}

module.exports = new NotificationService();