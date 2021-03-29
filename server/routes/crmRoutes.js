const { Router } = require('express')
const router = Router()

const AppController = require('./../controllers/AppController')()
const AuthController = require('./../controllers/AuthController')()
const UserController = require('./../controllers/UserController')()
const HistoryController = require('./../controllers/HistoryController')()


router.get('/api/crm/init', AppController.initCRM)

router.post('/api/crm/login', AuthController.loginCRM)

// User endpoints
router.get('/api/users', UserController.getByType)

router.post('/api/user', UserController.create)

router.patch('/api/:id/user', UserController.update)

router.delete('/api/:id/user', UserController.remove)

router.patch('/api/:id/user-avatar', UserController.updateAvatar)

router.patch('/api/:id/user-status', UserController.updateStatus)

router.post('/api/user-services', UserController.assignmentServiceToUser)

router.get('/api/services', UserController.getUserServices)

// History & messages endpoints
router.get('/api/:id/history', HistoryController.getClientsList)

router.get('/api/messages', HistoryController.getClientMessages)

// Notifications endpoints
router.get('/api/notifications', AppController.getNotifications)


module.exports = router
