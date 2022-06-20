const mongoose = require("mongoose")
const Joi = require("joi")

const User = mongoose.model("User", new mongoose.Schema({
        firstName:
            {
                type: String,
                require: true
            },
        lastName:
            {
                type: String,
                require: true
            },
        email:
            {
                type: String,
                require: true
            },
        password:
            {
                type: String,
                require: true
            },
        isAdmin:
            {
                type : Boolean,
                default:false
            }
    },{timestamps:true}
))
const ValidateUser = (user)=> {
    const schema =  {
        firstName : Joi.string().required(),
        lastName : Joi.string().required(),
        email : Joi.string().email().required(),
        password : Joi.string().required(),
    }
    return Joi.validate(user,schema)
}
const ValidateUserPut = (user)=> {
    const schema =  {
        firstName : Joi.string(),
        lastName : Joi.string(),
        email : Joi.string().email(),
        password : Joi.string(),
    }
    return Joi.validate(user,schema)
}
exports.User = User
exports.validate = ValidateUser
exports.validatePut = ValidateUserPut