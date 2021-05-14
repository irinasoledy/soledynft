const User = require('../models/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const generateAccessToken = (id, login) => {
    const payload = {id, login}
    return jwt.sign(payload, 'secret', {expiresIn: "24h"})
}

const generateAccessTokenCRM = (id, login) => {
    const payload = {id, login}
    return jwt.sign(payload, 'secretCRM', {expiresIn: "24h"})
}

class AuthService {

    async register(data, type) {
        const {guestId, cookie, name, email, phone, password} = data
        const hashPassword = bcrypt.hashSync(password, 7)
        const ecodedPassord = Buffer.from(password).toString('base64')
        const cantidateAuth = await User.findOne({email, logged: true})
        const cantidateCookie = await User.findOne({cookies: cookie, logged: true})

        if (cantidateAuth) {
            return {statusCode: 400, message: 'The user with such an email already exists'}
        }

        if (cantidateCookie) {
            const user = await new User({
                name,
                email,
                phone,
                cookies: [cookie],
                password: hashPassword,
                hash: ecodedPassord,
                logged: true,
                type
            }).save()
        } else {
            let user = await User.findOne({_id: guestId})
            if ((cookie !== null) && (!user.cookies.includes(cookie))) {
                user = await User.findOneAndUpdate(
                    {_id: guestId},
                    {
                        $set: {name, email, phone, password: hashPassword, hash: ecodedPassord, logged: true},
                        $push: {cookies: cookie}
                    },
                    {new: true}
                )
            } else {
                user = await User.findOneAndUpdate(
                    {_id: guestId},
                    {
                        $set: {name, email, phone, password: hashPassword, hash: ecodedPassord, logged: true},
                    },
                    {new: true}
                )
            }

        }

        return {statusCode: 200, message: 'Success register!'}
    }

    async login(data) {
        const {email, password, cookie} = data

        const user = await User.findOne({email, type: 'client'})

        if (!user) {
            return {statusCode: 400, message: 'User not exist!'}
        }
        const validPassword = bcrypt.compareSync(password, user.password)
        if (!validPassword) {
            return {statusCode: 400, message: 'User not exist!'}
        }

        if (!user.cookies.includes(cookie) && cookie) {
            await User.findOneAndUpdate(
                {_id: user},
                {
                    $push: {cookies: cookie}
                },
                {new: true}
            )
        }

        const token = generateAccessToken(user._id, user.email)

        return {statusCode: 200, message: 'Success Sign In', token}
    }

    async getAuth(token) {

    }

    async loginCRM(data) {
        const {login, password} = data

        const user = await User.findOne({login, type: {$ne: 'client'}})

        if (!user) {
            return {statusCode: 400, message: 'User not exist login!'}
        }

        const validPassword = bcrypt.compareSync(password, user.password)

        if (!validPassword) {
            return {statusCode: 400, message: 'User not exist pass!'}
        }

        const token = generateAccessTokenCRM(user._id, user.login)

        return {statusCode: 200, message: 'Success Sign In', token}
    }

}

module.exports = function () {
    return new AuthService()
}
