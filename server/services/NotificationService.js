const Notification = require('../models/notification')

class NotificationService{

    async create(title, userId){
        const notification = await new Notification({
            title: title,
            user : userId,
        }).save()

        return notification
    }

    async get(){
        const notifications = await Notification.find().sort({date: -1}).populate('user')
        return notifications
    }

}

module.exports = function() {
    return new NotificationService()
}
