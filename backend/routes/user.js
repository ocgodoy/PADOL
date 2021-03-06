const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const userCtrl = require('../controllers/user')

router.post('/signup', userCtrl.signup)
router.post('/login', userCtrl.login)
router.get('/:userId/profile', auth, userCtrl.getUser)
router.post('/user/edit/:userId', userCtrl.updateUser)
router.get('/all', userCtrl.allUsers)
router.put('/delete/:userId', userCtrl.deleteUser)
router.post('/:userId/addFriend', auth, userCtrl.addFriend)
router.delete('/:userId/removeFriend', auth, userCtrl.deleteFriend)
router.get('/:userId/friends', auth, userCtrl.getAllFriends)

router.param('userId', userCtrl.loadUserById)

module.exports = router
