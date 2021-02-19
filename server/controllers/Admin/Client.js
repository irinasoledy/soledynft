const Room = require('../../models/room')
const User = require('../../models/user')
const Notification = require('../../models/notification')

class Client
{
    async getAll(req, res)
    {
        try {
            let clients = await User.find({type: 'client'})
            return res.status(200).json(clients)
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async editInfo(req, res)
    {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.body._id },
                { $set: {
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    type: req.body.type,
                } }, {new: true}
            )
            return res.status(200).json(user)
        } catch (e) {
            return res.status(505).json({message: 'Server error'})
        }
    }

    async editAccount(req, res)
    {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.body.id },
                { $set: {
                    login: req.body.data.login,
                    password: req.body.data.password,
                } }, {new: true}
            )

            return res.status(200).json(user)
        } catch (e) {
            return res.status(505).json({message: 'Server error'})
        }
    }

    async remove(req, res)
    {
        try {
            let user = await User.findOne({_id: req.body.id}).lean()

            if (user) {
                await User.deleteOne({ _id: req.body.id })
                return res.status(200).json({user, message: 'Deleted'})
            }
            return res.status(422).json({message: 'User not found'})
        } catch (e) {
            return res.status(505).json({message: 'Server error'})
        }
    }

}

module.exports = function() {
    return new Client()
}
