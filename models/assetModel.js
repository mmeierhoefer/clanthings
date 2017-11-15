var mongoose = require("mongoose");

// Schema setup

var assetSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
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
    comments: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Comment"
    }],
    image: String,
    assetType: {
        type: String,
        required: true
    },
    locationPerm: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Site"
        },
        name: String,
        address_1: String,
        address_2: String,
        city: String,
        state: String,
        zip: String,
        country: String
    },
    locationCurrent: {
        id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Site"
        },
        name: String,
        address_1: String,
        address_2: String,
        city: String,
        state: String,
        zip: String,
        country: String
    }
});
module.exports = mongoose.model("Asset", assetSchema);