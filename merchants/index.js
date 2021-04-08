const express = require('express');
const { firestore, storage, admin } = require('../configs/firebase')

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

        blobStream.on('finish', async () => {
            const time = {
                created_at: FieldVaule.serverTimestamp(),
                updated_at: FieldVaule.serverTimestamp()
            }
            const data = Object.assign(req.body, time)
            await firestore.collection('restaurants').add(data)
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

router.get('/restaurants', async (req, res) => {
    try {
        const docRef = await firestore.collection('restaurants').get()
        let result = []
        await Promise.all(docRef.docs.map(async (data) => {
            const folder = 'restaurants'
            const file = bucket.file(`${folder}/${data.data().name}/${data.data().name}.jpg`);
            const [recieptPictureUrl] = await file.getSignedUrl({ action: "read", expires: Date.now() + 60 * 60 * 10 })

            const restaurants = {
                imgUrl: recieptPictureUrl
            }

            Object.assign(restaurants, {
                ...data.data(), key: data.id
            })

            result.push(restaurants)
        }))
        res.send(result);
    } catch (error) {
        console.error(error)
        res.sendStatus(400);
    }
});

router.get('/restaurant/menu/:key', async (req, res) => {
    const { key } = req.params
    try {
        const restaurant = await firestore.doc(`restaurants/${key}`).get()
        const getMenu = {
            key,
            ...restaurant.data(),
            menu: (await restaurant.data().menu.get()).data()
        }
        res.send(getMenu);
    } catch (error) {
        console.error(error)
        res.sendStatus(400);
    }
});

router.get('/restaurant/:key', async (req, res) => {
    const { key } = req.params
    try {
        const docRef = await firestore.doc(`restaurants/${key}`).get()
        res.send({
            key,
            ...docRef.data()
        });
    } catch (error) {
        console.error(error)
        res.sendStatus(400);
    }
});

router.get('/resSize', async (req, res) => {
    try {
        const { size } = await firestore.collection(`restaurants`).get()
        res.send({
            size
        });
    } catch (error) {
        console.error(error)
        res.sendStatus(400);
    }
});

module.exports = router