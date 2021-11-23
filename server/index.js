// imports
const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const { connectToMongo } = require('./config/db.config')

const port = 1000
// setup
const app = express()
connectToMongo()
dotenv.config()

// image
app.use('/getimage', express.static('imgUpload'))

// middleware
app.use(cors())
app.use(express.json())

app.use('/users', require('./routers/users.router'))
app.use('/categories', require('./routers/categories.router'))
app.use('/products', require('./routers/product.router'))
app.use('/cart', require('./routers/cart.router'))
app.use('/img', require('./routers/img.router'))
app.use('/orders', require('./routers/orders.router'))

// run
app.listen(port, () => console.log('server listening on port ' + port))