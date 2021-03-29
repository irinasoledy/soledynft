const AccessToken = require('twilio').jwt.AccessToken;
const VideoGrant = AccessToken.VideoGrant;

class Twilio {
    constructor() {
        this.accountId = 'ACf774fdacb3804858ce05f50638a9b7c4'
        this.apiKeyId = 'SKa009673cd0e1a4fabe39b6f04fd213e4'
        this.apiKeySecret = 'PCW5zOsQomxsPkrjX6Nl079irATIOMaE'
    }

    getToken(req, res) {
        const identity = req.query['identity']

        if (!identity) {
            return res.status(400).send({
                body: "An identity is needed"
            })
        }

        const token = new AccessToken(this.accountId, this.apiKeyId, this.apiKeySecret)

        token.identity = identity
        var grant = new VideoGrant()
        token.addGrant(grant);

        res.send({
            identity: identity,
            token: token.toJwt()
        })
    }
}

module.exports = function() {
    return new Twilio()
}
