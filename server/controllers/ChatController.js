const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;
const User = require('../models/user')


class ChatController {
    constructor() {
        this.accountId = 'AC5ac2a44a5c1c95efc366c14f6ca84155'
        this.apiKeyId = 'SK1d7d567d037fb395f3583360fcbd60bb'
        this.apiKeySecret = '25JSMolczKMzMFiDNLvd07vmjBBuBMid'
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
            'AC5ac2a44a5c1c95efc366c14f6ca84155',
            'SK1d7d567d037fb395f3583360fcbd60bb',
            '25JSMolczKMzMFiDNLvd07vmjBBuBMid'
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
