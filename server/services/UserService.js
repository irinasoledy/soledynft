const User = require('../models/user')
const UserAction = require('../models/userAction')
const Notification = require('../models/notification')
const EmployeeService = require('../models/employeeService')
const bcrypt = require('bcryptjs')

class UserService{

    async getUsers(userData, type) {
        let condition = {}
        if (type) {
            condition = { type: type }
        }

        const users = await User.find(condition).sort({date: -1})

        return users
    }

    async getUsersActions() {
        const actions = await UserAction.find().sort({lastVisit: 'desc'}).populate('userId').populate('assigedManager')

        return actions
    }

    async create(userData) {
        const {name, email, phone, login, password, role} = userData
        let user = await User.findOne({email: email})
        const hashPassword = bcrypt.hashSync(password, 7)
        const ecodedPassord = Buffer.from(password).toString('base64')

        if (user && user.email) {
            return false
        }

        user = await new User({
            name: name,
            email: email,
            phone: phone,
            login: login,
            password: hashPassword,
            hash: ecodedPassord,
            type: role,
            active: false,
        }).save()

        return user
    }

    async update(userData, id) {
        const {name, email, phone, password, logged, type, login, position} = userData
        const hashPassword = bcrypt.hashSync(password, 7)
        const ecodedPassord = Buffer.from(password).toString('base64')

        const user = await User.findOneAndUpdate(
            { _id: id },
            { $set: {
                login,
                name,
                email,
                phone,
                type,
                position,
                password: hashPassword,
                hash: ecodedPassord,
                logged: logged,
            } },
            { new: true }
        )

        return user
    }

    async remove(id){
        const user = await User.findOne({_id: id})
        await User.deleteOne({ _id: user._id })
        await EmployeeService.deleteMany({employee: user._id})
        await UserAction.updateMany({ assigedManager: user._id }, {assigedManager: null})

        return user
    }

    async updateStatus(status, id){
            const user = await User.findOneAndUpdate(
                { _id: id },
                { $set: { status: status } },
                { new: true }
            )

            return user
    }

    async assignmentServiceToUser(services, id){
        await EmployeeService.deleteMany({employee: id})

        await services.forEach(async service => {
            let serv = await new EmployeeService({
                employee: id,
                service: service,
            }).save()
        })
    }


    async getUserServices(req, res){
        const services = await EmployeeService.find({employee: req.query.id})
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

}

module.exports = function() {
    return new UserService()
}
