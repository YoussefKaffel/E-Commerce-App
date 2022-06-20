const router = require("express").Router();
const {verifyToken,verifyAdmin,verifyAuthorisation} = require("./verifyToken.cjs")
const {Product,ValidateProduct,ValidateProductUpdate} = require("../Models/Produit.cjs")

//CREATE PRODUCT
router.post("/",verifyAdmin,async(req,res)=>{
    const {error} = ValidateProduct(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const product = new Product(req.body)
    await product.save()
    res.send(product)
})
//GET ALL PRODUCTS
router.get("/",async(req,res)=>{
    const queryNew = req.query.new
    const querryCategories=req.query.categories
    let products
    if(queryNew)
        products = await Product.find().sort({createdAt:-1})
    else if(querryCategories)
        products = await Product.find({category:{$in:[querryCategories]}})
    else
        products = await Product.find()
    res.send(products)
})
//GET PRODUCT BY ID
router.get("/find/:id",async(req,res)=>{
    const id = req.params.id
    const product = await Product.find({_id:id})
    res.send(product)
})
//UPDATE PRODUCT
router.put("/:id",verifyAdmin,async(req,res)=>{
    const {error} = ValidateProductUpdate(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const product = await Product.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.send(product)
})
//DELETE PRODUCT
router.delete("/:id",verifyAdmin,async(req,res)=>{
    const product = await Product.findByIdAndDelete(req.params.id)
    if(product)
    res.send("Product deleted")
    else
    res.send("Product not found")
})

module.exports = router