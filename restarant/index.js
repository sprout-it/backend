const express = require('express');
const router = express.Router()

router.get('/restarants', (req, res) => {
    res.status(200).send({ OK: "OK" })
    res.end()
})

module.exports = router