const mongoose = require('mongoose');
const Post = require('../models/Post');
const formidable = require('formidable');
const fs = require('fs');
var ObjectId = require('mongodb').ObjectID;
//const {getAllFriends} = require('./user');

var db = mongoose.connection;
var Posts = db.collection('Posts');

exports.loadPostById = (req, res, next,id) => {
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
    //console.log(req.body)
    //console.log(req.query)
    //delete req.body._id;
    let form = new formidable.IncomingForm();
  form.keepExtensions = true;
  form.parse(req, (err, fields, files) => {
    var post_test= {post:{}, views:{}, postedBy:{}};
    post_test.post.title = fields.title
    post_test.post.caption  = fields.caption
    post_test.postedBy._id = ObjectId(fields.userId)
    post_test.postedBy.pseudo = req.profile.user.pseudo
    //post_test.postedBy = ObjectId("5fbdcc5d42682316503994eb")
    post_test.views.viewsLimit = fields.viewsLimit
    console.log(JSON.stringify(post_test))

    if (err) {
      return res.status(400).json({
        err: 'Image could not be uploaded'
      });
    }
    //req.profile.hashed_password = undefined;
    //req.profile.salt = undefined;
    //post.postedBy = req.profile;
    if (files.photo) {
      //console.log(files.photo)
      post_test.post.url = fs.readFileSync(files.photo.path);
      post_test.post.contentType = files.photo.type;
    }
    let post = new Post({...post_test});
    Posts.insertOne(post)
    .then( () => {
      res.status(201).json({ message: 'Post saved successfully!' });
    })
    .catch(error => {res.status(400).json({ error: error });});
  });
    //var post_test= {post:{}, view:{}};
    //post_test.post.title = "Voyage Marseille"
    //post_test.post.caption  = "Avec les potes"
    //post_test.post.url = "http://test"
    //post_test.postedBy = ObjectId("5fbdcc5d42682316503994eb")
    //post_test.view.viewsLimit = 4
    //const post = new Post({
      //...req.body
    //  ...post_test
    //});
    //Posts.insertOne(post)
    //.then( () => {
    //  res.status(201).json({ message: 'Post saved successfully!' });
    //})
    //.catch(error => {res.status(400).json({ error: error });});
};

exports.getPhotoPost = (req, res) => {
  console.log("Get photo Post appelé")
  if (req.post.post.url) {
    console.log("Photo trouvée")
    //res.set(('Content-Type', req.post.post.contentType));
    //return res.send(undefined);
  } else res.send(undefined);
};

exports.getOnePost = (req, res, next) => {
  console.log("Get One post appellé \n")
  Posts.findOne({_id: req.body._id})
  .then( post => {
      res.status(200).json(post);
    })
    .catch( error => { res.status(404).json({ error: error }); } );
};

exports.getPost = (req, res) => {
  console.log("Get post appellé \n")
  console.log("Post demandé" + JSON.stringify(req.post.postedBy))
  return res.json(req.post);
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

exports.comment = (req, res) => {
  console.log("Comment demandé sur \n")
  let comment = {};
  comment.author = ObjectId(req.body.userId);
  comment.comment = req.body.comment.text;
  console.log(JSON.stringify(comment))
  Posts.findOneAndUpdate(
    {_id:ObjectId(req.body.postId)},
    { $push: { comments: comment } },
    { new: true }
  )

    ;
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
