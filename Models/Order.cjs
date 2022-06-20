const mongoose = require("mongoose");
const Joi = require("joi");
const Order = mongoose.model("Order", new mongoose.Schema({
    userId: {type: String, required: true},
    products:[{
        productId: {type: String},
        quantity: {type: Number, default: 1},
    }],
    amount: {type: Number, required: true},
    userAddress: {type: object, required: true},
    status: {type: String, default: "pending"},
},{timestamps:true}))
const ValidateOrder = (order) => {
    const schema = {
        userId: Joi.string().required(),
        products: Joi.array().required(),
        amount: Joi.number().required(),
        userAddress: Joi.object().required(),
        status: Joi.string(),
    }
    return Joi.validate(order, schema);
};
exports.Order = Order;
exports.ValidateOrder = ValidateOrder;