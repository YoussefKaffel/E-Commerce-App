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
const produit = require("./Routes/produit.cjs")



mongoose.connect(process.env.DB_CONNECTION)
    .then(()=>console.log("Connected to MongoDB."))
    .catch((e)=>console.error("Could not connect to MongoDB",e))

app.use('/users',users)
app.use('/auth',auth)
app.use('/produit',produit)


app.listen(3001,()=>console.log("Listening on port 3001 .."))
