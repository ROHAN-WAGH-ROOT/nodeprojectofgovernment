const mongoose = require('mongoose');
const fileUpload = require('express-fileupload');
const serviceSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    providedAuthorities: {
        type: Object,
    },
    type: {
        type: String,
        required: true
    },
    higherAuthority: {
        type: String,
        default: null
    },
    price: {
        type: Number
    },
    estimatedTime: {
        type: String
    },
    requiredDocuments:
        [{
            documentName: String,
            copies: Number,
            isXerox: String
        }]
    ,
    description: {
        type: String
    },
    preRequisites: {
        type: String
    },
    authorityId: {
        type: mongoose.Schema.Types.ObjectId,
        // required: true,
        ref: 'authorities'
    },
    image: {
        type: String
    }
})
module.exports = mongoose.model("service", serviceSchema);

