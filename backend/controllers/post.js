const mongoose = require('mongoose');
const Post = require('../models/Post');
//const {getAllFriends} = require('./user');

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
    console.log("Create post demandé \n")
    console.log(req.body)
    delete req.body._id;
    var post_test= {post:{}, view:{}};
    post_test.post.title = "Voyage Marseille"
    post_test.post.caption  = "Avec les potes"
    post_test.post.url = "http://test"
    post_test.postedBy = ObjectId("5fbdcc5d42682316503994eb")
    post_test.view.viewsLimit = 4
    const post = new Post({
      //...req.body
      ...post_test
    });
    Posts.insertOne(post)
    .then( () => {
      res.status(201).json({ message: 'Post saved successfully!' });
    })
    .catch(error => {res.status(400).json({ error: error });});
};

exports.getOnePost = (req, res, next) => {
  console.log("Get One post appellé \n")
  Posts.findOne({_id: req.params.id})
  .then( post => {
      res.status(200).json(post);
    })
    .catch( error => { res.status(404).json({ error: error }); } );
};

exports.getFeedPosts = (req, res, next) => {
    //let allFriends = getAllFriends(req,res,next);
    //let feed = [];
    //for( friend of allFriends ){
    //  Posts.find({postedBy: friend._id})
    //  .then(posts => {
    //    feed.concat(posts);
    //  })
    //}
    //res.status(200).send(feed);
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
  console.log("Get all posts demandé \n")
  console.log("body  " + JSON.stringify(req.body))
  Posts.find().toArray().then(
    (images) => { console.log("post: " + images)
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
