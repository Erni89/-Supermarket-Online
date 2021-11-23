const { Schema, model } = require('mongoose')
// For products details
const productSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2
    },
    category: {
        type: Schema.Types.ObjectId,
        ref: 'category',
        required: true,
    },
    price: {
        type: Number,
        required: true,
        
    },
    img: {
        type: String,
        required: true,
    }
})
const productModel = model('product', productSchema)

module.exports = {
    productModel
}