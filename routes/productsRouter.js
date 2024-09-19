const express= require('express')
const router= express.Router()
const {createdProduct}=require('../controllers/productController')
const upload=require('../config/multer-config')
router.get("/",function(req,res){
    res.send("hey its working ")
})

if(process.env.NODE_ENV==="development"){
    router.post("/create",upload.single("picture"),createdProduct)
}


module.exports=router