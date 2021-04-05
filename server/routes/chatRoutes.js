const { Router } = require('express')
const router = Router()

const MessagesController = require('./../controllers/MessagesController')()


router.get('/api/messages/unreaded', MessagesController.getUnreaded)

router.patch('/api/messages/readed', MessagesController.setAsReaded)


router.get('/api/message', MessagesController.get)

router.post('/api/message', MessagesController.create)

router.patch('/api/message', MessagesController.update)

module.exports = router
