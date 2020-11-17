const mongoose = require('mongoose');
const Post = require('../models/Post');

var db = mongoose.connection;
var Posts = db.collection('Posts');

exports.createPost = (req, res, next) => {
    delete req.body._id;
    const image = new Post({
      ...req.body
    });
    image.save().then( () => { 
      res.status(201).json({ message: 'Post saved successfully!' });
    }
    ).catch(
      (error) => {
        res.status(400).json({ error: error });
      }
    );
};

exports.getOnePost = (req, res, next) => {
  Posts.findOne({
    _id: req.params.id
  }).then(
    (image) => {
      res.status(200).json(image);
    }
  ).catch(
    (error) => {
      res.status(404).json({ error: error });
    }
  );
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