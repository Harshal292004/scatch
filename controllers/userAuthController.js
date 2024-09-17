const { generateToken } = require('../utils/generateToken')
const UserModel = require('../models/user-model')
const bcrypt = require('bcrypt')
const SALT_ROUNDS = 14

module.exports.createdUser = async (req, res) => {
    try {
        const {
            username,
            fullName,
            age,
            email,
            password,
            contact,
            gender
        } = req.body

        const existingUser = await UserModel.findOne({ email })
        if (existingUser) {
            req.flash('error', 'Email already in use')
            return res.status(409).redirect('/users/login')
        }

        bcrypt.genSalt(SALT_ROUNDS,function(err,salt){
            bcrypt.hash(password,salt,async function(err,hashedPassword){
                const newUser = await UserModel.create({
                    username,
                    fullName,
                    age,
                    email,
                    password: hashedPassword,
                    contact,
                    gender
                })
                const token = generateToken(newUser)
                res.cookie('userToken', token)
            })
        })
        return res.redirect('/users/usershop')
    } catch (err) {
        console.error('User creation error:', err)
        req.flash('error', 'An error occurred during registration')
        return res.status(500).redirect('/users/create')
    }
}

module.exports.loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await UserModel.findOne({ email })
       
        if (!user) {
            req.flash('error', 'User not found')
            return res.status(404).redirect('/users/login')
        }
        
        const isPasswordValid = await bcrypt.compare(password, user.password)
        
        if (isPasswordValid) {
            const token = generateToken(user)
            res.cookie('userToken', token)
            return res.redirect('/users/usershop')
        } else { 
            req.flash('error', 'Incorrect password')
            return res.status(401).redirect('/users/login')
        }
        
    } catch (err) {
        console.error('Login error:', err)
        req.flash('error', 'An error occurred during login')
        return res.status(500).redirect('/users/login')
    }
}