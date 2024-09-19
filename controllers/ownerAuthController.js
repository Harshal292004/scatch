const generateToken = require('../utils/generateToken');
const ownerModel = require('../models/owner-model');
const bcrypt = require('bcrypt');


const SALT_ROUNDS=14

module.exports.createdOwner = async function(req, res) {
    try {
        // finding whether there is an owner or not 
        let owner = await ownerModel.find();
        
        if (owner.length > 0) {
            req.flash('error', 'Owner already there! Please Login')
            return res.status(403).redirect('/owners/login')
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


        bcrypt.genSalt(SALT_ROUNDS,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hashedPassword){
                const newOwner = await ownerModel.create({
                    shopname,
                    ownername,
                    email,
                    password: hashedPassword,
                    contact,
                    address: {
                        street,
                        city,
                        state,    
                        postalCode,
                        country    
                    },
                    gstin
                })
               
                const token = generateToken(newOwner)
                res.cookie('ownerToken', token)
            })
        })

        return res.redirect('/owners/shop')

    } catch (err) {
        console.error('Owner creation error:', err)
        req.flash('error', 'An error occurred during registration')
        return res.status(500).redirect('/owners/create')
    }
};

module.exports.loginOwner = async function(req, res) {
    try {
        
        const { email, password } = req.body;
        
        const owner = await ownerModel.findOne({ email:email });
        
        if (!owner) {
            req.flash('error','Owner not found')
            return res.status(500).redirect('/owners/create')
        }
        
        const result = await bcrypt.compare(password, owner.password);
        
        if (result) {
            let token = generateToken(owner);
            res.cookie("ownerToken", token);
            res.status(201).redirect('/owners/shop')
        } else {
            req.flash('error','Invalid credentials')
            return res.status(401).redirect('/owners/login')
        }
    } catch (err) {
        console.error('Owner login error:', err)
        req.flash('error', 'An error occurred during login')
        return res.status(500).redirect('/owners/login')
    }
};