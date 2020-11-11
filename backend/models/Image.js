const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
    userId: {type: String},
    caption: {type: String},
    url: {type: String, required: true},
    uploadDate: {type: Date, default: Date.now()},
    expiryDate: {type: Date},
    views: {type: Number},
    viewsLimit: {type: Number, default: null},
    allowedFriends: [{
        email: {type: String}
    }]
})

module.exports = mongoose.model('Image', imageSchema);