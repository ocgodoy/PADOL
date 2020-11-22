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

exports.updateViews = (req, res, next) => {
  let imageId = req.body._id;
  //Trouver l'image dans la Database
  Posts.findOne({ _id: ObjectId(imageId) })
  .then(image => {
    if (!image) {
      return res.status(401).json({ error: 'no image !' });
    } else {

      //Vérification que views existe
      if (!image.views) {
        image.views =  "0";
      };

      //Dépassement de viewsLimit
      if (image.views >= image.viewsLimit) {
        Posts.deleteOne(image);
        return res.status(401).json('image destroyed !');
      }

      //Incrémentation de views
      else {
        image.views++;
        Posts.findOneAndUpdate({ _id: ObjectId(imageId) }, { $set: image })
        .then(image => {
          if (!image) { return res.status(401).json('image not found !'); }
          res.status(200).json({ message: 'views incremented' })
        })
        .catch(error => res.status(400).json({ error }))
      }
      res.status(200).json({ message: 'image found' });
    }
  });
};