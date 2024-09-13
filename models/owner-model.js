const mongoose = require('mongoose');

// Define the user schema
const ownerSchema = mongoose.Schema({
    shopname: {
        type: String,
        unique: true
    },
    ownername: {
        type: String,
    },
    email: {
        type: String,
        unique: true,
        lowercase: true // Convert email to lowercase before saving
    },
    password: {
        type: String,
    },
    contact: {
        type: Number,
    },
    products:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "product"
        }
    ],
    address: {
        street: String,
        city: String,
        state: String,
        postalCode: String,
        country: String
    },
    profilePic: {
        type: String,
        default: "default.webp"
    },
    gstin:String
});

// Export the model
module.exports = mongoose.model("owner", ownerSchema);
