const mongoose = require("mongoose");
const uniqueValidator = requiret('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    email : { type: String, required: true, unique: true },
    password : { type: String, required: true },
    pseudo : { type: String },
    friends : [{
        email : String,
        status : Number,
    }],
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
