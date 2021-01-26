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

exports.inviteGroup = (req, res, next) => { // Demande d'ajout au group
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

exports.addGoupeUser = (req, res, next) => { // Accepter ou refuser demande d'ajout au group
  console.log("Add GroupUser appelé status " + req.body.status + "Demander " + req.body.userId + "req group" + JSON.stringify(req.group) +"\n")
  const accepter = req.group.userId // Celui qui accepte ou refuse l'invitation au group
  const inviter = req.body.userId // Celui qui a envoyé l'invitation

    Groups.findOneAndUpdate( // Ajout dans le group de l'inviteur
      {userId: ObjectId(inviter)},
      {$push: { info: { groupUser: accepter} } },
      { new: true }
    ).catch(error => {res.status(401).json({error: error})})
    Groups.findOneAndUpdate( // Ajout dans le group de l'accepteur
      {userId: ObjectId(accepter)},
      {$push: { info: { groupUser:ObjectId(inviter)} } },
      { new: true }
    ).catch(error => {res.status(401).json({error: error})})
  res.status(200)
}

exports.deleteFromGroupRequestList = (req, res, next) => { // Accepter ou refuser demande de groupe
  console.log("Delete from request list appelé \n")
  const accepter = req.groups.userId // Celui qui accepte ou refuse l'invitation de group
  const inviter = req.body.userId // Celui qui a envoyé l'invitation

    Groups.findOneAndUpdate( // Supression de la demande de group
      {userId: ObjectId(inviter)},
      {$pull: { requests: { userId: ObjectId(accepter)} } }
    ).catch(error => {res.status(401).json({error: error})})
    Groups.findOneAndUpdate( // Supressionde la demande de group
      {userId: ObjectId(accepter)},
      {$pull: { requests: { userId: ObjectId(inviter)} } }
    ).catch(error => {res.status(401).json({error: error})})

  res.status(200)
}

exports.getAllRequests = (req, res, next) => { // Avoir les demandes d'amis
  const groupRequests = req.groups.requests
  console.log("Friends request vaut " + JSON.stringify(groupRequests))
  res.status(200).json(groupRequests)
}


exports.getAllGroups = (req, res, next) => { // Avoir tous les groupes d'amis
  const groups = req.groups.groups
  res.json(groups)
}
