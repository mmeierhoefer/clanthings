var mongoose = require("mongoose");

// Schema setup

var siteSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address_1: {
        type: String,
        required: true
    },
    address_2: {
        type: String,
    },
    city: {
        type: String,
        required: true
    },
    state: {
        type: String,
        required: true
    },
    zip: {
        type: String,
        required: true
    },
    country: {
        type: String,
        required: true
    },
    owner: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User"
        },
        username: String
    },
    retired: {
        type: Boolean,
    },
    retiredReason: {
        type: String,
    }
});
module.exports = mongoose.model("Site", siteSchema);