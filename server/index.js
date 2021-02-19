const { Nuxt, Builder } = require('nuxt')
const { app, server } = require('./app')
const consola = require('consola')
const mongoose = require('mongoose')
const routes = require('./routes')
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const store = new session.MemoryStore()
const authMiddleware = require('./middleware/auth')

let config = require('../nuxt.config.js')
config.dev = !(process.env.NODE_ENV === 'production')

async function start() {
    const nuxt = new Nuxt(config)
    const { host, port } = nuxt.options.server

    try {
        await mongoose.connect('mongodb://127.0.0.1:27017/chat', {
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
        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(cookieParser())

        app.use(session({
            secret: 'cookie_secret',
            name: 'cookie_name',
            store,
            proxy: true,
            resave: true,
            saveUninitialized: true
        }));


        app.use(routes)

        // app.use((req, res, next) => {
        //     if (req.session.user) {
        //         next()
        //     }else{
        //         return res.status(400).json('Not auth user.')
        //     }
        // })

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
