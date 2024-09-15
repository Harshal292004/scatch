const generateToken=require('../utils/generateToken')
const userModel= require('../models/user-model')
const bcrypt= require('bcrypt')

module.exports.createdUser=async function(req,res){
    try{
        //destructuring form data so that a new user can be fetched in here
        const {
            username,
            fullName,
            age,
            email,
            password,
            contact,
            gender
        } = req.body;
        
        let user= await userModel.findOne({email:email})
        console.log(user)
        if(user){
            return res.status(401).send('You have a account already please login')
        }
        
        bcrypt.genSalt(14,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                let createduser = await userModel.create({
                    username,
                    fullName,
                    age,
                    email,
                    password,
                    contact,
                    gender
                })
                let token=generateToken(createduser)
                res.cookie("usertoken",token)
                res.send(createduser)
            })
        })
    }
    catch(err){
        res.send(err.message)
    }
}


module.exports.loginUser = async function(req, res) {
    try {
        const { email, password } = req.body;
        
        const user = await userModel.findOne({ email });
        
        if (!user) {
            return res.status(404).send("user not found");
        }
        
        const result = await bcrypt.compare(password, user.password);
        
        if (result) {
            let token = generateToken(user);
            res.cookie("userToken", token);
            res.status(200).send("Login successful");
        } else {
            res.status(401).send("Invalid credentials");
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};