const { Schema, model } = require('mongoose')
// For carts details
const cartSchema = new Schema({
    user: {
        type: Schema.Types.ObjectId,
        ref: 'user',
        required: true,
    },
    created: {
        type: String,
        default: Date.now,
    },
    completed: {
        type: Boolean,
        default: false,
    }
})
const cartModel = model('cart', cartSchema)

module.exports = {
    cartModel
}