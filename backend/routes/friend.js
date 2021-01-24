const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const friendCtrl = require('../controllers/friend')
const { loadFriendById } = require('../controllers/friend')

router.post('/invite/:userId', friendCtrl.inviteFriend)
router.post('/add/:userId', friendCtrl.addFriend)
router.delete('/requests/delete/:userId', friendCtrl.deleteFromRequestList)
router.get('/requests/:userId', friendCtrl.getAllRequests)
router.get('/all/:userId', friendCtrl.getAllFriends)
router.get('/groups/:userId', friendCtrl.getAllGroups)




router.param('userId', loadFriendById)

module.exports = router
