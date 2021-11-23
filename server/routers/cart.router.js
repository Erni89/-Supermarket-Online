const router = require('express').Router()
const { cartModel } = require('../models/cart.model')
const { cartProduct } = require('../models/cartProduct.model')
const {onlyUser } = require('../helpers/verifytokens')

// get all the carts of a specific user
router.get('/allSpcUsercart/:userid', onlyUser, async (req, res) => {
    try {
        const answer = await cartModel.find({ 'user': req.params.userid })
        res.json({ err: false, answer })
    } catch (error) {
        res.status(500).json({ err: true, error: error.massage })
    }
})
// check if have open cart
router.get('/opencart/:userid', onlyUser, async (req, res) => {
    try {
        const answer = await cartModel.find({ 'user': req.params.userid, 'completed': false })
        res.json({ err: false, answer })
    } catch (error) {
        res.status(500).json({ err: true, error: error.message })
    }
})
// get last close cart by user
router.get('/lastcloseCart/:userid', onlyUser, async (req, res) => {
    try {
        const answer = await cartModel.findOne({ 'user': req.params.userid, 'completed': true }).sort({ created: -1 })
        res.json({ err: false, answer })
    } catch (error) {
        res.status(500).json({ err: true, error: error.message })
    }
})
// get item of open cart by user
router.get('/itemOpenCart/:cartid', onlyUser, async (req, res) => {
    try {
        const answer = await cartProduct.find({ 'cart': req.params.cartid }).populate('products.product')
        res.json({ err: false, answer })
    } catch (error) {
        res.status(500).json({ err: true, error: error.message })
    }
})
// creat new cart for user
router.post('/creatcart', onlyUser, async (req, res) => {
    const count = await cartModel.count({ 'user': req.body.user, 'completed': false })
    try {
        if (count > 0) {
            throw 'Failed to create new cart, user already have active cart!'
        } else {
            try {
                const cartToAdded = new cartModel(req.body)
                await cartToAdded.save()
                res.json({ err: false, msg: 'New cart saved in the data base' })
            } catch (error) {
                res.status(500).json({ err: true, error: error.message })
            }
        }
    } catch (error) {
        res.status(500).json({ err: true, error })
    }
})
// add item to cart
router.post('/addtocart', onlyUser, async (req, res) => {
    try {
        const { cart, product, amount, totalPrice } = req.body
        const addItemToOpenCar = await cartProduct.find({ 'cart': cart })
        if (addItemToOpenCar.length == 0) {
            const addNewItems = new cartProduct({ 'cart': req.body.cart })
            addNewItems.products.push({ 'product': product, 'amount': amount, 'totalPrice': totalPrice })
            await addNewItems.save()
        } else {
            addItemToOpenCar[0].products.push({ 'product': product, 'amount': amount, 'totalPrice': totalPrice })
            await addItemToOpenCar[0].save()
        }
        res.json({ err: false, msg: 'Item added to open cart' })
    } catch (error) {
        res.status(500).json({ err: true, error: error.message })
    }
})
// for total price of cart
router.put('/sumTotal', onlyUser, async (req, res) => {
    try {
        const addSum = await cartProduct.findById(req.body.cartId)
        addSum.cartTotalPrice = req.body.cartTotalPrice
        await addSum.save()
        res.json({ err: false, msg: 'successfully' })
    } catch (error) {
        res.status(500).json({ err: true, error: error.message })
    }
})

// close cart after order
router.post('/closeCart',onlyUser, async (req, res) => {
    try {
        const closeCart = await cartModel.findById({ '_id': req.body._id })
        closeCart.completed = true
        await closeCart.save()
        res.json({ err: false, msg: 'Cart closed' })
    } catch (error) {
        res.status(500).json({ err: true, error: error.message })
    }
})
// delete active cart
router.post('/deleteactivecart',onlyUser, async (req, res) => {
    try {
        const responDelete = await cartProduct.findByIdAndDelete({ "_id": req.body.cartId })
        if (!responDelete) throw 'cannot find the cart'
        res.json({ error: false, msg: "Deleted successfully", responDelete })
    } catch (error) {
        res.status(500).json({ err: true, error: error.message })
    }
})
// delete item from cart
router.post('/deleteactivecartOneItem',onlyUser, async (req, res) => {
    try {
        const delettOneItemCar = await cartProduct.findOneAndUpdate(
            { '_id': req.body.cartId },
            { $pull: { products: { "_id": req.body._id } } },
            { multi: true }
        )
        await delettOneItemCar.save()
        res.json({ error: false, msg: "Deleted successfully" })
    } catch (error) {
        res.status(500).json({ err: true, error: error.message })
    }
})





module.exports = router