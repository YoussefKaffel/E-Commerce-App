const router = require("express").Router();
const {verifyToken,verifyAdmin,verifyAuthorisation} = require("./verifyToken.cjs")
const {Order,ValidateOrder,validateOrderPut} = require("../Models/Order.cjs")

//CREATE ORDER
router.post("/",verifyToken,async(req,res)=>{
    const {error} = ValidateOrder(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const order = new Order(req.body)
    await order.save()
    res.send(order)
})
//UPDATE ORDER
router.put("/:id",verifyAdmin,async(req,res)=>{
    const {error} = validateOrderPut(req.body)
    if (error) return res.status(400).send(error.details[0].message)
    const order = await Order.findByIdAndUpdate(req.params.id,{$set:req.body},{new:true})
    res.send(order)
})
//DELETE ORDER
router.delete("/:id",verifyAuthorisation,async(req,res)=>{
const order = await Order.findByIdAndDelete(req.params.id)
    if(order)
    res.send("Order deleted")
    else
    res.send("Order not found")
})
//GET USER ORDERS
router.get("/user/:id",verifyAuthorisation,async(req,res)=>{
    const orders = await Order.find({userId:req.params.id})
    res.send(orders)
})
//GET ALL ORDERS
router.get("/",verifyAdmin,async(req,res)=>{
    const orders = await Order.find()
    res.send(orders)
})
//GET MONTHLY INCOME
router.get("/income",verifyAdmin,async(req,res)=>{
    const date = new Date()
    const lastMonth = new Date(date.setMonth(date.setMonth(date.getMon,this.getMonth()-1)))
    const prevMonth = new Date(date.setMonth(date.setMonth(date.getMon,this.getMonth()-2)))
    const income = await Order.aggregate([
        {$match:{createdAt:{$gte:prevMonth,$lt:date}}},
        {$project:{$month:"$createdAt",$sales:"$amount"}},
        {$group:{_id:"$month",total:{$sum:"$sales"}}}])
        res.send(income)
})
module.exports = router