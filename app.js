const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const db= require('./config/mongoose-connection')

const flash=require('connect-flash')
const expressSession=require('express-session')


const ownersRouter=require('./routes/ownersRouter')
const productsRouter=require('./routes/productsRouter')
const usersRouter=require('./routes/usersRouter')
const indexRouter=require('./routes/indexRouter')


require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.use(cookieParser());

//for setting up flash messages wwe require this middle wares
app.use(
    expressSession({
        //saved uninitialized means ki agar koyi hai jo logged in nahi hai uska session mat handle karo 
        resave:false,
        //resave is for dont redo the sessions
        saveUninitialized:false,
        secret:process.env.EXPRESS_SESSION_SECRET
    })
)
//for flash messages
app.use(flash())

app.use('/owners',ownersRouter)
app.use('/users',usersRouter)
app.use('/products',productsRouter)
app.use('/',indexRouter)
/* 
app.get('/',function(req,res){
    console.log(req.cookies)
    res.render('Landing')
}) */

app.listen(3000)