const {generateToken}=require('../utils/generateToken')
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
        if(user){
            
            res.redirect('/users/login')
            return res.status(401).send('You have a account already please login')
        }
        
        bcrypt.genSalt(14,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hash){
                let createduser = await userModel.create({
                    username,
                    fullName,
                    age,
                    email,
                    password:hash,
                    contact,
                    gender
                })
                let token=generateToken(createduser)
                res.cookie("usertoken",token)
                res.redirect('/usershop')
            })
        })
    }
    catch(err){
        res.redirect('/')
    }
}


module.exports.loginUser = async function(req, res) {
    try {
        const { email, password } = req.body;
        
        const user = await userModel.findOne({ email: email });
        console.log('user'+Object.keys(user))

        if (!user) {
            console.log('returned from here ')
            return res.status(404).send("user not found");
         
        }
        
        const result = await bcrypt.compare(password, user.password);
        
        if (result) {
            let token = generateToken(user);
            res.cookie("userToken", token);
            res.redirect('/usershop')
        } else { 
            res.redirect('/usershop')
        }
    } catch (err) {
        res.status(500).send(err.message);
    }
};