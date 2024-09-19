const express= require('express')
const router= express.Router()
const {createdProduct}=require('../controllers/productController')
router.get("/",function(req,res){
    res.send("hey its working ")
})

if(process.env.NODE_ENV==="development"){
    router.post("/create",createdProduct)
}


module.exports=router