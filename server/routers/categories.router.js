const { categoryModel } = require('../models/categories.model')
const router = require('express').Router()
const { onlyAdmin, userAndAdmin } = require('../helpers/verifytokens')

router.get('/', userAndAdmin, async (req, res) => {
    try {
        const answer = await categoryModel.find().sort({ 'name': 1 })
        res.json({ err: false, answer })
    } catch (error) {
        res.status(400).json({ err: true, error:error.message })
    }
})
router.post('/', onlyAdmin, async (req, res) => {
    try {
        const temp=req.body.name
        const name=temp.charAt(0).toUpperCase() + temp.slice(1)
        const categoryToAdded = new categoryModel({name})
        await categoryToAdded.save()
        res.json({ err: false, msg: 'New category saved in the data base' })
    } catch (error) {
        res.status(400).json({ err: true, error:error.message })
    }
})
module.exports = router
