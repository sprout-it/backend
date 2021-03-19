const express = require('express');
const functions = require('firebase-functions')
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 80
const restarant = require('./restarant')

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(restarant)

app.listen(PORT, () => console.log(`Server is Running on ${PORT}`))

exports.api = functions.https.onRequest(app)