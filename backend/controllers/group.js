const mongoose = require('mongoose')
const Group = require('../models/Group')
const ObjectId = require('mongodb').ObjectID

const db = mongoose.connection
const Groups = db.collection('Group')

exports.loadGroupsById = (req, res, next, id) => {
  Groups.findOne({ groupUser: ObjectId(id) })
    .then(group => {
      if (!group) {
        console.log("Error loadbyfriend not found")
        return res.status(400).json({ error: 'Friends not found' })

      }
      req.group = group
      next()
    }
    )
}
