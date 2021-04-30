// This registration token comes from the client FCM SDKs.
const { admin } = require('../../configs/firebase')
var registrationToken = 'AAAA8FGoncw:APA91bHiq2iJgxF_gHA8Ck3vmqF8cbVx57vwTYcShsxFlXoY1rAHCIsQ_WbMXaFZZkLQ0yrTvxQTnR5uBSaoLm3UFf36btwMHxURsi4wJ46zK5leZ23Es3W0lSvTMCHlEJdvCf7wz5Ow';
const FCM_TOKEN = process.env.FCM_TOKEN || 'cKdLM0f2R_GSciu59bI3He:APA91bH6IjuUL0NcgJom5s1ZJ_Svf0LdV_HQgIwTFPGHEWTZf3kNYuzfyZ35FlNUeGCj94dVjgczC15ue2WA9qB-KX_BostyC1YpqXTmV07Mxe7ku7SIR3FcTZJIQG1BDAoYMnF8RE1Q'

const messaging = admin.messaging();

const sendNotification = (data, token) => {
    const { title, body, imageUrl } = data;
    let message = {
        notification: {
            title, body, imageUrl
        },
        tokens: token
    };
    messaging
        .sendMulticast(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}

const sendToUsers = (data, token) => {
    let message = {
        data,
        token: [FCM_TOKEN],
        contentAvailable: true,
        priority: "high",
    };
    messaging
        .send(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}

const sendTest = (data, token) => {
    let message = {
        data: {
            score: '850',
            time: '2:45'
        },
        token: [FCM_TOKEN]
    };
    messaging
        .send(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}

const sendNotificationTest = async (data, token) => {
    // const { title, body, imageUrl } = data;
    let message = {
        notification: {
            title: 'test', body: 'testsetsetsetsetset', imageUrl: 'https://brandinside.asia/wp-content/uploads/2018/01/shippop2.jpg'
        },
        tokens: ['cKdLM0f2R_GSciu59bI3He:APA91bH6IjuUL0NcgJom5s1ZJ_Svf0LdV_HQgIwTFPGHEWTZf3kNYuzfyZ35FlNUeGCj94dVjgczC15ue2WA9qB-KX_BostyC1YpqXTmV07Mxe7ku7SIR3FcTZJIQG1BDAoYMnF8RE1Q']
    };
    await messaging
        .sendMulticast(message)
        .then((response) => {
            console.log('Successfully sent message:', response);
        })
        .catch((error) => {
            console.log('Error sending message:', error);
        });
}

sendNotificationTest();
