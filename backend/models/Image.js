const mongoose = require("mongoose");

const { ObjectId } = mongoose.Schema;

const postSchema = new mongoose.Schema({
  userId: {
    type: ObjectId,
    ref: 'User'
  },
  title: {
    type: String
  },
  caption: {
    type: String
  },
  url: {
    type: String
  },
  views: {
    type: Number,
    default: 0
  },
  viewsLimit: {
    type: Number
  },
  location:{
    lat: Number,
    long: Number
  },
  uploadDate: {
    type: Date,
    default: Date.now
  },
  expiryDate: {
    type: Date,
    default: Date.now
  },
  allowedViewer: [
    {
      userId:{type: ObjectId, ref: 'User' },
      seenPost: {type:Number, default: 0}
  ],
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [
    {
      comment: String,
      date: { type: Date, default: Date.now() },
      userId: { type: ObjectId, ref: 'User' }
    }
  ]
});


module.exports = mongoose.model('Post', postSchema);
