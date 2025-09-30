const mongoose = require("mongoose");

const UserClientSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    surname: {
        type: String,
        trim: true
    },
    identification: {
        type: String,
        trim: true,
        unique: true,
        sparse: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        trim: true
    },
    address: {
        type: String,
        trim: true
    },
    province: {
        type: String,
        trim: true
    },
    city: {
        type: String,
        trim: true
    },
    created: {
        type: Date,
        default: Date.now()
    }
});

module.exports = mongoose.model("UserClient", UserClientSchema);