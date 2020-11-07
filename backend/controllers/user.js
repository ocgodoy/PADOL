const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const User = require('../models/User');

exports.getAllUsers = (req,res,next) =>{
  User.find().then(
    (users) => {
      res.status(200).json(users);
    }
  ).catch(
    (error) => {
      res.status(400).json({ error: error });
    }
  );
};

/**************************** CONNECTION ****************************/

exports.signup = (req, res, next) => {
    bcrypt.hash(req.body.password, 10)
    .then(hash => {
      const user = new User({
        ...req.body
      })
      delete user.password;
      user.password = hash;
      user.save()
        .then(() => res.status(201).json({ message: 'User created' }))
        .catch(error => res.status(400).json({ error }));
    })  
    .catch(error => res.status(500).json({ error }));
};

exports.login = (req, res, next) => {
    User.findOne({ email: req.body.email })
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

};

exports.deleteUser = (req, res,next) =>{

};

/**************************** FRIENDS ****************************/

exports.addFriend = (req,res,next) => {

};

exports.deleteFriend = (req,res,next) => {

};

exports.getAllFriends = (req, res, next) => {

};