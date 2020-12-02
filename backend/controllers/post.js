const mongoose = require('mongoose')
const Post = require('../models/Post')
const formidable = require('formidable')
const fs = require('fs')
const ObjectId = require('mongodb').ObjectID
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
    postTest.postedBy.pseudo = req.profile.user.pseudo
    // post_test.postedBy = ObjectId("5fbdcc5d42682316503994eb")
    postTest.views.viewsLimit = fields.viewsLimit
    postTest.date.expiryDate = new Date((new Date(Date.now())).getTime() + parseInt(fields.timeLimit))
    console.log(JSON.stringify(postTest))
    if (err) {
      return res.status(400).json({
        err: 'Image could not be uploaded'
      })
    }

    if (files.photo) {
      posTest.content.url = fs.readFileSync(files.photo.path)
      postTest.content.contentType = files.photo.type
    }
    const post = new Post({ ...posTest })
    Posts.insertOne(post)
      .then(() => {
        res.status(201).json({ message: 'Post saved successfully!' })
      })
      .catch(error => { res.status(400).json({ error: error }) })
  })
}

exports.getPhotoFromPost = (req, res) => {
  console.log('Get photo Post appelé')
  if (req.post.content.url) {
    console.log('Photo trouvée')
    res.set(('Content-Type', req.post.content.contentType))
    return res.send(req.post.content.url)
  } else res.send(undefined)
}

exports.getPost = (req, res) => {
  console.log('Get post appellé \n')
  delete req.post.content.url
  Posts.findOneAndUpdate({ _id: req.post._id }, { $inc: { 'views.viewsNumber': 1 } })
    .then(post => {
      if (req.post.views.viewsNumber < req.post.views.viewsLimit) { res.status(200).json(req.post) } else { res.status(400).json({ error: 'Post plus disponible' }) }
    })
  // console.log("Post demandé" + JSON.stringify(req.post))
  // return res.status(200).json(req.post).catch( error => res.status(400).json({error: error}));
}


exports.editPost = (req, res, next) => {
  const post = new Post({
    _id: req.params.id,
    caption: req.body.caption,
    url: req.body.url,
    userId: req.body.userId
  })
  Posts.updateOne({ _id: req.params.id }, image).then(
    () => {
      res.status(201).json({
        message: 'Image updated successfully!'
      })
    }
  ).catch(
    (error) => {
      res.status(400).json({ error: error })
    }
  )
}

exports.deletePost = (req, res, next) => {
  Posts.deleteOne({ _id: req.params.id }).then(
    () => {
      res.status(200).json({
        message: 'Image successfully deleted !'
      })
    }
  ).catch(
    (error) => {
      res.status(400).json({ error: error })
    }
  )
}

exports.getAllPosts = (req, res, next) => {
  console.log('Get all posts demandé \n')
  console.log('body  ' + JSON.stringify(req.body))
  Posts.find().toArray().then(
    (images) => {
      console.log('post: ' + images)
      res.status(200).json(images)
    }
  ).catch(
    (error) => {
      res.status(400).json({ error: error })
    }
  )
}

exports.commentPost = (req, res) => {
  console.log('Comment demandé sur \n')
  const comment = {}
  comment.author = ObjectId(req.body.userId)
  comment.comment = req.body.comment.text
  comment.date = new Date(Date.now())
  comment.pseudo = req.body.pseudo
  console.log(JSON.stringify(comment))
  Posts.findOneAndUpdate(
    { _id: ObjectId(req.body.postId) },
    { $push: { comments: comment } },
    { new: true }
  ).then(post => res.json(post, console.log('Commentaires: ' + JSON.stringify(post.comments))))
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
