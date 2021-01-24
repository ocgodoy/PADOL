const mongoose = require('mongoose')
const Friend = require('../models/Friend')
const ObjectId = require('mongodb').ObjectID
// const {getAllFriends} = require('./user');

const db = mongoose.connection
const Friends = db.collection('Friends')

exports.loadFriendById = (req, res, next, id) => {
  Friends.findOne({ userId: ObjectId(id) })
    .then(friends => {
      if (!friends) {
        console.log("Error loadbyfriend not found")
        return res.status(400).json({ error: 'Friends not found' })

      }
      req.friends = friends
      next()
    }
    )
}

exports.inviteFriend = (req, res, next) => { // Demande d'amis
  console.log("Invite Friend appelé \n")
  console.log("Inviter id " + req.body.userId)
  const inviterFriends = req.friends
  Friends.findOneAndUpdate( // Ajout de la requête d'invitation dans la liste du receveur
    {userId: ObjectId(req.body.userId)},
    {$push: { requests: { userId: inviterFriends.userId, status: false, date: new Date(Date.now) }} },
    { new: true }
  ).catch(error => {res.status(401).json({error: error})})
  Friends.findOneAndUpdate( // Ajout de la requête d'invitation dans la liste du demandeur
    {userId: inviterFriends.userId},
    {$push: { requests: {userId: ObjectId(req.body.userId), status: true, date: new Date(Date.now) } }},
    { new: true }
  ).catch(error => {res.status(401).json({error: error})})
  res.status(200)
}

exports.addFriend = (req, res, next) => { // Accepter ou refuser demande d'amis
  console.log("Add Friend appelé status " + req.body.status + "Demander " + req.body.userId + "req friends" + JSON.stringify(req.friends) +"\n")
  const accepter = req.friends.userId // Celui qui accepte ou refuse l'invitation d'amis
  const inviter = req.body.userId // Celui qui a envoyé l'invitation

    Friends.findOneAndUpdate( // Ajout dans la liste d'amis de l'inviteur
      {userId: ObjectId(inviter)},
      //{$delete: { requests: { userId: accepter} } },
      {$push: { all: { userId: accepter} } },
      { new: true }
    ).catch(error => {res.status(401).json({error: error})})
    Friends.findOneAndUpdate( // Ajout dans la liste d'amis de l'accepteur
      {userId: ObjectId(accepter)},
      //{$delete: { requests: { userId: inviter} } },
      {$push: { all: { userId:ObjectId(inviter)} } },
      { new: true }
    ).catch(error => {res.status(401).json({error: error})})
  res.status(200)
}

exports.deleteFromRequestList = (req, res, next) => { // Accepter ou refuser demande d'amis
  console.log("Delete from request list appelé \n")
  const accepter = req.friends.userId // Celui qui accepte ou refuse l'invitation d'amis
  const inviter = req.body.userId // Celui qui a envoyé l'invitation



    Friends.findOneAndUpdate( // Supression de la demande d'amis
      {userId: ObjectId(inviter)},
      {$pull: { requests: { userId: ObjectId(accepter)} } }
    ).catch(error => {res.status(401).json({error: error})})
    Friends.findOneAndUpdate( // Supressionde la demande d'amis
      {userId: ObjectId(accepter)},
      {$pull: { requests: { userId: ObjectId(inviter)} } }
    ).catch(error => {res.status(401).json({error: error})})

  res.status(200)
}

exports.getAllRequests = (req, res, next) => { // Avoir les demandes d'amis
  const friendRequests = req.friends.requests
  console.log("Friends request vaut " + JSON.stringify(friendRequests))
  res.status(200).json(friendRequests)
}

exports.getAllFriends = (req, res, next) => { // Avoir liste d'amis
  const friends = req.friends.all
  res.status(200).json(friends)
}

exports.getAllGroups = (req, res, next) => { // Avoir tous les groupes d'amis
  const friendGroups = req.friends.groups
  res.json(friendGroups)
}
