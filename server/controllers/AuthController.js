const AuthService = require('../services/AuthService')()

class AuthController {

    async loginCRM(req, res) {
        try {
            const user = await AuthService.loginCRM(req.body.login, req.body.password)

            if (!user) {
                return res.status(200).json({user: false, message: 'Error login!'})
            }
            req.session.user = user
            return res.status(200).json({user, message: 'Succes login!'})
        } catch (e) {
            return res.status(404).json({message: `Eror AuthController@loginCRM ${e}`})
        }
    }

}

module.exports = function() {
    return new AuthController()
}
