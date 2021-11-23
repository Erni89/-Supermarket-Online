const { Schema, model } = require('mongoose')
// For categories details
const categorySchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        minlength: 2,
    },
})
const categoryModel = model('category', categorySchema)
module.exports = {
    categoryModel
}