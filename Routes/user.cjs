const {User , validate , validatePut} = require("../Models/User.cjs")
const mongoose = require("mongoose")
const express = require("express")
const bcrypt = require("bcrypt")
const router = express.Router()
const {verifyToken,verifyAdmin,verifyAuthorisation} = require("./verifyToken.cjs")
//GET ALL USERS
router.get('/',async (req,res)=>{
    const users = await User.find({})
    res.send(users)
})
//GET USER BY ID
router.get("/find/:id",verifyAdmin,async(req,res)=>{
    const id = req.params.id
    const user = await User.find({_id:id})
    res.send(user)
})
//UPDATE USER
router.put("/:id",verifyAuthorisation,async(req,res)=>{
    const {error} = validatePut(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    if (req.body.password) {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
    }
    const user = await User.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.send(user)})
//DELETE USER
router.delete("/:id",verifyAuthorisation,async(req,res)=>{
    const user = await User.findByIdAndDelete(req.params.id)
    if(user)
    res.send("User deleted")
    else
    res.send("User not found")
})
//GET USER STATS
router.get("/stats",verifyAdmin,async(req,res)=>{
    const date = new Date()
    const lastYear = new Date(date.setFullYear(date.getFullYear()-1))
    const data = await User.aggregate([
        {$match:{createdAt:{$gte:lastYear}}},
        {$project:{
            month:{$month:"$createdAt"},
            },},
        {$group:{_id:"$month",total:{$sum:1}}}])
    res.send(data)
});


//REGISTER USER
router.post("/", async (req,res)=>{
    const {error} = validate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    let user = await User.findOne({email:req.body.email})
    if (user) return res.status(400).send("User already registred")

    user = new User({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email,
        password:req.body.password
    })
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    await user.save()

    res.send({
        firstName:req.body.firstName,
        lastName:req.body.lastName,
        email:req.body.email
    })
})

module.exports = router