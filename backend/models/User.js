const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    pseudo: { type: String}, 
    email : { type: String},
    password : { type: String},
    friends : [{
        email : String,
        status : Number,
    }],
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
