const AuthService = require('../services/AuthService')()
const User = require('../models/user')
const { validationResult } = require('express-validator')
const jwt = require('jsonwebtoken')


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
}

module.exports = function() {
    return new AuthController()
}
