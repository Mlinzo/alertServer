const admin = require('firebase-admin');
const serviceAccount = require('../firebase-admin-sdk.json')

class NotificationService {

    constructor() {
        admin.initializeApp({
            credential: admin.credential.cert(serviceAccount)
        });
    }

    async airAlert (fcmTokens) {
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
        const messages = [];
        fcmTokens.map((fcmToken) => {
            const message = {
                notification: {title: 'Cancel', body: 'Air alert in your region has been canceled'},
                token: fcmToken
            }
            messages.push(fcmToken);
        });
        admin.messaging().sendAll(messages).catch((err) => console.log(err));
    }

}

const notS = new NotificationService();
notS.airAlert(['dt-YzVL6TyqW8mE23I_so9:APA91bHb7uSH_bNzA8pbJ16bnHWzXsjcXM5SiW6xxom15oUdj8irz3THL2Y4GeNssL-KewxfHbOO0eoMJkTA7riEy8iJ36R938ifpEMQRbQLIkd9EivBF2u6RalOx5qS0MNmuA58rURR'])

//module.exports = new NotificationService();