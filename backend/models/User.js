const { ObjectId } = require("mongodb");
const mongoose = require("mongoose");
const bcrypt = require('bcrypt');
const uniqueValidator = require('mongoose-unique-validator');

const userSchema = new mongoose.Schema({
  user: {
    name: {type: String, trim: true, require: true},
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

userSchema.methods.encryptPassword = async function() {
    console.log(this.auth.password);
    bcrypt.hash(this.auth.password, 10, (err, hashedPassword) => {
      if(err){
        console.error(err);
        return false;
      }
      delete this.auth.password;
      console.log(this.auth.password);
      this.auth.password = hashedPassword;
      console.log(this.auth.password);
      return true;
    })
}

userSchema.plugin(uniqueValidator);
module.exports = mongoose.model('User', userSchema);
