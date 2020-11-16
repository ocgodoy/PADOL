const mongoose = require("mongoose");
const { ObjectId } = require('mongodb');

const postSchema = new mongoose.Schema({

  userId: {type: ObjectId, ref: 'User'},

  post: {
    title: {type: String},
    caption: {type: String},
    url: {type: String, require: true}
  },
  
  views: {
    viewsNumber: {type: Number, default: 0},
    viewsLimit: {type: Number},
    allowedViewer: [
      {
        userId: {type: ObjectId, ref: 'User' },
        seenPost: {type: Number, default: false}
      }
    ]
  },

  location: {
    lat: {type: Number},
    long: {type: Number}
  },

  date: {
    uploadDate: {type: Date, default: Date.now},
    expiryDate: {type: Date}
  },
  
  likes: [{ type: ObjectId, ref: 'User' }],

  comments: [
    {
      comment: {type: String},
      date: { type: Date, default: Date.now() },
      userId: { type: ObjectId, ref: 'User' }
    }
  ]
});


module.exports = mongoose.model('Post', postSchema);
