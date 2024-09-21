const mongoose=require('mongoose')

const orderSchema=mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },
    product:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'product',
       required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    price:{
        type:Number,
        required:true
    }
    ,
    totalAmount:{
        type:Number,
        required:true
    },
    date:{
        type:Date,
        default:Date.now()
    }
})

module.exports=mongoose.Schema('order',orderSchema)