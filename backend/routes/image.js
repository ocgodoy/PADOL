const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const imageCtrl = require('../controllers/image');

router.post('/:userId',auth,imageCtrl.createImage);
router.get('/:userId/:imageId',auth,imageCtrl.getOneImage);
router.put('/:userId/:imageId',auth,imageCtrl.modifyImage);
router.delete('/:userId/:imageId',auth, imageCtrl.deleteImage);

module.exports = router;