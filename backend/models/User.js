const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const { ObjectId } = mongoose.Schema;
const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
    trim: true,
    require: true
  },
  lastName: {
    type: String,
    trim: true,
    require: true
  },
  email: {
    type: String,
    trim: true,
    require: true
  },
  password: {
    type: String,
    require: true
  },
  pseudo: {
    type: String,
    trim: true,
    require: true
  },
  photo: {
    data: Buffer,
    contentType: String
  },
  location:{
    lat: Number,
    long: Number
  }
});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
