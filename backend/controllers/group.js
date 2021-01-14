const mongoose = require('mongoose')
const Group = require('../models/Group')
const ObjectId = require('mongodb').ObjectID

const db = mongoose.connection
const Groups = db.collection('Group')

exports.loadGroupsById = (req, res, next, id) => {
  Groups.findOne({ groupUser: ObjectId(id) })
    .then(group => {
      if (!group) {
        console.log("Error loadbygroup not found")
        return res.status(400).json({ error: 'Groups not found' })

      }
      req.group = group
      next()
    }
    )
}

exports.inviteGroup = (req, res, next) => { // Demande d'amis
  console.log("Invite Group appelé \n")
  console.log("Inviter id " + req.body.userId)
  const inviterGroups = req.group
  Groups.findOneAndUpdate( // Ajout de la requête d'invitation dans la liste du receveur
    {userId: ObjectId(req.body.userId)},
    {$push: { requests: { userId: inviterGroups.userId, status: false, date: new Date(Date.now) }} },
    { new: true }
  ).catch(error => {res.status(401).json({error: error})})
  Groups.findOneAndUpdate( // Ajout de la requête d'invitation dans la liste du demandeur
    {userId: inviterGroups.userId},
    {$push: { requests: {userId: ObjectId(req.body.userId), status: true, date: new Date(Date.now) } }},
    { new: true }
  ).catch(error => {res.status(401).json({error: error})})
  res.status(200)
}

exports.addGoupeUser = (req, res, next) => { // Accepter ou refuser demande d'amis
  console.log("Add Friend appelé status " + req.body.status + "Demander " + req.body.userId + "req group" + JSON.stringify(req.group) +"\n")
  const accepter = req.group.userId // Celui qui accepte ou refuse l'invitation d'amis
  const inviter = req.body.userId // Celui qui a envoyé l'invitation

    Groups.findOneAndUpdate( // Ajout dans la liste d'amis de l'inviteur
      {userId: ObjectId(inviter)},
      //{$delete: { requests: { userId: accepter} } },
      {$push: { info: { groupUser: accepter} } },
      { new: true }
    ).catch(error => {res.status(401).json({error: error})})
    Groups.findOneAndUpdate( // Ajout dans la liste d'amis de l'accepteur
      {userId: ObjectId(accepter)},
      //{$delete: { requests: { userId: inviter} } },
      {$push: { info: { groupUser:ObjectId(inviter)} } },
      { new: true }
    ).catch(error => {res.status(401).json({error: error})})
  res.status(200)
}
