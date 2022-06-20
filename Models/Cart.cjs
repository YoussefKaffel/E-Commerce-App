const mongoose = require("mongoose")
const Joi = require("joi")

const Cart = mongoose.model("Cart", new mongoose.Schema({
    userId: {type: String, required: true},
    products:[{
        productId: {type: String},
        quantity: {type: Number, default: 1},
    }]
},{timestamps:true}))

const ValidateCart = (cart) => {
    const schema = {
        userId: Joi.string().required(),
        products: Joi.array().required(),
    }

    return Joi.validate(cart, schema);}
