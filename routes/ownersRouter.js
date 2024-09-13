const express= require('express')
const router= express.Router()
const ownerModel= require('../models/user-model')
router.get("/",function(req,res){
    res.send("hey its working ")
})

router.get("/login",function(req,res){
    res.render('owner-login')
})



if(process.env.NODE_ENV==="development"){
    router.post("/create",async function(req,res){
        //finnding wheter there is a owner or not 
        let owner= await ownerModel.find()
        //destructuring form data so that a new owner can be fetched in here 
        const {
            shopname,
            ownername,
            email,
            password,
            contact,
            address: { street, city, state, postalCode, country },
            gstin
        } = req.body;


        
        if( owner.length > 0){
            return res
                .send(503)
                .send("You don't have permission to create a new owner")
        }

       let createdowner = await ownerModel.create({
            shopname,
            ownername,
            email,
            password, // Note: You should hash this password before saving
            contact,
            address: {
                street,
                city,
                state,
                postalCode,
                country,
            },
            gstin
        })

        res.status(201).send(createdowner)

    })
}



module.exports=router