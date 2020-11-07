const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
    caption: {type: String},
    url: {type: String, required: true},
    uploadDate: {type: Date},
    expiryDate: {type: Date},
    views: {type: Number},
    userId: {type: String}
})

module.exports = mongoose.model('Image', imageSchema);