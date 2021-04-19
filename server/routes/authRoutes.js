const { Router } = require('express')
const router = Router()
const { check } = require('express-validator')


const AuthController = require('./../controllers/AuthController')()


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

router.get('/auth/facebook', AuthController.authFacebook)
router.get('/auth/google', AuthController.authGoogle)



module.exports = router
