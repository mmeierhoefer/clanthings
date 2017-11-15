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
    }
});
module.exports = mongoose.model("Asset", assetSchema);