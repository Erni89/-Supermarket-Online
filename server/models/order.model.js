const { Schema, model } = require('mongoose')

const orderSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'cart',
        required: true,
    },
    totalPrice: {
        type: Number,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    shippingDate: {
        type: String,
        required: true,
    },
    orderCreated: {
        type: String,
        default: Date.now
    },
    visa4Digits: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 4
    },
})

const orderModel = model('order', orderSchema)
module.exports = {
    orderModel
}