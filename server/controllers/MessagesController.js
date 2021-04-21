const User = require('../models/user')
const Message = require('../models/message')

class MessagesController {

    async create(req, res) {
        try {
            const message = await new Message({
                sender: req.body.senderId,
                recepient: req.body.recepientId,
                message: req.body.message,
                employee: req.body.employeeId,
                client: req.body.clientId,
                sendBy: req.body.sendBy,
                session: req.body.session,
                callAlert: req.body.callAlert,
           })
           .save()
           .then(m => m.populate('client').execPopulate())
           .then(m => m.populate('employee').execPopulate())
           .then(m => m.populate('sender').execPopulate())
           .then(m => m.populate('recepient').execPopulate())

           return res.status(200).json(message)

        } catch (e) {
            return res.status(400).json({message: 'error' + e})
        }
    }

    async get(req, res) {
        try {
            const session1 = req.query.userId + req.query.interlocutorId
            const session2 = req.query.interlocutorId + req.query.userId

            const messages = await Message.find(
                { $or : [{session: session1}, {session: session2}] }
            ).populate('employee').populate('client').populate('sender').populate('recepient')

           return res.status(200).json(messages)
        } catch (e) {
            return res.status(400).json({message: 'error' + e})
        }
    }

    async update(req, res) {
        // try {
        //     const session1 = req.body.userId + req.body.interlocutorId
        //     const session2 = req.body.interlocutorId + req.body.userId
        //
        //     const message = await Message.findOneAndUpdate(
        //         { $or : [{session: session1}, {session: session2}] },
        //         { $set: { readed: true } },
        //         { new: true }
        //     )
        //
        //     const messages = await Message.find(
        //         { readed : false, $or : [{employee: req.body.userId }, { client: req.body.userId}] }
        //     ).populate('employee').populate('client')
        //
        //    return res.status(200).json({message, messages})
        //
        // } catch (e) {
        //     return res.status(400).json({message: 'error' + e})
        // }
    }

    async setAsReaded(req, res) {
        try {
            const session1 = req.body.userId + req.body.interlocutorId
            const session2 = req.body.interlocutorId + req.body.userId

            const message = await Message.updateMany(
                 { $or : [{session: session1}, {session: session2}] },
                 { readed: true })

            const unreadedMessages = await Message.find(
                { readed: false, recepient: req.body.userId
                    // $or : [
                    // { client: req.body.userId },
                    // { employee: req.body.userId }]
                }
            ).populate('employee').populate('client').populate('sender').populate('recepient')

            const parsedUnreadedMessages = unreadedMessages.map(message => {
                return {
                    from: message.sender._id,
                    message: message,
                    to: message.recepient._id
                }
            })

            const messages = await Message.find(
                    { $or : [{session: session1}, {session: session2}] }
                ).populate('employee').populate('client').populate('sender').populate('recepient')

            return res.status(200).json({message, messages, parsedUnreadedMessages})
        } catch (e) {
            return res.status(500).json({ message: 'error' + e })
        }
    }

    async getUnreaded(req, res) {
        try {
            const messages = await Message.find(
                {
                    readed: false, recepient: req.query.user
                    // $or :
                    // [
                    //     { client: req.query.user },
                    //     { employee: req.query.user }
                    // ]
                }
            ).populate('employee').populate('client').populate('sender').populate('recepient')

            const parsedMessages = messages.map(message => {
                return {
                    from: message.sender._id,
                    message: message,
                    to: message.recepient._id
                }
            })

           return res.status(200).json(parsedMessages)
        } catch (e) {
            return res.status(500).json({message: 'error' + e})
        }
    }

}

module.exports = function() {
    return new MessagesController()
}
