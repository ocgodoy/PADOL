const mongoose = require("mongoose");

const imageSchema = mongoose.Schema({
    url: {type: String}
})

module.exports = mongoose.model('Image', imageSchema);