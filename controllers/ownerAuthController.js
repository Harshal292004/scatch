const generateToken=require('../utils/generateToken')
const ownerModel= require('../models/owner-model')
const bcrypt= require('bcrypt')

module.exports.createdOwner=async function(req,res){
    try{
        //finnding wheter there is a owner or not 
        let owner= await ownerModel.find()
        //destructuring form data so that a new owner can be fetched in here
    
        if( owner.length > 0){
            return res
                .send(503)
                .send("You don't have permission to create a new owner")
        }
        const {
            shopname,
            ownername,
            email,
            password,
            contact,
            address: { street, city, state, postalCode, country },
            gstin
        } = req.body;
        bcrypt.genSalt(14,function(err,salt){
            bcrypt.hash(owner.password,salt,async function(err,hash){
                let createdowner = await ownerModel.create({
                    shopname,
                    ownername,
                    email,
                    password:hash, // Note: You should hash this password before saving
                    contact,
                    address: {
                        street,
                        city,
                        state,    
                        postalCode,
                        country    
                    },
                    gstingstin
                })
                let token=generateToken(createdowner)
                res.cookie("ownertoken",token)
                res.send(createdowner)
            })

        })
    }
    catch(err){
        res.send(err.message)
    }
}