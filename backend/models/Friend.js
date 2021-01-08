const { ObjectId } = require('mongodb')
const mongoose = require('mongoose')


const friendSchema = new mongoose.Schema({
  userId: { type: ObjectId, ref: 'User' },

  requests: [
    {
      userId: { type: ObjectId },
      status: {type: Boolean},
      date: { type: Date }
    }
    ],
  groups: [
      {
        name: { type: String, require: true },
        users: [{ type: ObjectId, ref: 'User' }]
      }
    ],
  all: [
    {
      userId: {type: ObjectId}
    }
  ]

})

module.exports = mongoose.model('Friend', friendSchema)
