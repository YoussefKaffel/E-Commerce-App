const mongoose = require('mongoose')
const express = require ('express')
var bodyParser = require('body-parser')
var app = express()
const dotenv = require('dotenv')
dotenv.config()

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

const users = require("./Routes/user.cjs")
const auth = require("./Routes/auth.cjs")
const product = require("./Routes/produit.cjs")
const cart = require("./Routes/cart.cjs")
const order = require("./Routes/order.cjs")



mongoose.connect(process.env.DB_CONNECTION)
    .then(()=>console.log("Connected to MongoDB."))
    .catch((e)=>console.error("Could not connect to MongoDB",e))

app.use('/users',users)
app.use('/auth',auth)
app.use('/product',product)
app.use('/cart',cart)
app.use('/order',order)



app.listen(3001,()=>console.log("Listening on port 3001 .."))
