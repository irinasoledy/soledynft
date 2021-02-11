const { Nuxt, Builder } = require('nuxt')
const { app, server } = require('./app')
const consola = require('consola')
const mongoose = require('mongoose')
const routes = require('./routes')
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

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

        app.use(bodyParser.urlencoded({ extended: true }));
        app.use(bodyParser.json())
        app.use(cookieParser())
        app.use(routes)
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
