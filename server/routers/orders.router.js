const router = require('express').Router()
const { orderModel } = require('../models/order.model')
const { onlyAdmin, onlyUser, userAndAdmin } = require('../helpers/verifytokens')



// add order only user
router.post('/', onlyUser, async (req, res) => {
    try {
        const { city, street, shippingDate, visa4Digits } = req.body.orderDeatels
        const { user, cart, totalPrice } = req.body
        console.log(shippingDate);
        let tempDate = shippingDate.slice(0, 10);
        console.log(tempDate);

        // for 4 last digit 
        if (visa4Digits.length > 4) {
            temp = visa4Digits.slice(visa4Digits.length - 4, visa4Digits.length)
        } else {
            temp = visa4Digits
        }
        const addOrder = new orderModel({ city, street, shippingDate: tempDate, visa4Digits: temp, user, cart, totalPrice })
        await addOrder.save()
        res.json({ err: false, msg: 'order completed' })
    } catch (error) {
        res.status(500).json({ err: true, error: error.message })
    }
})
// any for home page
router.get('/countOrder', async (req, res) => {
    try {
        const answer = await orderModel.find().count()
        res.json({ err: false, answer })
    } catch (error) {
        res.status(500).json({ err: true, error: error.message })
    }
})
// get shipping Date for 3 delivery only per day
router.post('/shippingDate', onlyUser, async (req, res) => {
    try {
        const answer = await orderModel.find({ "shippingDate": req.body.dateShip }).count()
        res.json({ err: false, answer })
    } catch (error) {
        res.status(500).json({ err: true, error: error.message })
    }
})

// // get all the order for testing
// router.get('/', async (req, res) => {
//     try {
//         const answer = await orderModel.find()
//         res.json({ err: false, answer })
//     } catch (error) {
//         res.status(500).json({ err: true, error: error.massage })
//     }
// })

// // get all date delivar -------need to complited!!!!
// router.get('/getDate', async (req, res) => {
//     try {
//         const answer = await orderModel.find({}, { _id: 0, shippingDate: 1 }).sort({ shippingDate: 1 })
//         const date = answer.map(d => d.shippingDate)
//         let array = []
//         for (let i = 0; i < date.length; i++) {
//             if (date[i] == date[i + 1] && date[i] == date[i + 2]) {
//                 console.log(date[i])
//                 array.push(date[i])
//             }
//         }
//         console.log(array);
//         res.json({ err: false, array })
//     } catch (error) {
//         res.status(500).json({ err: true, error: error.message })
//     }
// })
module.exports = router