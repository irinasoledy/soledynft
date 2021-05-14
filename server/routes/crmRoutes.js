const {Router} = require('express')
const router = Router()

const AppController = require('./../controllers/AppController')()
const AuthController = require('./../controllers/AuthController')()
const UserController = require('./../controllers/UserController')()
const HistoryController = require('./../controllers/HistoryController')()


router.get('/api/crm/init', AppController.initCRM)

router.post('/api/crm/login', AuthController.loginCRM)

router.get('/auth/crm/get', AuthController.getCRMUser)

router.post('/api/auth/login', AuthController.login)

// User endpoints
router.get('/api/users', UserController.getByType)

router.get('/api/users/history', UserController.getHistories)

router.get('/api/user/details', UserController.getUserDetails)

router.post('/api/user/details', UserController.setUserDetails)

router.post('/api/user/generals', UserController.setUserGenerals)

router.post('/api/user/passwords', UserController.setUserPasswords)

router.post('/api/user', UserController.create)

router.patch('/api/:id/user', UserController.update)

router.delete('/api/:id/user', UserController.remove)

router.patch('/api/:id/user-avatar', UserController.updateAvatar)

router.patch('/api/:id/user-status', UserController.updateStatus)

router.post('/api/user-services', UserController.assignmentServiceToUser)

router.get('/api/services', UserController.getUserServices)

router.post('/api/users/cookies', UserController.getUsersByCookies)

router.post('/api/users/assing', UserController.assingClientToUser)

router.post('/api/users/removeAssing', UserController.removeAssingClientToUser)

// History & messages endpoints
router.get('/api/:id/history', HistoryController.getClientsList)

router.get('/api/messages', HistoryController.getClientMessages)

// Notifications endpoints
router.get('/api/notifications', AppController.getNotifications)


module.exports = router
