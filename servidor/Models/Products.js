const mongoose = require("mongoose");

const ProductsSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    price: {
        type: String,
        required: true,
        trim: true
    },
    ofert: {
        type: String,
        trim: true
    },
    stock: {
        type: String,
        trim: true
    },
    brand: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: true,
        trim: true
    },
    subcategory: {
        type: String,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ['incomplete', 'complete', 'draft'],
        default: 'incomplete'
    },
    urls: {
        type: [Object],
        required: false,
        default: []
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "UserSeller"
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Products", ProductsSchema);