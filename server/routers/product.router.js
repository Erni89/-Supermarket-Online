const router = require('express').Router()
const { productModel } = require('../models/product.model')
const fs = require('fs');
const { onlyAdmin, userAndAdmin } = require('../helpers/verifytokens')

// user and admin only get all products
router.get('/',userAndAdmin, async (req, res) => {
    try {
        const answer = await productModel.find({}).sort({ 'name': 1 }).populate('category')
        res.json({ err: false, answer })
    } catch (error) {
        res.status(500).json({ err: true, error: error.massage })
    }
})
// anyone for data on home page
router.get('/countPro', async (req, res) => {
    try {
        const count = await productModel.find({}).count()
        res.json({ err: false, count })
    } catch (error) {
        res.status(500).json({ err: true, error: error.massage })
    }
})

// for add new product
router.post('/',onlyAdmin, async (req, res) => {
    try {
        //for manipulation for img name
        // if name include % then cannot get image to client
        let temp = req.body.name
        if (temp.includes('%')) {
            temp = temp.replace('%', '@')
        }
        req.body.img = temp + '.png'
        const productToAdded = new productModel(req.body)
        await productToAdded.save()
        res.json({ err: false, msg: 'New product saved in the data base' })
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})
// only user and admin
router.post('/search', userAndAdmin,async (req, res) => {
    try {
        let name = req.body.name
        const answer = await productModel.find({ name: { $regex: name } })
        res.json({ err: false, answer })
    } catch (error) {
 
        res.status(500).json({ err: true, error:error.message })
    }
})
//for edit img - only admin
router.put('/',onlyAdmin,async (req, res) => {
    try {
        let temp = req.body.name
        if (temp.includes('%')) {
            temp = temp.replace('%', '@')
        }
        req.body.img = temp + '.png'
        const { id, name, price, category, img } = req.body
        const responseUpdate = await productModel.findByIdAndUpdate(id, { $set: { name, price, category, img } })
        // if name product change then need change name image
        fs.rename(`./imgUpload/${responseUpdate.img}`, `./imgUpload/${temp}.png`, (err) => {
            if (err) {
                res.status(500).json({ err: true, error:error.message })
            }
        });
        res.json({ error: false, msg: "updated successfully" })
    } catch (error) {
        res.status(500).json({ err: true, error:error.message })
    }
})
module.exports = router