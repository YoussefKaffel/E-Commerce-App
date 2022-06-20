const router = require("express").Router();
const {verifyToken,verifyAdmin,verifyAuthorisation} = require("./verifyToken.cjs")
const {Cart , ValidateCart, ValidateCartUpdate} = require("../Models/Cart.cjs")

//CREATE CART
router.post("/",verifyToken,async(req,res)=>{
    const {error} = ValidateCart(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const cart = new Cart(req.body)
    await cart.save()
    res.send(cart)
})
//UPDATE CART
router.put("/:id",verifyAuthorisation,async(req,res)=>{
    const {error} = ValidateCartUpdate(req.body);
    if (error) return res.status(400).send(error.details[0].message)
    const cart = await Cart.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.send(cart)
})
//DELETE CART
router.delete("/:id",verifyAuthorisation,async(req,res)=>{
    const cart = await Cart.findByIdAndDelete(req.params.id)
    if(cart)
    res.send("Cart deleted")
    else
    res.send("Cart not found")
})
//GET USER CART
router.get("/user/:id",verifyAuthorisation,async(req,res)=>{
    const cart = await Cart.findOne({userId:req.params.id})
    res.send(cart)
})
//GET ALL CART
router.get("/",verifyAdmin,async(req,res)=>{
    const cart = await Cart.find()
    res.send(cart)
})

module.exports = router