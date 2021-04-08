const express = require('express');
const { firestore, storage } = require('../configs/firebase')

const { FieldVaule } = firestore
const router = express.Router()
const bucket = storage.bucket()

router.post(`/updateDeviceId`, async (req, res) => {
    const { deviceId, messageToken, telNo, name, address } = req.body
    const usersRef = firestore.collection(`users`)
    const updateToken = await usersRef.where(`deviceId`, `==`, `${deviceId}`).where(`messageToken`, `==`, messageToken).get()
    if (updateToken.empty) usersRef.add({ deviceId, messageToken, telNo, name, address })
    res.send({ status: 'success' })
})

module.exports = router