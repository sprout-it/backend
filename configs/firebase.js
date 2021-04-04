const admin = require('firebase-admin')
const serviceAccount = require('./serviceAccountKey.json')

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://sprout-9526a-default-rtdb.firebaseio.com",
  storageBucket: "gs://sprout-9526a.appspot.com",
});

exports.admin = admin
exports.firestore = admin.firestore()
exports.auth = admin.auth()
exports.storage = admin.storage()
exports.database = admin.database()