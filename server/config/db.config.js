// step 1 import 
const mongoose = require('mongoose')
// step 2 function  connect to mongo
const connectToMongo = async () => {
    try {
        await mongoose.connect('mongodb://localhost/marketProject', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true
        });
        console.log("connected successfully to mongo ")
    } catch (err) {
        console.log("Error:  cannot connect to mongo.. ", err)
    }
}
// step 3 export
module.exports = { connectToMongo }