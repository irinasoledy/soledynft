const User = require('../models/user')

module.exports = {
    auth(req, res, next) {
        if (req.session.user) {
            next()
        } else {
            return res.status(400).json('Not auth user.')
        }
    }
}
