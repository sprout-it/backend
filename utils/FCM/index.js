// This registration token comes from the client FCM SDKs.
var registrationToken = 'YOUR_REGISTRATION_TOKEN';
const FCM_TOKEN = process.env.FCM_TOKEN || 'APA91bHiq2iJgxF_gHA8Ck3vmqF8cbVx57vwTYcShsxFlXoY1rAHCIsQ_WbMXaFZZkLQ0yrTvxQTnR5uBSaoLm3UFf36btwMHxURsi4wJ46zK5leZ23Es3W0lSvTMCHlEJdvCf7wz5Ow'

var message = {
    data: {
        score: '850',
        time: '2:45'
    },
    token: registrationToken
};

// Send a message to the device corresponding to the provided
// registration token.
admin.messaging().send(message)
    .then((response) => {
        // Response is a message ID string.
        console.log('Successfully sent message:', response);
    })
    .catch((error) => {
        console.log('Error sending message:', error);
    });