const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const postCtrl = require('../controllers/post');
//const {loadUserById} = require('../controllers/user');

router.post('/', postCtrl.createPost);
//router.get('/:userId/:imageId', auth, postCtrl.getOnePost);
router.get('/all', postCtrl.getAllPosts);
router.get('/', postCtrl.getFeedPosts);
router.get('/photo/:postId', postCtrl.getPhotoPost);
//router.put('/:userId/:imageId', auth, postCtrl.editPost);
//router.delete('/:userId/:imageId', auth, postCtrl.deletePost);

router.param('postId', postCtrl.loadPostById);
//router.param('userId', loadUserById);

module.exports = router;
