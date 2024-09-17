const jwt= require('jsonwebtoken')
const ownerModel=require('../models/owner-model')

const isOwnerLoggedIn = async function (req,res,next) {
    const token= req.cookies.ownertoken

    if(!token){
        req.flash('error',"you need to login first")
        return res.redirect('/owners/login')
    }

    try{
        const decoded= jwt.verify(token,process.env.JWT_KEY)
      
        //select all the fields except the password of the owner
        const owner= await ownerModel.findOne({email:decoded.email}).select("-password")

        req.owner=owner
        return next()
    }
    catch(err){
        console.error('Authentication error:', err)
        req.flash('error', 'Authentication failed. Please login again.')
        res.clearCookie('ownertoken')
        return res.redirect('/owners/login')
    }
}

module.exports=isOwnerLoggedIn