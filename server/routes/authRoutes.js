const {Router} = require('express')
const router = Router()
const {check} = require('express-validator')

const AuthController = require('./../controllers/AuthController')()
const UserController = require('./../controllers/UserController')()

router.post('/auth/register',
    [
        check('email', 'email is empty').notEmpty(),
        check('name', 'name is empty').notEmpty(),
        check('password', 'password is empty').isLength({min: 4, max: 15})
    ],
    AuthController.register)

router.post('/auth/login',
    [
        check('email', 'email is empty').notEmpty(),
        check('password', 'password is empty').notEmpty()
    ],
    AuthController.login)

router.get('/auth/user', AuthController.getUser)

router.post('/auth/social/facebook', AuthController.authFacebook)
router.post('/auth/social/google', AuthController.authGoogle)

router.post('/user/pong', UserController.setUserOnline)


module.exports = router
