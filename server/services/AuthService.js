const User = require('../models/user')

class AuthService {

    async loginCRM(login, password) {
        const user = await User.findOne({login: login, password: password, type: 'employee'})
        return user
    }
}

module.exports = function() {
    return new AuthService()
}
