const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  user: {
    firstName: {type: String, trim: true, require: true},
    lastName: {type: String, trim: true, require: true},
    pseudo: {type: String, trim: true, require: true},
    photo: {
      data: {type: Buffer},
      contentType: {type: String}
    }
  },
  
  auth: {
    email: {type: String, trim: true, require: true},
    password: {type: String, require: true}
  },

  location:{
    lat: {type: Number},
    long: {type: Number},
    date: {type: Date, default: Date.now}
  }, 

  friends: {
    friendRequests: [
      {
        friendId: {type: ObjectId},
        date: {type: Date}
      }
    ],
    friendPending: [
      {
        userId: {type: ObjectId},
        date: {type: Date}
      }
    ],
    friendGroups: [
      {
        groupId: {type: ObjectId},
        name: {type: String, require: true},
        members: [ {type: ObjectId, ref: 'User'} ]
      }
    ]
  }

});

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
