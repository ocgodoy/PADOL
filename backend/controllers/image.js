const Image = require('../models/Image');

exports.createImage = (req, res, next) => {
    const image = new Image({
      url: req.body.url
    });
    thing.save().then(
      () => {
        res.status(201).json({
          message: 'Post saved successfully!'
        });
      }
    ).catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };