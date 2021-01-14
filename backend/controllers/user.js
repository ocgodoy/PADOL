const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const ObjectId = require('mongodb').ObjectId

const db = mongoose.connection
const Users = db.collection('Users')
const User = require('../models/User')
const Friends = db.collection('Friends')
const Friend = require('../models/Friend')

exports.loadUserById = (req, res, next, id) => {
  Users.findOne({ _id: ObjectId(id) }).then(
    user => {
      if (!user) {
        return res.status(400).json({ error: 'User not found' })
      }
      req.profile = user
      res.status(200).json(user)
      next()
    }
  ).catch(error => { res.status(400).json({ error: error }) })
}

/** ************************** CONNECTION ****************************/

exports.signup = (req, res, next) => {
  // console.log("Tentative d'inscription \n")
  Users.findOne({ 'auth.email': req.body.auth.email })
    .then(user => {
      if (!user) {
        // console.log('email is available')
        const newUser = new User(req.body)
        const friends = new Friend({ "userId": newUser._id})
        // console.log(newUser);
        newUser.encryptPassword(newUser => {
          // console.log(newUser);
          Users.insertOne(newUser)
            .then(() => res.status(201).json({ message: 'User created' }))
            .catch(error => res.status(400).json({ error }))
        })
        Friends.insertOne(friends)
      } else {
        return res.status(401).json({ error: 'User already exists !' })
      }
    })
}

exports.login = (req, res, next) => {
  // console.log("Tentative de connexion \n")
  Users.findOne({ 'auth.email': req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'User not found' })
      }
      bcrypt.compare(req.body.password, user.auth.password)
        .then(valid => {
          console.log("test reussi \n")
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect password' })
          }
          const token = jwt.sign(
            { _id: user._id },
            'RANDOM_TOKEN_SECRET',
            { expiresIn: 5 },
          );
          /*res.cookie('t', token, {
            expire: new Date() + 9999
          });
          console.log("res", res)
          */
          res.cookie('t', token, {
            expire: new Date( (new Date( Date.now() )).getTime() + parseInt(6000) ) //6sec
          });
          console.log("la date là",new Date( (new Date( Date.now() )).getTime() + parseInt(0) ) )
          console.log("la date de fin",new Date( (new Date( Date.now() )).getTime() + parseInt(180000) ) )
          
          res.status(200).json({
            user: { _id: user._id, email: user.auth.email, pseudo: user.about.pseudo },
            token: token
          })
        })
        .catch(error => res.status(500).json({ error: 'Password ckeck failed' }))
    })
    .catch(error => res.status(500).json({ error: 'Problem' }))
}

exports.logout = (res, req, next) => {
  res.clearCookie('t');
  return res.json({
    message: 'Signout success!'
  });
}

/** ************************** ACCOUNT INFO ****************************/

exports.getUser = (req, res, next) => {
  console.log('Get User appellé \n')
  return res.status(200).json(req.profile)
}

exports.updateUser = (req, res, next) => {
  const user = req.profile
  const updatedUser = req.body
  if (updatedUser.password !== undefined && !bcrypt.compare(updatedUser.password, user.password)) {
    bcrypt.hash(updatedUser.password, 10)
      .then(hash => {
        delete updatedUser.auth.password
        updatedUser.auth.password = hash
      }).catch(error => res.status(500).json({ error }))
  }
  Users.updateOne({ _id: ObjectId(user._id) }, { $set: updatedUser })
    .then(updatedUser => {
      res.status(200).json(updatedUser)
    })
    .catch(error => res.status(400).json({ error }))
}

exports.deleteUser = (req, res, next) => {
  const user = req.profile
  Users.deleteOne({ _id: ObjectId(user._id) })
    .then(() => res.status(200).json({ message: 'User deleted !' }))
    .catch(error => res.status(400).json({ error }))
}

exports.allUsers = (req, res) => {
  console.log('Get All Users demandé \n')
  const result = []
  let user = Users.find().toArray().then(user => res.json(user))
  // Users.find().toArray().then(user => {console.log(user),user.forEach((item, i) => {
  //  result.push("jajajo")
  // }) }).then(console.log("result vaut " + result))

  // Users.find().select('_id').exec(user => console.log(user))
  // Users.find((err, users) => {
  //  console.log("err vaut " + err)
  //  console.log("user vaut " + users)
  //  if (err)
  //    return res.status(400).json({
  //      err
  //    });
  //  res.json(users);
  // }).select('_id user.pseudo auth.email');
}
/** ************************** FRIENDS ****************************/

exports.addFriend = (req, res, next) => {

}

exports.deleteFriend = (req, res, next) => {

}

exports.getAllFriends = (req, res, next) => {
  const user = req.profile
  res.status(200).json(user)
  /*
    let friendGroups = user.friends.friendGroups;
    let allFriends = [];
    for( group of friendGroups ){
      allFriends.concat(group.members);
    }
    return allFriends;
    */
}
