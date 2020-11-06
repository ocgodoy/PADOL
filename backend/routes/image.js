const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const imageCtrl = require('../controllers/image');

router.post('/',auth,imageCtrl.createImage);
router.get('/:id',auth,imageCtrl.getOneImage);
router.put('/:id',auth,imageCtrl.modifyImage);
routeur.delete('/:id',auth, imageCtrl.deleteImage);

module.exports = router;