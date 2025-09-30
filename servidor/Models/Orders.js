const mongoose = require("mongoose");

const OrdersSchema = mongoose.Schema({
    order: {
        type: Array,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    client: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "UserClient"
    },
    seller: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "UserSeller"
    },
    state: {
        type: String,
        default: "PENDIENTE"
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("Orders", OrdersSchema);