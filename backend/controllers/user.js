const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

var db = mongoose.connection;
var Users = db.collection('Users');
const User = require('../models/User');

exports.loadUserById = (req,res,next, id) =>{
  Users.findOne( {_id: ObjectId(id)} ).then(
    user => {
      if(!user){
        return res.status(400).json({error: 'User not found'})
      }
      req.profile = user;
      res.status(200).json(users);
      next();
    }
  ).catch(error => { res.status(400).json({ error: error });});
};

/**************************** CONNECTION ****************************/

exports.signup = (req, res, next) => {
    Users.findOne({ email: req.body.email })
    .then( user => {
      if(!user){
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
          const user = new User({
            ...req.body
          })
          delete user.password;
          user.password = hash;
          Users.insertOne(user)
            .then(() => res.status(201).json({ message: 'User created' }))
            .catch(error => res.status(400).json({ error }));
        })  
        .catch(error => res.status(500).json({ error }));
      } else {
        return res.status(401).json({ error: 'User already exists !' });
      }
    });  
};

exports.login = (req, res, next) => {
    Users.findOne({ email: req.body.email })
    .then(user => {
      if (!user) {
        return res.status(401).json({ error: 'User not found' });
      }
      bcrypt.compare(req.body.password, user.password)
        .then(valid => {
          if (!valid) {
            return res.status(401).json({ error: 'Incorrect password' });
          }
          res.status(200).json({
            userId: user._id,
            token: jwt.sign(
                { userId: user._id },
                'RANDOM_TOKEN_SECRET',
                { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};

/**************************** ACCOUNT INFO ****************************/

exports.updateUser = (req,res,next) => {
    let user = req.profile;
    let update = req.body;
    if( !bcrypt.compare(update.password, user.password) ){    
      bcrypt.hash(update.password, 10)
      .then(hash => {
        delete update.password;
        update.password = hash;
      }).catch(error => res.status(500).json({ error }))
    }
    Users.updateOne({_id: ObjectId(user._id)}, { $set: updatedUser })
    .then( updatedUser => { 
        res.status(200).json(updatedUser);
    })
    .catch(error => res.status(400).json({error}));
};

exports.deleteUser = (req, res,next) =>{
    Users.findOneAndDelete({ _id: ObjectId(req.profile._id) })
    .then(() => res.status(200).json({ message: 'User deleted !'}))
    .catch(error => res.status(400).json({ error }));
};

/**************************** FRIENDS ****************************/

exports.addFriend = (req,res,next) => {
  
};

exports.deleteFriend = (req,res,next) => {

};

exports.getAllFriends = (req, res, next) => {

};