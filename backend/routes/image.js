const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const imageCtrl = require('../controllers/image');

router.post('/', auth, imageCtrl.postImage);
router.get('/:id', auth, imageCtrl.getOneImage);
router.put('/:id', auth, imageCtrl.modifyImage);
router.delete('/:id', auth, imageCtrl.deleteImage);

router.get('/my-library', auth, imageCtrl.getAllImages);
//router.get('/shared-with-me', auth);

module.exports = router;