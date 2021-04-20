const AuthService = require('../services/AuthService')()
const User = require('../models/user')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')


class AuthController {

    async register(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(404).json({message: 'Register error', errors})
            }

            const {statusCode, message} = await AuthService.register(req.body, 'client')

            return res.status(statusCode).json({message})

        } catch (e) {
            return res.status(400).json({message: `Register Error ${e}`})
        }
    }

    async login(req, res) {
        try {
            const errors = validationResult(req)

            if (!errors.isEmpty()) {
                return res.status(400).json({message: 'Valiadtion Error', errors})
            }

            const { statusCode, message, token } = await AuthService.login(req.body)

            return res.status(statusCode).json({message, token})
        } catch (e) {
            return res.status(400).json({message: `Error AuthController@login ${e}`})
        }
    }

    async getUser(req, res) {
        try {
            if (req.headers && req.headers.authorization) {
                const authorization = req.headers.authorization.split(' ')[1]
                let decoded = null
                try {
                    decoded = jwt.verify(authorization, 'secret')
                } catch (e) {
                    return res.status(401).json({message: 'unauthorized'})
                }
                const userId = decoded.id
                const user = await User.findOne({_id: userId})
                return res.status(200).json({message: 'authorized', user})
            }
            return res.status(500).json('server error');
        } catch (e) {
            return res.status(400).json({message: `Error AuthController@getUser ${e}`})
        }
    }

    async loginCRM(req, res) {
        try {
            const { statusCode, message, token } = await AuthService.loginCRM(req.body)

            return res.status(statusCode).json({message, token})
        } catch (e) {
            return res.status(400).json({message: `Error AuthController@loginCRM ${e}`})
        }
    }

    async getCRMUser(req, res) {
        try {
            if (req.headers && req.headers.authorization) {
                const authorization = req.headers.authorization.split(' ')[1]
                let decoded = null
                try {
                    decoded = jwt.verify(authorization, 'secretCRM')
                } catch (e) {
                    return res.status(401).json({message: 'unauthorized'})
                }
                const userId = decoded.id
                const user = await User.findOne({_id: userId})
                return res.status(200).json({message: 'authorized', user})
            }
            return res.status(500).json('server error');
        } catch (e) {
            return res.status(400).json({message: `Error AuthController@getCRMUser ${e}`})
        }
    }

    async authFacebook(req, res) {
        const { provider, code, guest } = req.body

        const findUser = await User.findOne({facebookAuth: code})

        console.log(code, findUser);

        if (!findUser) { // Register
            const uniqueStr = Date.now().toString(36)
            const name = `FB ${uniqueStr}`
            const email = `FB_${uniqueStr}@docrom.info`
            const password = uniqueStr
            const hashPassword = bcrypt.hashSync(password, 7)
            const ecodedPassord = Buffer.from(password).toString('base64')
            const type = 'client'
            const cookies = guest.cookies

            const user = await new User({name, email, cookies, facebookAuth: code, password: hashPassword, hash: ecodedPassord, type}).save()

            return res.status(200).json(user)
        }

        return res.status(200).json(findUser)
    }

    async authGoogle(req, res) {
        console.log(req);
        return res.json(req.query)
    }
}

module.exports = function() {
    return new AuthController()
}
