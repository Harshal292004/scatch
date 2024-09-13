const mongoose = require('mongoose');
// Define the user schema
const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    fullName: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        min: 0
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    contact: {
        type: Number,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    address: [
        {
            street: String,
            city: String,
            state: String,
            postalCode: String,
            country: String
        }
    ],
    dateOfBirth: {
        type: Date
    },
    gender: {
        type: String,
        enum: ['Male', 'Female', 'Other']
    },
    preferences: {
        theme: {
            type: String,
            enum: ['dark', 'light'],
            default: 'dark'
        }
    },
    cart: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    wishlist: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    profilePic: {
        type: String,
        default: "default.webp"
    }
});

// Export the model
module.exports = mongoose.model("user",userSchema);
