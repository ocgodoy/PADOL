const mongoose = require('mongoose');
const Post = require('../models/Post');
const {getAllFriends} = require('./user');

var db = mongoose.connection;
var Posts = db.collection('Posts');

exports.loadPostById = (req, res, next) => {
  Posts.findOne( {_id: ObjectId(id)} )
  .then( post => {
      if(!post){
        return res.status(400).json({error: 'Post not found'})
      }
      req.post = post;
      res.status(200).json(post);
      next();
    }
  ).catch(error => { res.status(400).json({ error: error });});
};

exports.createPost = (req, res, next) => {
    delete req.body._id;
    const post = new Post({
      ...req.body
    });
    Posts.insertOne(post)
    .then( () => { 
      res.status(201).json({ message: 'Post saved successfully!' });
    })
    .catch(error => {res.status(400).json({ error: error });});
};

exports.getOnePost = (req, res, next) => {
  Posts.findOne({_id: req.params.id})
  .then( post => {
      res.status(200).json(post);
    })
    .catch( error => { res.status(404).json({ error: error }); } );
};

exports.getFeedPosts = (req, res, next) => {
    let allFriends = getAllFriends(req,res,next);
    let feed = [];
    for( friend of allFriends ){
      Posts.find({postedBy: friend._id})
      .then(posts => {
        feed.concat(posts);
      })
    }
    res.status(200).send(feed);
};

exports.editPost = (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    caption: req.body.caption,
    url: req.body.url,
    userId: req.body.userId,
  });
  Posts.updateOne({_id: req.params.id}, image).then(
    () => {
      res.status(201).json({
        message: 'Image updated successfully!'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({ error: error });
    }
  );
};

exports.deletePost = (req, res, next) => {
  Posts.deleteOne({_id: req.params.id}).then(
    () => {
      res.status(200).json({
        message: 'Image successfully deleted !'
      });
    }
  ).catch(
    (error) => {
      res.status(400).json({ error: error });
    }
  );
};

exports.getAllPosts = (req, res, next) => {
  Posts.find().then(
    (images) => {
      res.status(200).json(images);
    }
  ).catch(
    (error) => {
      res.status(400).json({ error: error });
    }
  );
};