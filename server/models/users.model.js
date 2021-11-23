const { Schema, model } = require('mongoose')
// For users details
const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        minlength: 2,
    },
    lastName: {
        type: String,
        required: true,
        minlength: 2,
    },
    email: {
        type: String,
        unique: true,
        required: true,
        minlength: 2,
    },
    // Personal ID that the user enters(not _id mongo)
    userId: {
        type: Number,
        unique: true,
        required: true,
        minlength: 5,
    },
    password: {
        type: String,
        required: true,
        minlength: 4,
    },
    city: {
        type: String,
        required: true,
    },
    street: {
        type: String,
        required: true,
    },
    //For user / admin 
    role: {
        type: String,
        required: true,
        default: "user",
    },
})
const UserModel = model('user', userSchema)
module.exports = {
    UserModel
}