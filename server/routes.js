const { Router } = require('express')
const router = Router()
const twilio = require('./controllers/Twilio')()
const rooms = require('./controllers/Rooms')()
const user = require('./controllers/Users')()
const conference = require('./controllers/Conference')()
const cookies = require('./controllers/Cookies')()

router.get('/token', async (req, res) => await twilio.getToken(req, res))
router.get('/init-user-cookie', async (req, res) => await cookies.setUserCookie(req, res))


router.get('/create-room', async (req, res) => await rooms.createRoom(req, res))
router.get('/get-room', async (req, res) => await rooms.getRoom(req, res))
router.get('/get-rooms-list', async (req, res) => await rooms.getRoomsList(req, res))

router.post('/create-employee-user', (req, res) => conference.createEmployeeUser(req, res))
router.post('/get-active-room-list', (req, res) => conference.getActiveRoomList(req, res))
router.post('/change-emploee-status', (req, res) => conference.changeEmployeeStatus(req, res))
router.post('/create-message', (req, res) => conference.createMessagePost(req, res))
router.post('/get-user-messages', (req, res) => conference.getUserMessages(req, res))


router.get('/get-cookie', (req, res) => {
    res.json(req.cookies)
})

module.exports = router
