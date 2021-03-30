const express = require('express');
const functions = require('firebase-functions')
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 80
const restaurants = require('./restaurants')

app.use(cors())
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(restaurants)

app.listen(PORT, () => console.log(`Server is Running on ${PORT}`))

exports.api = functions.https.onRequest(app)