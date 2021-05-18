const User = require('../models/user')
const userAction = require('../models/userAction')


class ActionService {

    async setOfflineUsers() {
        try {
            await User.findOneAndUpdate({online: true}, {$set: {online: false}})
            await userAction.findOneAndUpdate({online: true}, {$set: {online: false}})
        } catch (e) {
            console.log(e)
        }
        return true
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
        let action = null

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
                        status: payload.status
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

        actions.forEach(async action => {
            let dt = new Date(action.lastVisit);
            date = dt.setMinutes(dt.getMinutes());

            if (nowMinus > date) {
                action = await userAction.findOneAndUpdate(
                    {_id: action._id}, {
                        $set: {
                            online: false,
                        }
                    }, {new: true}
                )
            }
        })

        return date
    }
}

module.exports = function () {
    return new ActionService()
}
