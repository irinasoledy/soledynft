const User = require('../../models/user')
const UserAction = require('../../models/userAction')
const Notification = require('../../models/notification')

class UserController{

    async getByType( req, res ){
        let condition = {}
        try {
            if (req.query.type) {
                condition = {type: req.query.type}
            }

            const users = await User.find(condition).sort({date: -1})
            const actions = await UserAction.find().sort({date: -1}).populate('userId')

            return res.status(200).json({users, actions})
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async create(req, res){
        try {
            let user = await User.findOne({email: req.body.email}).lean()

            if (!user) {
                user = await new User({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    login: req.body.login,
                    password: req.body.password,
                    type: req.body.role,
                    active: false,
                }).save()

                return res.status(200).json(user)
            }
            return res.status(422).json({message: 'validation error'})
        } catch (e) {
            return res.status(404).json({message: 'error'})
        }
    }

    async update(req, res)
    {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.params.id },
                { $set: req.body },
                { new: true }
            )
            return res.status(200).json(user)
        } catch (e) {
            return res.status(505).json({message: 'Server error'})
        }
    }

    async updateAvatar(req, res)
    {
        try {
            if (!req.files) {
                return res.status(500).send({ msg: "file is not found" })
            }

            const file = req.files.file;

            file.mv(`./static/avatars/${file.name}`, async function (err) {
                if (err) {
                    return res.status(500).send({ msg: "Error occured" });
                }
                const user = await User.findOneAndUpdate(
                    { _id: req.params.id },{ $set: { avatar: file.name } }, {new: true}
                )
                return res.status(200).json(user);
            });
        } catch (e) {
            return res.status(505).json({message: 'Server error'})
        }
    }

    async updateStatus(req, res)
    {
        try {
            const user = await User.findOneAndUpdate(
                { _id: req.body.emploeeId },
                { $set: { status: req.body.status } },
                { new: true }
            )

            // const user = await User.findOne({_id: req.body.emploeeId})
            const status = req.body.status ? ' set up online' : ' set up offline'

            const notification = await new Notification({
                title : user.name + status,
                user : user._id,
            }).save()

            const notifications = await Notification.find().sort({date: -1}).populate('user')

            const data = {
                user: user,
                notifications: notifications
            }

            return res.status(200).json(data)
        } catch (e) {
            return res.status(505).json({message: 'Server error'})
        }
    }

    async remove(req, res){
        try {
            const user = await User.findOne({_id: req.params.id}).lean()

            if (user) {
                await User.deleteOne({ _id: user._id })
                return res.status(200).json({user, message: 'Deleted'})
            }
            return res.status(422).json({message: 'User not found'})
        } catch (e) {
            return res.status(505).json({message: 'Server error'})
        }
    }




}

module.exports = function() {
    return new UserController()
}
