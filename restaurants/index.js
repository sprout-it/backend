const express = require('express');
const { db, storage,admin } = require('../configs/firebase')

const FieldVaule = admin.firestore.FieldValue
const router = express.Router()
const bucket = storage.bucket()

router.post('/restaurants', async (req, res) => {
    try {
        const {
            mimetype,
            buffer,
            originalname
        } = req.files[0]
        const folder = `restaurants/${req.body.name}`
        const fileName = `${originalname}`
        const fileUpload = bucket.file(`${folder}/${fileName}`);
        const blobStream = fileUpload.createWriteStream({
            metadata: {
                contentType: mimetype
            },
        });

        blobStream.on('error', (err) => {
            console.log(err)
            res.status(405).json(err);
        });

        blobStream.on('finish',async () => {
            const time = {
                created_at:FieldVaule.serverTimestamp(),
                updated_at:FieldVaule.serverTimestamp()
            }
            const data = Object.assign(req.body,time)
            console.log(data)
            await db.collection('restaurants').add(data)
            res.status(200).send({
                code: 200,
                success: true,
                message: `${Math.random()}`
            });
        });
        blobStream.end(buffer);

    } catch (error) {
        console.error(error)
        res.sendStatus(400);
    }
});

router.get('/restaurants',async (req, res) => {
    try {
      const docRef = await db.collection('restaurants').get()
      let result =[]
      docRef.docs.map((data)=>{
         result.push(data.data())
      })
      res.send({code:200,success: true, data:result});
    } catch (error) {
        console.error(error)
        res.sendStatus(400);
    }
});
module.exports = router