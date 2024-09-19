const express= require('express')
const router= express.Router()
const {createdUser,loginUser}=require('../controllers/userAuthController')

router.get("/",function(req,res){
    res.send("hey its working ")
})



if(process.env.NODE_ENV==="development"){
    router.get("/login",function(req,res){
        res.render('user-login')
    })

    
    router.get("/create",function(req,res){
        res.render('user-create')
    })

    
    router.post("/create",createdUser)
    
    router.post("/login",loginUser)



    router.get("/purchase",(req,res)=>{
        res.render('user-purchase')
    })
    
    router.get("/shop",(req,res)=>{
        res.render('user-shop')
    })


    router.get("/payment",(req,res)=>{
        res.render('user-payment')
    })

    router.get("/cart",(req,res)=>{
        res.render('user-cart')
    })

    router.get("/order",(req,res)=>{
        res.render('user-order')
    })
}



module.exports=router