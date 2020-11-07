const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    pseudo: { type: String, required: true}, 
    email : { type: String, required: true, unique: true},
    password : { type: String, required: true},
    friends : [{
        email : String,
        status : Number,
    }],
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
