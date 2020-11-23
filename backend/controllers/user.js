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
      res.status(200).json(user);
      next();
    }
  ).catch(error => { res.status(400).json({ error: error });});
};

/**************************** CONNECTION ****************************/

exports.signup = (req, res, next) => {

    Users.findOne({'auth.email': req.body.auth.email })
    .then( user => {
      if(!user){
        console.log('email is available')
        let newUser = new User(req.body);
        console.log(newUser);
        let passwordEncrypted = newUser.encryptPassword();
        if(passwordEncrypted){
          Users.insertOne(newUser)
          .then(() => res.status(201).json({ message: 'User created' }))
          .catch(error => res.status(400).json({ error }));
        } else {
          res.status(401).json({error: 'Password encryption failed'});
        }
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

exports.logout = (res, req, next) =>{

};

/**************************** ACCOUNT INFO ****************************/
exports.getUser = (req, res, next) => {
    let user = req.profile; 
    delete user.auth.password; 
    res.status(200).json(user);
};

exports.updateUser = (req,res,next) => {
    let user = req.profile;
    let updatedUser = req.body;
    if( updatedUser.password != undefined && !bcrypt.compare(updatedUser.password, user.password) ){    
      bcrypt.hash(updatedUser.password, 10)
      .then(hash => {
        delete updatedUser.auth.password;
        updatedUser.auth.password = hash;
      }).catch(error => res.status(500).json({ error }))
    }
    Users.updateOne({_id: ObjectId(user._id)}, { $set: updatedUser })
    .then( updatedUser => { 
        res.status(200).json(updatedUser);
    })
    .catch(error => res.status(400).json({error}));
};

exports.deleteUser = (req, res,next) =>{
    let user = req.profile;
    Users.deleteOne({ _id: ObjectId(user._id) })
    .then(() => res.status(200).json({ message: 'User deleted !'}))
    .catch(error => res.status(400).json({ error }));
};

/**************************** FRIENDS ****************************/

exports.addFriend = (req,res,next) => {
  
};

exports.deleteFriend = (req,res,next) => {

};

exports.getAllFriends = (req, res, next) => {
    let user = req.profile;
    res.status(200).json(user);
    /*
    let friendGroups = user.friends.friendGroups;
    let allFriends = [];
    for( group of friendGroups ){
      allFriends.concat(group.members);
    }
    return allFriends;
    */
};