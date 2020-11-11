const mongoose = require('mongoose');
const ObjectId = require('mongodb').ObjectId;

var db = mongoose.connection;
var Images = db.collection('Images');
const Image = require('../models/Image');

exports.postImage = (req, res, next) => {
    console.log(req.body);
    delete req.body._id;
    const image = new Image({
      ...req.body
    });
    console.log(image);
    Images.insertOne(image)
    .then( () => { res.status(201).json({ message: 'Image saved !' }); })
    .catch( (error) => { res.status(400).json({ error: error }); });
};

exports.getOneImage = (req, res, next) => {
  Images.findOne({ _id: ObjectId(req.params.id) })
  .then( (image) => { 
    if(!image){
      return res.status(401).json('Image not found !');
    }
    res.status(200).json(image); })
  .catch( (error) => { res.status(404).json({ error: error});});
};

exports.modifyImage = (req, res, next) => {
  Images.findOneAndUpdate({_id: req.params.id}, {$set: {...req.body, _id: ObjectId(req.params.id)} })
  .then( (image) => { 
    if(!image.value ){
      return res.status(401).json('Image not found !');
    }
    res.status(201).json({ message: 'Image updated !'});
  })
  .catch(error => { res.status(400).json({ error: error });});
};

exports.deleteImage = (req, res, next) => {
  Images.findOneAndDelete({_id: ObjectId(req.params.id)})
  .then( (image) => {
    if(!image.value){
      return res.status(401).json('Image not found !');
    }
    res.status(200).json({ message: 'Image deleted !'});
  })
  .catch(error => { res.status(400).json({ error: error });});
};

exports.getAllImages = (req, res, next) => {
  Images.find({userId: ObjectId(req.query.userId)})
  .then((images) => {
      res.status(200).json(images);
    })
    .catch(error => { res.status(400).json({ error: error }); });
  };