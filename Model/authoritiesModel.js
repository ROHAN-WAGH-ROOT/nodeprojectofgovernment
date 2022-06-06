const mongoose = require("mongoose");

const authoritiesSchema = mongoose.Schema({
    "name": {
        type: String,
        required: true
    },
    "email": {
        type: String,
        required: true
    },
    "phone": {
        type: String,
        required: true
    },
    "address": {
        type: {
            city: String,
            taluka: String,
            district: String,
            pincode: Number,
            addressLine1: String,
            addressLine2: String,
        },
        // required: true
    },
    "userId": {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'signUp'
    },
    "image": {
        type: Array
    }
},
    { collaction: "authorities" }
)

module.exports = mongoose.model("authority", authoritiesSchema);