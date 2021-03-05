const User = require('../models/user')

class Auth {
    async login(req, res)
    {
        // const user = await User.findOne({login: req.body.login, password: req.body.password})
        const user = await User.findOne()

        const userT = await User.find()

        console.log(userT);
        
        if (user) {
            // req.session.user = user
            return res.status(200).json({user, message: 'ok'})
        }else{
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
