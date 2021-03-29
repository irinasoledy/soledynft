const { Router } = require('express')
const router = Router()

const ChatController = require('./../controllers/ChatController')()
const UserController = require('./../controllers/UserController')()


router.get('/api/twillio/token', ChatController.getToken)

router.post('/api/policy', ChatController.savePolicy)

router.get('/api/experts', UserController.getEmployee)

router.get('/api/experts-by-service', UserController.getEmployeeByService)

router.get('/init-user-cookie', UserController.setUserCookie)

module.exports = router
