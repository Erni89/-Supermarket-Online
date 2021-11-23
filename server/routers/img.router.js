const router = require('express').Router()
const { upload, download } = require('../helpers/imgUpload')
const { onlyAdmin } = require('../helpers/verifytokens')

// only admin can add img

router.post('/', onlyAdmin, (req, res) => {
    upload(req, res, (err) => {
        if (err) {
            res.status(400).json({ error: true, msg: "error post", err })
        } else {
            if (req.file == undefined) {
                res.status(400).json({ err: true, msg: 'chose file' })
            } else {
                res.status(200).json({ err: false, msg: 'img added successfully' })
            }
        }
    })
})
router.post('/link', onlyAdmin, (req, res) => {
    try {
        if (req.body.url.match(/\.(jpeg|jpg|gif|png)$/) != null) {
            download(req.body.url, './imgUpload/' + req.body.filename, () => {
                console.log('done');
                res.json({ error: false, msg: "img added successfully" })
            })
        } else {
            res.json({ error: true, msg: "not image" })
        }
    } catch (error) {
        res.json({ error: true, msg: "is" + error })
    }
})
module.exports = router