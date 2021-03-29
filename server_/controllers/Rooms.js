const Room = require('../models/room')

class Rooms {
    constructor() {}

    createRoom(req, res) {
        const room = new Room({
            name: req.body.title
        })

        room.save()
    }
    getRoom(req, res) {
        const room = new Room.findById(req.body.id).lean()

        res.json(room)
    }
    async getRoomsList(req, res) {
        const rooms = await Room.find({}).lean()

        res.json(rooms)
    }
}

module.exports = function() {
    return new Rooms()
}
