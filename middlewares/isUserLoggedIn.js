const jwt = require('jsonwebtoken')
const userModel = require('../models/user-model')

const isUserLoggedIn = async function (req, res, next) {
    const token = req.cookies.usertoken

    if (!token) {
        req.flash('error', 'You need to login first')
        return res.redirect('/users/login')
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_KEY)
        
        //selects all the passowrd and leave the
        const user = await userModel.findOne({ email: decoded.email }).select('-password')
        req.user = user
        return next()
    } catch (err) {
        console.error('Authentication error:', err)
        req.flash('error', 'Authentication failed. Please login again.')
        res.clearCookie('usertoken')
        return res.redirect('/users/login')
    }
}

module.exports = isUserLoggedIn