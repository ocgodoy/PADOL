const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');

router.get('/', userCtrl.getAllUsers);
router.post('/signup', userCtrl.signup);
router.post('/login', userCtrl.login);
router.post('/update', userCtrl.updateUser);
router.delete('/deleteAccount', userCtrl.deleteUser);
router.post('/addFriend', userCtrl.addFriend);
router.delete('/removeFriend', userCtrl.deleteFriend);
router.get('/friends', userCtrl.getAllFriends);

module.exports = router;