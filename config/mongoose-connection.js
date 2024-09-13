const mongoose= require('mongoose')
const config= require('config')
//mongoose mai development phase chal raha hai ,and it can bee anything 
const dbgr= require('debug')("development:mongoose")

mongoose
    .connect(`${config.get("MONGODB_URI")}/scath`)
    .then(function(){
        dbgr("connected")
    })
    .catch(function(err){
        dbgr(err)
    })


//provides the entire controll to data base 
module.exports=mongoose.connection

