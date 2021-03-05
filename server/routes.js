const { Router } = require('express')
const router = Router()
const authMiddleware = require('./middleware/auth')
const twilio = require('./controllers/Twilio')()
const rooms = require('./controllers/Rooms')()
const user = require('./controllers/Users')()
const conference = require('./controllers/Conference')()
const cookies = require('./controllers/Cookies')()
const auth = require('./controllers/Auth')()
const employee = require('./controllers/Admin/Employee')()
const app = require('./controllers/Admin/App')()
const client = require('./controllers/Admin/Client')()
const history = require('./controllers/Admin/History')()
const languageController = require('./controllers/Admin/LanguageController')()
const serviceController = require('./controllers/Admin/ServiceController')()
const front = require('./controllers/Front')()


router.get('/token', async (req, res) => await twilio.getToken(req, res))
router.get('/init-user-cookie', async (req, res) => await cookies.setUserCookie(req, res))

router.post('/auth/user-login', (req, res) => auth.login(req, res))

router.get('/create-room', async (req, res) => await rooms.createRoom(req, res))
router.get('/get-room', async (req, res) => await rooms.getRoom(req, res))
router.get('/get-rooms-list', async (req, res) => await rooms.getRoomsList(req, res))

router.post('/create-employee-user', (req, res) => conference.createEmployeeUser(req, res))
router.post('/get-active-room-list', (req, res) => conference.getActiveRoomList(req, res))
router.post('/change-emploee-status', (req, res) => conference.changeEmployeeStatus(req, res))
router.post('/create-message', (req, res) => conference.createMessagePost(req, res))
router.post('/get-user-messages', (req, res) => conference.getUserMessages(req, res))

router.post('/employees-by-service', (req, res) => front.getEmployeesByService(req, res))

// router.use((req, res, next) => {
//     if (1===2) {
//         next()
//     }else{
//        return res.status(403).send("Unauthorised!");
//     }
// })

// Admin Part Auth
router.post('/back/init-app', (req, res) => app.init(req, res) )

router.post('/back/employees/create', (req, res) => employee.create(req, res) )
router.post('/back/employees/remove', (req, res) => employee.remove(req, res) )
router.post('/back/employees/edit-info', (req, res) => employee.editInfo(req, res) )
router.post('/back/employees/edit-account', (req, res) => employee.editAccount(req, res) )
router.post('/back/employees/change-status', (req, res) => employee.changeStatus(req, res) )

router.post('/back/notifications/all', (req, res) => app.getNotifications(req, res))

router.post('/back/clients/all', (req, res) => client.getAll(req, res))
router.post('/back/clients/remove', (req, res) => employee.remove(req, res) )
router.post('/back/clients/edit-info', (req, res) => client.editInfo(req, res) )
router.post('/back/client/edit-account', (req, res) => client.editAccount(req, res) )

router.post('/back/history/get-clients-list', (req, res) => history.getClientsList(req, res) )
router.post('/back/history/get-messages', (req, res) => history.getClientMessages(req, res) )

// Language routes:
router.get('/back/languages/get', (req, res) => languageController.get(req, res))
router.post('/back/languages/create', (req, res) => languageController.create(req, res))
router.post('/back/languages/update', (req, res) => languageController.update(req, res))
router.post('/back/languages/remove', (req, res) => languageController.remove(req, res))
router.post('/back/languages/change-status', (req, res) => languageController.changeStatus(req, res))

// Service routes
router.post('/back/services/create', (req, res) => serviceController.create(req, res))

router.post('/back/add-service-to-employee', (req, res) => employee.addServiceToEmployee(req, res))
router.post('/back/get-services-employee', (req, res) => employee.getEmployeeServices(req, res))


router.get('/get-cookie', (req, res) => {
    res.json(req.cookies)
})

module.exports = router
