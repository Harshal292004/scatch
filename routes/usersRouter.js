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
    //<--done screens 
    //working 
    router.get("/login",function(req,res){
        res.render('user-login')
    })

    //working 
    router.get("/create",function(req,res){
        res.render('user-create')
    })

    //working 
    router.post("/create",createdUser)
    
    //working 
    router.post("/login",loginUser)

    //to add recommedations and personlisation options for later 
    //main route of user shop
    router.get("/shop/:userId",async(req,res)=>{
        let products= await productModel.find()
        const userId=req.params.userId
        res.render('user-shop',{products,userId})
    })

    //to added the redirection for the mishap 
    //the route adding product  to the cart  
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
            return res.status(200).redirect(`/cart/${userId}`)
        } catch (error) {
            req.flash('error','Something not found!!')
            return res.status(404).redirect(`/`)
        }
    })

    //working
    router.get('/cart/:userId', async (req, res) => {
        try {
            const userId = req.params.userId
            
            const user = await userModel.findById(userId).populate('cart');
    
            const products = user.cart;
            res.render('user-cart', {products});
        } catch (error) {
            console.error('Error fetching cart:', error);
        }
    })

    //working 
    router.get('/order/:userId',async (req,res)=>{
        
        try{
            const userId=req.params.userId
            const user= await userModel.findById(userId).populate('orders')
            const orders=user.orders
            res.render('user-order',{orders})
        }catch(error){
            console.error('Error fetching orders', error);
        }

    })

    // Product detail route
   router.get('/product/:productId/:userId', async (req, res) => {
    try {
        const productId = req.params.productId
        const userId = req.params.userId
        const user = await userModel.findById(userId)
        const product = await productModel.findById(productId)
        if (!product || !user) {
            return res.status(404).send('Product or user not found')
        }
        res.render('user-product-detail-screen', { product, user })
    } catch (error) {
        console.error('Error fetching product details:', error)
        res.status(500).send('Error loading product details')
    }
    })



    //-->


   

    
    
    router.get("/payment",(req,res)=>{
        res.render('user-payment')
    })


    router.post('/placeOrder/:userId/:productId',async (req,res)=>{
        
        try{
            const userId=req.params.userId
            const productId=req.params.productId
            const  user= await userModel.findOne({_id:userId})
            const product = await productModel.findOne({_id:productId})
            let {quantity,addressId} = req.body
            user.order.push(productId)
            await user.save()
            let totalAmount=product.price*quantity
            
            const  order=await orderModel.create({
                user:userId,
                product:productId,
                quantity:quantity,
                price:product.price,
                totalAmount:totalAmount,
                date:Date.now()
            })

            req.flash('success','order placed succesfully')
            res.redirect(`/order/${userId}`)
        }catch(error){
            console.error('Error: ',error)
            res.redirect('/')
        }
    })
}



module.exports=router