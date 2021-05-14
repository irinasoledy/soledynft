const {Router} = require('express')
const router = Router()

const ChatController = require('./../controllers/ChatController')()
const UserController = require('./../controllers/UserController')()
const CartController = require('./../controllers/CartController')()
const OrderController = require('./../controllers/OrderController')()

router.get('/api/twillio/token', ChatController.getToken)

router.post('/api/policy', ChatController.savePolicy)

router.get('/api/experts', UserController.getEmployee)

router.get('/api/experts-by-service', UserController.getEmployeeByService)

router.get('/init-user-cookie', UserController.setUserCookie)

router.post('/api/user/book', UserController.bookUser)

router.patch('/api/cart', CartController.add)

router.patch('/api/cart/qty', CartController.updateQty)

router.get('/api/cart', CartController.get)

router.delete('/api/:id/cart', CartController.remove)

router.post('/api/checkout', OrderController.addUserInfo)

router.patch('/api/checkout', OrderController.updateUserInfo)

router.patch('/api/checkout/payment', OrderController.updateUserPayment)

router.patch('/api/checkout/pay', OrderController.pay)

router.get('/api/orders', OrderController.getAll)

router.get('/api/order', OrderController.getOne)

router.patch('/api/order/status', OrderController.changeOrderStatus)

router.patch('/api/order/payment', OrderController.changeOrderPayment)

module.exports = router
