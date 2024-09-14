const path = require('path');
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const db= require('./config/mongoose-connection')
const ownersRouter=require('./routes/ownersRouter')
const productsRouter=require('./routes/productsRouter')
const usersRouter=require('./routes/usersRouter')

require('dotenv').config()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.set('view engine', 'ejs');
app.use(cookieParser());

app.use('/owners',ownersRouter)
app.use('/users',usersRouter)
app.use('/products',productsRouter)
app.get('/',function(req,res){
    res.render('Landing')
})


app.listen(3000)