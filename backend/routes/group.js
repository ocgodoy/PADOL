const express = require('express')
const router = express.Router()

const auth = require('../middleware/auth')
const groupCtrl = require('../controllers/group')
const { loadGroupsById } = require('../controllers/group')

router.post('/invite/:userId', groupCtrl.inviteGroup)
router.post('/add/:userId', groupCtrl.addGoupeUser)
router.delete('/requests/delete/:userId', groupCtrl.deleteGroupFromRequestList)
router.get('/requests/:userId', groupCtrl.getAllRequests)
router.get('/groups/:userId', groupCtrl.getAllGroups)




router.param('userId', loadGroupsById)

module.exports = router
