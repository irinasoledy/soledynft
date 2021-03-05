const User = require('../models/user')

class Auth {
    async login(req, res)
    {
        // const user = await User.findOne({login: req.body.login, password: req.body.password})
        let user = await User.findOne()

        if (user) {
            // req.session.user = user
            return res.status(200).json({user, message: 'ok'})
        }else{
            user = await new User({
                name: 'Tudor',
                email: 'email@email.com',
                phone: '04902394023',
                login: 'manager10',
                password: 'passw',
                type: 'employee',
                active: false,
            }).save()
            return res.status(200).json({user: false, message: 'error'})
        }
    }

    auth(user)
    {

    }
}

module.exports = function() {
    return new Auth()
}
