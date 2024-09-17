const express=require('express')
const router=express.Router()
const isUserLoggedIn=require('../middlewares/isUserLoggedIn')
const isOwnerLoggedIn=require('../middlewares/isOwnerLoggedIn')

router.get('/',function(req,res){
    let error=req.flash('error')
    res.render('Landing',{error})
})

router.get('/usershop',isUserLoggedIn,function(req,res){
    res.render('shop')
})


router.get('/ownershop',isOwnerLoggedIn,function(req,res){
    console.log(Object.keys(req.user))
    res.render('shop')
})

module.exports=router
