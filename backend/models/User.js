const mongoose = require("mongoose");
const uniqueValidator = requiret('mongoose-unique-validator');

const userSchema = mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    pseudo: { type: String, required: true, unique: true },
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
