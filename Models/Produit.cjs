const mongoose = require("mongoose");
const Joi = require("joi");

const Product = mongoose.model("Product", new mongoose.Schema({
        title:  {type: String, required: true,unique:true},
        description: {type: String, required: true},
        image: {type: String, required: true},
        category: {type: Array},
        size: {type: String},
        color: {type: String},
        price: {type: Number, required: true},
},{timestamps:true}));

const ValidateProduct = (product) => {
    const schema = {
        title: Joi.string().required(),
        description: Joi.string().required(),
        image: Joi.string().required(),
        category: Joi.array().required(),
        size: Joi.string(),
        color: Joi.string(),
        price: Joi.number().required(),
}
    return Joi.validate(product, schema);}

const ValidateProductUpdate = (product) => {
    const schema = {
        title: Joi.string(),
        description: Joi.string(),
        image: Joi.string(),
        category: Joi.array(),
        size: Joi.string(),
        color: Joi.string(),
        price: Joi.number(),
    }
    return Joi.validate(product, schema);}


exports.Product = Product;
exports.ValidateProduct = ValidateProduct;
exports.ValidateProductUpdate = ValidateProductUpdate;