const { Schema, model } = require('mongoose')
// For single cart 
const cartProductSchema = new Schema({
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'cart',
        required: true,
    },
    // Array - Each cell contains a product, amount and total Price
    products: [{
        product: {
            type: Schema.Types.ObjectId,
            ref: 'product',
        },
        amount: {
           type: Number,
           required:true,
           default:0
            
        },
        totalPrice: {
            type: Number,
            default: 0,
        }
    }],
    cartTotalPrice:{
        type: Number,
        default: 0,
    }
})

const cartProduct = model('cartProduct', cartProductSchema)

module.exports = {
    cartProduct
}