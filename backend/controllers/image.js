const Image = require('../models/Image');

exports.createImage = (req, res, next) => {
    delete req.body._id;
    const image = new Image({
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

exports.getOneImage = (req, res, next) => {
  Image.findOne({
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

exports.modifyImage = (req, res, next) => {
  const image = new Image({
    _id: req.params.id,
    caption: req.body.caption,
    url: req.body.url,
    userId: req.body.userId,
  });
  Image.updateOne({_id: req.params.id}, image).then(
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

exports.deleteImage = (req, res, next) => {
  Image.deleteOne({_id: req.params.id}).then(
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

exports.getAllStuff = (req, res, next) => {
  Image.find().then(
    (images) => {
      res.status(200).json(images);
    }
  ).catch(
    (error) => {
      res.status(400).json({ error: error });
    }
  );
};