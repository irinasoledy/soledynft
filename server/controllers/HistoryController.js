const Room = require('../models/room')
const User = require('../models/user')
const Message = require('../models/message')

class HistoryController {
    async getClientsList(req, res) {
        try {
            const messages = await Message.find({employee: req.params.id})
            let clientsId = []

            await messages.forEach((message) => {
                clientsId.push(message.client)
            })

            const users = await User.find({'_id': {$in: clientsId}})

            return res.status(200).json(users)
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async getClientMessages(req, res) {
        try {
            const messages = await Message.find({client: req.query.id}).populate('employee').populate('client')
            return res.status(200).json(messages)
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

}

module.exports = function () {
    return new HistoryController()
}
