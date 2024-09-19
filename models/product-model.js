const mongoose = require('mongoose');


// Define the product schema
const productSchema = mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productDescription: {
        type: String,
        required: true
    },
    price:{
        type:Number,
        default:0
    },
    sizes: {
        type: [String], // Array of strings for sizes
        default: []
    },
    quantity: {
        type: Number,
        default: 0 // Default to 0 if no quantity is provided
    },
    inStock: {
        type: Boolean,
        default: true // Default to true if not specified
    },
    tags: {
        type: [String], // Array of strings for tags
        default: []
    },
    picture: {
        type: Buffer
    },
    category: {
        type: String,
        default: '' // Default to an empty string if no category is provided
    },
    brand: {
        name: {
            type: String,
            default: '' // Default to an empty string if no brand name is provided
        },
        isApplicable: {
            type: Boolean,
            default: false // Default to false if brand is not applicable
        }
    },
    colors: {
        type: [String], // Array of strings for colors
        default: []
    },
    backgroundColor: {
        type: String,
        default: '' // Default to an empty string if no background color is provided
    },
    textColor: {
        type: String,
        default: '' // Default to an empty string if no text color is provided
    },
    material: {
        type: String,
        default: '' // Default to an empty string if no material is provided
    },
    rating: {
        type: Number,
        min: 0, // Minimum rating value
        max: 5, // Maximum rating value
        default: 0 // Default to 0 if no rating is provided
    },
    reviews: [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'User'
            },
            rating: {
                type: Number,
                min: 1,
                max: 5
            },
            comment: {
                type: String
            }
        }
    ]
});

// Export the model
module.exports = mongoose.model("product", productSchema);
