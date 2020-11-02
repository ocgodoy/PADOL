const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    _id : String,
    email : String,
    password : String,
    login : String,
    friends : [{
        email : String,
        status : Number,
    }],
});

module.exports = mongoose.model("Users", userSchema);
