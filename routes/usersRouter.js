const express= require('express')
const router= express.Router()
const {createdUser,loginUser}=require('../controllers/userAuthController')
const productModel=require('../models/product-model')
const userModel= require('../models/user-model')
const orderModel= require('../models/order-model')
router.get("/",function(req,res){
    res.send("hey its working ")
})



if(process.env.NODE_ENV==="development"){
    router.get("/login",function(req,res){
        res.render('user-login')
    })

    
    router.get("/create",function(req,res){
        res.render('user-create')
    })

    
    router.post("/create",createdUser)
    
    router.post("/login",loginUser)



    router.get("/purchase",(req,res)=>{
        res.render('user-purchase')
    })
    
    router.get("/shop/:userId",async(req,res)=>{
        let products= await productModel.find()
        const userId= req.params.userId
        res.render('user-shop',{products,userId})
    })


    router.get("/payment",(req,res)=>{
        res.render('user-payment')
    })

    router.get("/cart",(req,res)=>{
        res.render('user-cart')
    })

    router.get("/order",(req,res)=>{
        res.render('user-order')
    })

    router.post("/addtocart/:userid/:productid", async (req, res) => {
        const userId = req.params.userid;
        const productId = req.params.productid;
               
        try {
            const user = await userModel.findById(userId);
            if (!user) {
                req.flash('error','User not found!!')
                return res.status(404).redirect(`/users/shop/${userId}`)
            }
                   // Check if the product is already in the cart
            if (user.cart.includes(productId)) {
                req.flash('error','product already in the cart!!')
                return res.status(400).redirect(`/users/shop/${userId}`)
            }
            user.cart.push(productId);
            await user.save();
            req.flash('success','poduct added to the cart ')
            return res.status(200).redirect('/users/cart')
        } catch (error) {
            req.flash('error','Something not found!!')
            return res.status(404).redirect(`/users/shop/${userId}`)
        }
    })

    router.get('/cart/:userId', async (req, res) => {
        try {
            const userId = req.params.userId
            
            const user = await userModel.findById(userId).populate('cart');
    
            const products = user.cart;
    
            res.render('user-cart', { products, userId });
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    })



    router.get(`/returnorder/:userId`,async (req,res)=>{
        
        try{
            
            const userId=req.params.userId

            const user= await userModel.findById(userId).populate('order')





        }catch(error){

        }

    })


    router.post('/placeOrder/:userId/:productId',async (req,res)=>{
        
        try{

            const userId=req.params.userId
            
            const productId=req.params.productId



            const  user= await userModel.findOne({_id:userId})
            
            const product = await productModel.findOne({_id:productId})



            let {quantity} = req.body


            user.order.push(productId)
            
            await user.save()
            let totalAmount=product.price*quantity
            let order=await orderModel.create({
                user:userId,
                product:productId,
                quantity:quantity,
                price:product.price,
                totalAmount:totalAmount,
                date:Date.now()
            })

            if(order){
                
            }
            else{

            }

        }catch(error){

        }
    })
}



module.exports=router