const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const imageCtrl = require('../controllers/post');

router.post('/:userId', auth, imageCtrl.createPost);
router.get('/:userId/:imageId', auth, imageCtrl.getOnePost);
router.get('/:userId/', auth, imageCtrl.getAllPosts);
router.put('/:userId/:imageId', auth, imageCtrl.editPost);
router.delete('/:userId/:imageId', auth, imageCtrl.deletePost);
router.post('/:userId', auth, imageCtrl.updateViews);

module.exports = router;