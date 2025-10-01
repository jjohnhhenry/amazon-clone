const mongoose = require("mongoose");

const CartHistorySchema = mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "UserClient"
    },
    action: {
        type: String,
        required: true,
        enum: ['ADD_TO_CART', 'REMOVE_FROM_CART', 'UPDATE_QUANTITY', 'CLEAR_CART', 'CHECKOUT']
    },
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Products",
        required: false
    },
    productName: {
        type: String,
        required: false
    },
    quantity: {
        type: Number,
        required: false
    },
    previousQuantity: {
        type: Number,
        required: false
    },
    price: {
        type: String,
        required: false
    },
    details: {
        type: String,
        required: false
    },
    timestamp: {
        type: Date,
        default: Date.now
    }
});

// Índice para búsquedas rápidas por cliente y fecha
CartHistorySchema.index({ client: 1, timestamp: -1 });

module.exports = mongoose.model("CartHistory", CartHistorySchema);
