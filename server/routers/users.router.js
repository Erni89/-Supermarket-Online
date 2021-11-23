const router = require('express').Router()
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { UserModel } = require('../models/users.model')


// check email / userId
router.post('/checkDetails', async (req, res) => {
    const { userId, email } = req.body
    try {
        const answer = await UserModel.findOne({
            $or: [
                { email }, { userId }
            ]
        })
        console.log(answer);
        res.json({ err: false, answer })
    } catch (error) {
        res.status(500).json({ err: true, error: error.massage })
    }
})
// 
router.post('/register', async (req, res) => {
    try {
        const userToBeSaved = new UserModel(req.body)
        const hash = await bcrypt.hash(req.body.password, 10)
        userToBeSaved.password = hash
        await userToBeSaved.save()
        res.json({ err: false, msg: 'User added successfully' })
    } catch (error) {
        res.status(400).json({ err: true, error })
    }
})
// 
router.post('/login', async (req, res) => {

    try {
        let userId = 0
        let email = ''
        const temp = req.body.username
        const password = req.body.password
        if (temp.includes('@')) {
            email = req.body.username
        } else {
            userId = parseInt(req.body.username)
        }
        const user = await UserModel.findOne({
            $or: [
                { email }, { userId }
            ]
        })
        if (!user) throw new Error('User not found')
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) throw new Error('Wrong password')
        const token = jwt.sign(
	   process.env.TOKEN_SECRET,
            { ...user._doc, password: '******' },
         
            { expiresIn: '90m' },
        )
        res.json({ err: false, token })
    } catch (error) {
        res.status(400).json({ err: true, error: error.message })
    }
})
// 
module.exports = router