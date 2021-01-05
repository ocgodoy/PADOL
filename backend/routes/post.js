const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const multer = require('../middleware/multer-config');

const postCtrl = require('../controllers/post')
const { loadUserById } = require('../controllers/user')

router.post('/:userId', postCtrl.createPost)
// router.get('/:userId/:imageId', auth, postCtrl.getOnePost);
router.get('/all', postCtrl.getAllPosts)
router.get('/:postId', postCtrl.getPost)
router.get('/photo/:postId', postCtrl.getPhotoFromPost)
router.put('/comment', postCtrl.commentPost)
// router.put('/:userId/:imageId', auth, postCtrl.editPost);
//router.put('/delete/:userId', auth, postCtrl.deletePost);
router.put('/delete', postCtrl.deletePost);
router.put('/like/:postId/', postCtrl.likePost)
router.param('postId', postCtrl.loadPostById)
router.param('userId', loadUserById)

module.exports = router
