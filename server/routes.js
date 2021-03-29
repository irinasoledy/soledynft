const { Router } = require('express')
const router = Router()


const twilio = require('./controllers/Twilio')()
const rooms = require('./controllers/Rooms')()
const user = require('./controllers/Users')()
const conference = require('./controllers/Conference')()
const cookies = require('./controllers/Cookies')()
const employee = require('./controllers/Admin/Employee')()
const front = require('./controllers/Front')()

router.post('/create-employee-user', (req, res) => conference.createEmployeeUser(req, res))

router.post('/get-active-room-list', (req, res) => conference.getActiveRoomList(req, res))
router.post('/change-emploee-status', (req, res) => conference.changeEmployeeStatus(req, res))
router.post('/create-message', (req, res) => conference.createMessagePost(req, res))
router.post('/get-user-messages', (req, res) => conference.getUserMessages(req, res))

router.post('/employees-by-service', (req, res) => front.getEmployeesByService(req, res))
// router.get('/api/v1/experts', (req, res) => front.getEmployee(req, res))


// router.get('/get-cookie', (req, res) => {
//     res.json(req.cookies)
// })

module.exports = router
