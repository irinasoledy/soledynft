const User = require('../models/user')
const History = require('../models/history')
const UserDetails = require('../models/userDetails')
const EmployeeService = require('../models/employeeService')

const UserService = require('../services/UserService')()
const NotificationService = require('../services/NotificationService')()
const ActionService = require('../services/ActionService')()

class UserController {

    async getByType(req, res) {
        try {
            const users = await UserService.getUsers(req.body, req.query.type)
            const actions = await UserService.getUsersActions()

            return res.status(200).json({users, actions})

        } catch (e) {
            return res.status(404).json({message: `Error UserController@getByType ${e}`})
        }
    }

    async create(req, res) {
        try {
            const createdUser = await UserService.create(req.body)

            if (!createdUser) {
                return res.status(422).json({message: 'Email already exists.'})
            }

            return res.status(200).json(createdUser)

        } catch (e) {
            return res.status(404).json({message: `Error UserController@create ${e}`})
        }
    }

    async update(req, res) {
        try {
            const user = await UserService.update(req.body, req.params.id)
            return res.status(200).json(user)
        } catch (e) {
            return res.status(505).json({message: `Error UserController@update ${e}`})
        }
    }

    async remove(req, res) {
        try {
            const user = await UserService.remove(req.params.id)
            return res.status(200).json({user, message: 'Deleted'})
        } catch (e) {
            return res.status(505).json({message: `Error UserController@remove ${e}`})
        }
    }

    async updateStatus(req, res) {
        try {
            const notificationTitle = req.body.status ? ' set up online' : ' set up offline'

            const user = await UserService.updateStatus(req.body.status, req.body.emploeeId)
            const notification = await NotificationService.create(notificationTitle, req.body.emploeeId)
            const notifications = await NotificationService.get()

            return res.status(200).json({user, notifications})
        } catch (e) {
            return res.status(505).json({message: 'Server error'})
        }
    }

    async assignmentServiceToUser(req, res) {
        try {
            await UserService.assignmentServiceToUser(req.body.services, req.body.id)
            return res.status(200).json()
        } catch (e) {
            return res.status(505).json({message: 'Server Error'})
        }
    }

    async getUserServices(req, res) {
        const services = await EmployeeService.find({employee: req.query.user})
        return res.status(200).json(services)
    }

    async getEmployee(req, res) {
        try {
            const employee = await User.find({type: 'employee'})
            return res.status(200).json(employee)
        } catch (e) {
            return res.status(505).json({message: 'Server Error'})
        }
    }

    async getEmployeeByService(req, res) {
        try {
            const services = await EmployeeService.find({service: req.query.serviceId})
                // .sort({status: 'asc'})
                // .populate('employee')
                .populate('employee', '_id name avatar status position', null, { sort: { 'status': 1 } })
                // .populate({path: 'employee', options: { sort: { status: 'desc' } } })

            return res.status(200).json(services)

        } catch (e) {
            return res.status(505).json({message: 'Server Error UserController@getEmployeesByService'})
        }
    }

    /**
     *
     *   To MOVE to Services
     *
     */
    async setUserCookie(req, res) {
        let cookie = req.cookies.userId
        let user = await User.findOne({cookies: cookie}).sort({date: 'desc'}).lean()

        if (!req.cookies.userId) {
            // cookie = this.uid()
            cookie = Date.now().toString(36)
            res.cookie('userId', cookie)

            user = await new User({
                name: "unknown",
                type: 'client',
                active: true,
                cookies: [cookie],
            }).save()
        }

        res.json({cookie: cookie, user: user})
    }

    uid() {
        return Date.now().toString(36) + Math.random().toString(36).substr(2);
    }

    async updateAvatar(req, res) {
        try {
            if (!req.files) {
                return res.status(500).send({msg: "file is not found"})
            }

            const file = req.files.file;

            file.mv(`./static/avatars/${file.name}`, async function (err) {
                if (err) {
                    return res.status(500).send({msg: "Error occured"});
                }
                const user = await User.findOneAndUpdate(
                    {_id: req.params.id}, {$set: {avatar: file.name}}, {new: true}
                )
                return res.status(200).json(user);
            })
        } catch (e) {
            return res.status(505).json({message: `Error UserController@updateAvatar ${e}`})
        }
    }

    async getUsersByCookies(req, res) {
        try {
            const {cookies, userId} = req.body
            const users = await User.find({cookies: {"$in": cookies}, type: 'client'})
            const authUsers = await User.find({logged: true, type: 'client'})

            const data = {
                similars: users,
                auths: authUsers,
            }

            return res.status(200).json(data)
        } catch (e) {
            return res.status(505).json({message: `Error UserController@getUsersByCookies ${e}`})
        }
    }

    async bookUser(req, res) {
        try {
            const {comment, comunitatePreference, email, guestId, name, phone} = req.body
            const user = await User.findOneAndUpdate(
                {_id: guestId, logged: false, type: 'client'},
                {$set: {name, email, phone, comment, comunitatePreference, lead: true}}, {new: true}
            )
            return res.status(200).json('ok')
        } catch (e) {
            return res.status(505).json({message: `Error UserController@bookUser ${e}`})
        }
    }

    async assingClientToUser(req, res) {
        try {
            const {userId, clientId} = req.body

            await ActionService.assignClientToEmployee(clientId, userId)

            return res.status(200).json('ok')
        } catch (e) {
            return res.status(505).json({message: `Error UserController@assingClientToUser ${e}`})
        }
    }

    async removeAssingClientToUser(req, res) {
        try {
            const {userId, clientId} = req.body

            await ActionService.removeAssignClientToEmployee(clientId, userId)

            return res.status(200).json('ok')
        } catch (e) {
            return res.status(505).json({message: `Error UserController@assingClientToUser ${e}`})
        }
    }

    async getUserDetails(req, res) {
        try {
            const id = req.query.id

            const user = await UserDetails.findOne({userId: id})

            return res.status(200).json({user})
        } catch (e) {
            return res.status(505).json({message: `Error UserController@getUserDetails ${e}`})
        }
    }

    async getHistories(req, res) {
        try {
            const histories = await History.find(
                {userId: req.query.id}
            ).sort({date: 'desc'}).populate('recipientId')

            return res.status(200).json(histories)
        } catch (e) {
            return res.status(505).json({message: `Error UserController@getUserDetails ${e}`})
        }
    }

    async setUserDetails(req, res) {
        try {
            const searchDetails = await UserDetails.findOne({userId: req.body.userId})
            let details = {}

            if (searchDetails) {
                console.log('if');

                let details = await UserDetails.findOneAndUpdate({_id: searchDetails._id},
                    {
                        $set: {
                            whatsapp: req.body.whatsapp,
                            messager: req.body.messager,
                            viber: req.body.viber,
                            telegram: req.body.telegram,
                            facebook: req.body.facebook,
                            instagram: req.body.instagram,
                            other: req.body.other,
                            preferred: req.body.preferred,
                            address: req.body.address,
                            city: req.body.city,
                            country: req.body.country,
                            postalCode: req.body.postalCode,
                            language: req.body.language,
                            currency: req.body.currency,
                            payment: req.body.payment,
                        }
                    }, {new: true})
            } else {
                console.log('else');
                let details = await UserDetails({
                    userId: req.body.userId,
                    whatsapp: req.body.whatsapp,
                    messager: req.body.messager,
                    viber: req.body.viber,
                    telegram: req.body.telegram,
                    facebook: req.body.facebook,
                    instagram: req.body.instagram,
                    other: req.body.other,
                    preferred: req.body.preferred,
                    address: req.body.address,
                    city: req.body.city,
                    country: req.body.country,
                    postalCode: req.body.postalCode,
                    language: req.body.language,
                    currency: req.body.currency,
                    payment: req.body.payment,
                }).save()
            }
            return res.status(200).json({details})
        } catch (e) {
            return res.status(505).json({message: `Error UserController@getUserDetails ${e}`})
        }
    }

}

module.exports = function () {
    return new UserController()
}
