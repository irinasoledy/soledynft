const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const User = require('../models/user')


class ChatController {
    constructor() {
        this.accountId = 'ACf774fdacb3804858ce05f50638a9b7c4'
        this.apiKeyId = 'SKa009673cd0e1a4fabe39b6f04fd213e4'
        this.apiKeySecret = 'PCW5zOsQomxsPkrjX6Nl079irATIOMaE'
    }

    async savePolicy(req, res) {
        const user = await User.findOneAndUpdate(
            {_id: req.body.userId}, {$set: {policy: [req.body.policies]}}, {new: true}
        )

        return res.json(user)
    }

    async getToken(req, res) {
        const identity = req.query['identity']
        const grant = new VideoGrant()

        if (!identity) {
            return res.status(400).send({
                body: "An identity is needed"
            })
        }

        // const token = await new AccessToken(process.env.accountId, process.env.apiKeyId, process.env.apiKeySecret)
        const token = await new AccessToken(
            'ACf774fdacb3804858ce05f50638a9b7c4',
            'SKa009673cd0e1a4fabe39b6f04fd213e4',
            'PCW5zOsQomxsPkrjX6Nl079irATIOMaE'
        )

        token.identity = identity
        token.addGrant(grant);

        res.send({
            identity: identity,
            token: token.toJwt()
        })
    }
}

module.exports = function () {
    return new ChatController()
}
