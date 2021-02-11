const Room = require('../models/room')
const User = require('../models/user')
const History = require('../models/history')
const Message = require('../models/message')

class Conference {
    constructor() {}

    // create employee
    async createEmployeeUser(req, res)
    {
        let user = await User.findOne({name: req.body.name}).lean()

        if (!user) {
            user = await new User({
                name: req.body.name,
                type: 'employee',
                active: true
            }).save()
        }

        const room = await new Room({
            name: this.uid(),
            employee: user.id ?? user._id,
        }).save()

        const ret = {
            user : user,
            room : room,
        }

        return res.json(ret)
    }

    // create client
    async createClientUser(roomId, userId)
    {
        const user = await User.findOne({ _id: userId }).lean()
        const room = await Room.findOneAndUpdate(
            { _id: roomId },{ $set: { client: userId } },{ new: true }
        )

        console.log(user, userId);

        return {
            room : room,
            user : user
        }
    }

    // get active rooms
    async getActiveRoomList(req, res)
    {
        const rooms = await Room.find({ employee: { $ne: null }, active: true }).populate('employee')
        return res.json(rooms)
    }

    // change employee status
    async changeEmployeeStatus(req, res)
    {
        await Room.findOneAndUpdate(
            { _id: req.body.roomId },{ $set: { active: req.body.status } }, {new: true}
        )

        const rooms = await Room.find({ employee: { $ne: null }, active: true }).populate('employee')

        return res.json(rooms)
    }

    // create and send message
    async createMessagePost(req, res)
    {
        const message = await new Message({
           message: req.body.text,
           employee: req.body.employeeId,
           client: req.body.clientId,
           room: req.body.roomId,
           sendBy: req.body.sendBy
       }).save()

       return res.json(message)
    }

    async getUserMessages(req, res)
    {
        const messages = await Message.find({client: req.body.userId}).populate('employee').populate('client')
        return res.json(messages)
    }

    uid()
    {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

     parseMessage(name, text, id)
     {
         { name, text, id }
     }
}

module.exports = function() {
    return new Conference()
}
