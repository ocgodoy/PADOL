const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const userCtrl = require('../controllers/user');

router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.put('/:id/update', auth, userCtrl.updateUser);
router.delete('/:id', auth, userCtrl.deleteUser);
router.post('/:id/addFriend', auth, userCtrl.addFriend);
router.delete('/:id/removeFriend', auth, userCtrl.deleteFriend);
router.get('/:id/friends', auth, userCtrl.getAllFriends);

router.param('userId', userCtrl.loadUserById);

module.exports = router;