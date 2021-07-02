const express = require('express')
const multer = require('multer')
const cors = require('cors')

const PORT = process.env.PORT || 5000
const app = express();
const vision = require('@google-cloud/vision')

app.use(cors())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname)
    }
})
var upload = multer({ storage: storage }).single('file')

app.post('/upload', (req, res) => {

    upload(req, res, function (err) {
        if (err instanceof multer.MulterError) {
            return res.status(500).json(err)
        }
        else if (err) {
            return res.status(500).json(err)
        }

        const client = new vision.ImageAnnotatorClient({
            keyFilename: "./quickcode-318508-f48be9cc14dc.json",
        })

        client.documentTextDetection(req.file.path)
            .then((results) => {
                const text = results[0].fullTextAnnotation.text

                return res.status(200).send({ file: req.file, text: text })

            })
            .catch(err => {
                console.log(err)
            })
    })
})

app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`)
})