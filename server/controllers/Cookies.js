const User = require('../models/user')

class Cookies {
    constructor(){}

    async setUserCookie(req, res){
        let cookie = req.cookies.userId
        let user = await User.findOne({ cookies: cookie }).lean()

        if (!req.cookies.userId) {
            cookie = this.uid()
            res.cookie('userId', cookie)

            user = await new User({
                name: "unknown (guest #"+ cookie + ")",
                type: 'client',
                active: true,
                cookies: cookie,
            }).save()
        }

        const data = {cookie: cookie, user: user}
        res.json(data)
    }

    uid(){
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }
}

module.exports = function() {
    return new Cookies()
}
