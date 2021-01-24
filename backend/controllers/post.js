const mongoose = require('mongoose')
const Post = require('../models/Post')
const formidable = require('formidable')
const fs = require('fs')
const ObjectId = require('mongodb').ObjectID
const { url } = require('inspector')
// const {getAllFriends} = require('./user');

const db = mongoose.connection
const Posts = db.collection('Posts')

exports.loadPostById = (req, res, next, id) => {
  Posts.findOne({ _id: ObjectId(id) })
    .then(post => {
      if (!post) {
        return res.status(400).json({ error: 'Post not found' })
      }
      req.post = post
      next()
    }
    )
}

exports.createPost = (req, res, next) => {
  console.log('Create post demandé \n')
  // console.log(req.body)
  // console.log(req.query)
  // delete req.body._id;
  const form = new formidable.IncomingForm()
  form.keepExtensions = true
  form.parse(req, (err, fields, files) => {
    const postTest = { content: {}, views: {}, postedBy: {}, date: {} }
    postTest.content.title = fields.title
    postTest.content.caption = fields.caption
    postTest.postedBy._id = ObjectId(fields.userId)
    postTest.postedBy.pseudo = req.profile.about.pseudo
    // post_test.postedBy = ObjectId("5fbdcc5d42682316503994eb")
    postTest.views.viewsLimit = fields.viewsLimit
    postTest.date.expiryDate = new Date((new Date(Date.now())).getTime() + parseInt(fields.timeLimit))
    if (err) {
      return res.status(400).json({
        err: 'Image could not be uploaded'
      })
    }

    if (files.photo) {
      //postTest.content.url = `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      postTest.content.url = fs.readFileSync(files.photo.path)
      postTest.content.contentType = files.photo.type
    }
    const post = new Post({ ...postTest })
    Posts.insertOne(post)
      .then(() => {
        res.status(201).json({ message: 'Post saved successfully! (CreatPost)' })
      })
      .catch(error => { res.status(400).json({ error: error }) })
  })
}

exports.getPhotoFromPost = (req, res) => {
  console.log('Get photo Post appelé (getPhotoFromPost)')
  if (req.post.content.url) {
    console.log('Photo trouvée (getPhotoFromPost)')
    res.set(('Content-Type', req.post.content.contentType))
    return res.send(req.post.content.url)
  } else res.send(undefined)
}

exports.getPost = (req, res) => {
  console.log('Get post appellé \n')
  //delete req.post.content.url
  Posts.findOneAndUpdate({ _id: req.post._id }, { $inc: { 'views.viewsNumber': 1 } })
    .then(post => {
      if (req.post.views.viewsNumber < req.post.views.viewsLimit) { res.status(200).json(req.post) } else { res.status(400).json({ error: 'Post plus disponible' }) }
    })
  // console.log("Post demandé" + JSON.stringify(req.post))
  // return res.status(200).json(req.post).catch( error => res.status(400).json({error: error}));
}

exports.editPost = (req, res, next) => {
Posts.findOneAndUpdate(
  { _id: ObjectId(req.body.postId) },
  { $set: 
    {"content.title": req.body.title, "content.caption": req.body.caption },
  }  )
  .then( () => {res.status(201).json({message: 'post updated successfully!'}) } )
  .catch( (error) => {res.status(400).json({ error: error }) } )
}


exports.deletePost = (req, res, next) => {
  Posts.deleteOne({ _id: ObjectId(req.body.postId) })
  .then( () => { res.status(200).json({ message: 'post successfully deleted !' }) } )
  .catch( (error) => {res.status(400).json({ error: error }) } )
}

exports.getAllPosts = (req, res, next) => {
  console.log('Get all posts demandé \n')
  let allPosts = [];
  Posts.find().toArray()
  .then( posts => {
      posts.forEach( post => {
        let postToTest = new Post({...post})
        if( postToTest.tooManyViews() === false && postToTest.isExpired() === false){
          allPosts.push(postToTest);
        }
      })
      res.status(200).json(allPosts);
    })
  .catch(error => {res.status(400).json({ error: error })})
}


exports.commentPost = (req, res) => {
  const comment = {}
  comment.author = ObjectId(req.body.userId)
  comment.comment = req.body.comment.text
  comment.date = new Date(Date.now())
  comment.pseudo = req.body.pseudo
  comment.commentId = ObjectId(req.body.commentId)

  Posts.findOneAndUpdate(
    { _id: ObjectId(req.body.postId) },
    { $push: { comments: comment } },
    { new: true }
  ).then(post => res.json(post))
}

exports.deleteComment = (req, res) => {
  Posts.findOneAndUpdate(
    { _id: ObjectId(req.body.postId) },
    { $pull: { comments : { commentId : ObjectId(req.body.comment.commentId)} } }
  ).then(post => res.json(post))
}

exports.updateViews = (req, res, next) => {
  const imageId = req.body._id
  // Trouver l'image dans la Database
  Posts.findOne({ _id: ObjectId(imageId) })
    .then(image => {
      if (!image) {
        return res.status(401).json({ error: 'no image !' })
      } else {
      // Dépassement de viewsLimit
        if (image.views.viewsNumber >= image.views.viewsLimit) {
          Posts.deleteOne({ _id: image._id })
          return res.status(401).json('image destroyed !')
        }

        // Incrémentation de views
        else {
          image.views.viewsNumber++
          Posts.findOneAndUpdate({ _id: ObjectId(imageId) }, { $set: image })
            .then(image => {
              if (!image) { return res.status(401).json('image not found !') }
              res.status(200).json({ message: 'views incremented' })
            })
            .catch(error => res.status(400).json({ error }))
        }
        res.status(200).json({ message: 'image found' })
      }
    })
}


exports.likePost = (req, res, next) => {
  delete req.body.userId;
  const like = {}
  like.numberOfLikes = req.body.numberOfLikes;
  like.likers = req.body.LikersId;

  
  Posts.findOneAndUpdate(
    { _id: ObjectId(req.body.postId) },
    { $set: {likes: like}},
    {upsert: true})
    .then( () => {res.status(201).json({message: 'like added successfully!'}) } )
    .catch( (error) => {res.status(400).json({ error: error }) } )
}
