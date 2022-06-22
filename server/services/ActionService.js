const User = require('../models/user')
const userAction = require('../models/userAction')


class ActionService {

    async setOfflineUsers() {
        try {
            await User.updateMany({online: true}, {$set: {online: false}})

            await userAction.updateMany({online: true}, {$set: {online: false}})
        } catch (e) {
            console.log(e)
        }
        return true
    }

    async getUsersList() {
        const users = await User.find({type: 'employee'}).sort({online: -1})
        const actions = await userAction.find().sort({lastVisit: 'desc'}).populate('userId').populate('assigedManager')

        return {users, actions}
    }

    async getOnlineUsers() {
        const users = await User.find({online: true})
        return users
    }

    async assignClientToEmployee(clientId, employeeId) {
        const action = await userAction.findOne({userId: clientId})

        if (!action.assigedManager) {
            await userAction.findOneAndUpdate(
                {_id: action._id}, {
                    $set: {
                        assigedManager: employeeId
                    }
                })
        }
    }

    async removeAssignClientToEmployee(clientId, employeeId) {
        const action = await userAction.findOne({userId: clientId})

        if (action.assigedManager) {
            await userAction.findOneAndUpdate(
                {_id: action._id}, {
                    $set: {
                        assigedManager: null
                    }
                })
        }
    }

    async addUser(payload) {
        const findAction = await userAction.findOne({userId: payload.userId})
        const findUser = await User.findOne({_id: payload.userId})
        let sessionDate = findUser.sessionDate
        let sessionDuration = findUser.sessionDuration
        let action = null

        if (!findUser.online) {
            sessionDate = Date.now()
            sessionDuration = 0
        }

        await User.findOneAndUpdate(
            {_id: payload.userId}, {$set: {sessionDate: sessionDate, sessionDuration: sessionDuration}}
        )

        if (findAction) {
            const visitsQty = findAction.visitsQty + parseInt(payload.visits)
            const visitsMin = parseInt(findAction.visitsMin) + parseInt(payload.visitsMin)

            action = await userAction.findOneAndUpdate(
                {_id: findAction._id}, {
                    $set: {
                        online: payload.online,
                        logged: payload.logged,
                        lastVisit: payload.lastVisit,
                        currentPage: payload.currentPage,
                        visitsQty: visitsQty,
                        visitsMin: visitsMin,
                        status: payload.status,
                        sessionDate: payload.sessionDate
                    }
                }, {new: true}
            )
        } else {
            action = await new userAction({
                userId: payload.userId,
                online: payload.online,
                logged: payload.logged,
                lastVisit: payload.lastVisit,
                currentPage: payload.currentPage,
                visitsQty: 1,
                visitsMin: payload.visitsMin,
                status: payload.status
            }).save()
        }
        return action
    }

    async getAllActions() {
        this.checkUsersStatus()

        const actions = await userAction.find().sort({lastVisit: 'desc'}).populate('userId').populate('assigedManager')
        return actions
    }

    async checkUsersStatus() {
        let date = ''
        let action = null
        let now = new Date()
        let nowMinus = now.setMinutes(now.getMinutes() - 2);
        const actions = await userAction.find({online: true})
        return date
    }
}

module.exports = function () {
    return new ActionService()
}
