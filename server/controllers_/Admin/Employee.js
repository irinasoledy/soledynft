const Room = require('../../models/room')
const User = require('../../models/user')
const EmployeeService = require('../../models/employeeService')
const Notification = require('../../models/notification')

class Employee
{
    async create(req, res)
    {
        try {
            let user = await User.findOne({email: req.body.email}).lean()

            if (!user) {
                user = await new User({
                    name: req.body.name,
                    email: req.body.email,
                    phone: req.body.phone,
                    login: req.body.login,
                    password: req.body.password,
                    type: 'employee',
                    active: false,
                }).save()

                return res.status(200).json(user)
            }
            return res.status(422).json({message: 'validation error'})
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

    async changeStatus(req, res)
    {
        try {
            await User.findOneAndUpdate(
                { _id: req.body.emploeeId },{ $set: { status: req.body.status } }, {new: true}
            )

            const room = await new Room({
                employee: req.body.emploeeId,
                active: true,
                name: this.uid()
            })

            const user = await User.findOne({_id: req.body.emploeeId})
            const status = req.body.status ? ' set up online' : ' set up offline'

            const notification = await new Notification({
                title : user.name + status,
                user : user._id,
            }).save()

            const notifications = await Notification.find().sort({date: -1}).populate('user')

            const data = {
                room: room,
                user: user,
                notifications: notifications
            }

            return res.status(200).json(data)
        } catch (e) {
            return res.status(505).json({message: 'Server error'})
        }
    }

    async addServiceToEmployee(req, res)
    {
        try {
            const services = req.body.data
            await EmployeeService.deleteMany({employee: req.body.employeeId})

            await services.forEach(service => {
                new EmployeeService({
                    employee: req.body.employeeId,
                    service: service,
                }).save()
            })

            const allServices = await EmployeeService.find({employee: req.body.employeeId})

            return res.status(200).json(allServices)
        } catch (e) {
            return res.status(505).json({message: 'Server Error'})
        }
    }

    async getEmployeeServices(req, res)
    {
        const services = await EmployeeService.find({employee: req.body.employeeId})
        return res.status(200).json(services)
    }

    async addAvatar(req, res)
    {
        if (!req.files) {
            return res.status(500).send({ msg: "file is not found" })
        }
        // accessing the file
        const myFile = req.files.file;

        //  mv() method places the file inside public directory
        myFile.mv(`./static/avatars/${myFile.name}`, async function (err) {
            if (err) {
                console.log(err)
                return res.status(500).send({ msg: "Error occured" });
            }
            const user = await User.findOneAndUpdate(
                { _id: req.body.id },{ $set: { avatar: myFile.name } }, {new: true}
            )
            // returing the response with file path and name
            return res.json(user);
        });
    }

    uid()
    {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

}

module.exports = function() {
    return new Employee()
}
