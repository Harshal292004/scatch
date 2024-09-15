const generateToken = require('../utils/generateToken');
const ownerModel = require('../models/owner-model');
const bcrypt = require('bcrypt');

module.exports.createdOwner = async function(req, res) {
    try {
        // finding whether there is an owner or not 
        let owner = await ownerModel.find();
        
        if (owner.length > 0) {
            return res
                .status(403)
                .send("You don't have permission to create a new owner");
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
        
        const salt = await bcrypt.genSalt(14);
        const hash = await bcrypt.hash(password, salt);
        
        let createdOwner = await ownerModel.create({
            shopname,
            ownername,
            email,
            password: hash,
            contact,
            address: {
                street,
                city,
                state,    
                postalCode,
                country    
            },
            gstin
        });
        
        let token = generateToken(createdOwner);
        res.cookie("ownertoken", token);
        res.status(201).send(createdOwner);
    } catch (err) {
        res.status(500).send(err.message);
    }
};

module.exports.loginOwner = async function(req, res) {
    try {
        const { email, password } = req.body;
        
        const owner = await ownerModel.findOne({ email });
        
        if (!owner) {
            return res.status(404).send("Owner not found");
        }
        
        const result = await bcrypt.compare(password, owner.password);
        
        if (result) {
            let token = generateToken(owner);
            res.cookie("ownerToken", token);
            res.status(200).send("Login successful");
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};