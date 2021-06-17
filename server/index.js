const {Nuxt, Builder} = require('nuxt')
const {app, server} = require('./app')
const consola = require('consola')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const fileUpload = require('express-fileupload')
const frontRoutes = require('./routes/frontRoutes.js')
const crmRoutes = require('./routes/crmRoutes.js')
const chatRoutes = require('./routes/chatRoutes.js')
const authRoutes = require('./routes/authRoutes.js')
const store = new session.MemoryStore()
const passport = require('passport');


let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
    const nuxt = new Nuxt(config)
    const {host, port} = nuxt.options.server

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/terradigital', {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })

        if (config.dev) {
            const builder = new Builder(nuxt)
            await builder.build()
        } else {
            await nuxt.ready()
        }

        app.use(bodyParser.json())
        app.use(bodyParser.urlencoded({extended: true}));
        app.use(cookieParser())
        app.use(fileUpload())

        app.use(passport.initialize())

        app.use(session({
            secret: 'cookie_secret',
            name: 'cookie_name',
            store,
            proxy: true,
            resave: true,
            saveUninitialized: true
        }));

        app.use(frontRoutes)
        app.use(crmRoutes)
        app.use(chatRoutes)
        app.use(authRoutes)

        app.use(nuxt.render)

        server.listen(port, () => {
            consola.ready({
                message: `Server listening on http://${host}:${port}`,
                badge: true
            })
        })
    } catch (e) {
        console.log(e)
    }
}

start()
