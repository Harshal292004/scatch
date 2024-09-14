
const jwt= require('jsonwebtoken')

const generateToken=(actor)=>{
    return jwt.sign({email:actor.email,id:actor._id,password:actor.password},process.env.JWT_KEY)
}


module.exports.generateToken=generateToken