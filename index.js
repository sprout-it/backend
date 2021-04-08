const express = require('express');
const functions = require('firebase-functions')
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 80
const merchants = require('./merchants')
const users = require('./users')

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

app.use(merchants)
app.use(users)

app.listen(PORT, () => console.log(`Server is Running on ${PORT}`))

// exports.api = functions.https.onRequest(app)