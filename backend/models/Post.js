const mongoose = require('mongoose')
const { ObjectId } = require('mongodb')

const postSchema = new mongoose.Schema({

  postedBy: {
    _id: { type: ObjectId, ref: 'User' },
    pseudo: { type: String }
  },

  content: {
    title: { type: String },
    caption: { type: String },
    url: { type: {Buffer:'base64'}, require: true },
    contentType: String
  },

  views: {
    viewsNumber: { type: Number, default: 0 },
    viewsLimit: { type: Number },
    allowedViewer: [
      {
        userId: { type: ObjectId, ref: 'User' },
        seenPost: { type: Number, default: false }
      }
    ]
  },

  location: {
    lat: { type: Number },
    long: { type: Number }
  },

  date: {
    uploadDate: { type: Date, default: Date.now },
    expiryDate: { type: Date }
  },

  likes: {
    numberOfLikes: { type: Number, default: 0 },
    likers: [{ type: String}]
  },

  comments: [
    {
      commentId: {type: ObjectId, ref:'Comment'},
      comment: { type: String },
      date: { type: Date, default: Date.now },
      author: { type: ObjectId, ref: 'User' },
      pseudo: { type: String }
    }
  ]
})

postSchema.methods.tooManyViews = function () {
  let views = this.views.viewsNumber;
  let limit = this.views.viewsLimit;
  if( views >= limit ) {
    return true;
  } else {
    return false
  }
}

postSchema.methods.isExpired = function () {
  let expiry = this.date.expiryDate;
  console.log(this.content.title + ' expiries '+ expiry);
  if( expiry.getTime() <= Date.now() ) {
    console.log(this.content.title + ' is expired');
    return true;
  } else {
    console.log(this.content.title + ' is available');
    return false;
  }
}

module.exports = mongoose.model('Post', postSchema)
