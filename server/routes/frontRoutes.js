const { Router } = require('express')
const router = Router()

const ChatController = require('./../controllers/ChatController')()
const UserController = require('./../controllers/UserController')()
const CartController = require('./../controllers/CartController')()


router.get('/api/twillio/token', ChatController.getToken)

router.post('/api/policy', ChatController.savePolicy)

router.get('/api/experts', UserController.getEmployee)

router.get('/api/experts-by-service', UserController.getEmployeeByService)

router.get('/init-user-cookie', UserController.setUserCookie)

router.post('/api/user/book', UserController.bookUser)


router.patch('/api/cart', CartController.add)

router.get('/api/cart', CartController.get)

router.delete('/api/:id/cart', CartController.remove)


module.exports = router
