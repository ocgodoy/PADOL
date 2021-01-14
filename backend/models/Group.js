const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const groupSchema = new mongoose.Schema({

  userList: [
      {
        usersID: [{ type: ObjectId, ref: 'User' }]
      }
    ],

  postID: [{ type: ObjectId, ref: 'Post' }],

  info: [
      {
        groupUser: [{ type: ObjectId, ref: 'User' }]
      }
    ],

  requests:
   [
      {
        userId: { type: ObjectId },
        status: {type: Boolean},
        date: { type: Date }
      }
   ]
})

module.exports = mongoose.model('Group', groupSchema)