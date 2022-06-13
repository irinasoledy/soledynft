const colors = require('vuetify/es5/util/colors').default

module.exports = {
    telemetry: false,
    /*
    ** Headers of the page
    */
    head: {
        titleTemplate: '%s',
        title: 'soledynft.shop',
        meta: [
            {charset: 'utf-8'},
            {name: 'viewport', content: 'width=device-width, initial-scale=1'},
            {hid: 'description', name: 'description', content: 'soledy.com'},
            // {name: 'facebook-domain-verification', content: 'zhd8ab5sq0dcog9zbvmxy74zgsdaim'}
        ],
        link: [
            {rel: 'icon', type: 'image/x-icon', href: 'https://soledynft.shop/images/favicon.png'},
            {
                rel: "stylesheet",
                href: "https://fonts.googleapis.com/css2?family=Roboto&display=swap",
            },
        ],
        script: [
            { src: 'https://js.stripe.com/v3' }
        ]
    },
    /*
    ** Customize the progress-bar color
    */
    loading: {color: '#fff'},
    /*
    ** Global CSS
    */
    css: [
        'font-awesome/css/font-awesome.css',
        "~assets/global.scss"
    ],
    /*
    ** Plugins to load before mounting the App
    */
    plugins: [
        {src: '@/plugins/socket', ssr: false},
        {src: '~/plugins/global.js'},
        {src: '~/plugins/stripe.js',  mode: 'client'}
    ],
    components: true,
    /*
    ** Nuxt.js dev-modules
    */
    buildModules: [
        '@nuxtjs/vuetify',
    ],
    /*
    ** Nuxt.js modules
    */
    modules: [
        '@nuxtjs/axios',
        '@nuxtjs/auth-next',
        '@nuxtjs/pwa',
        '@nuxtjs/dotenv',
        'nuxt-mobile',
        'cookie-universal-nuxt',
        '@nuxtjs/gtm',
    ],
    gtm: {
        id: 'GTM-NSG9WZ3'
    },
    /*
    ** vuetify module configuration
    ** https://github.com/nuxt-community/vuetify-module
    */
    vuetify: {
        customVariables: ['~/assets/variables.scss'],
        font: {
            family: 'Roboto'
        },
        theme: {
            customVariables: ['~/assets/variables.scss'],
            light: true,
            themes: {
                light: {
                    primary: "#734030",
                    title: "#B22D00",
                    textgreen: "#5C591A",
                    body: '#eddcd5',
                    accent: colors.grey.darken3,
                    secondary: colors.amber.darken3,
                    info: colors.teal.lighten1,
                    warning: colors.amber.base,
                    error: colors.deepOrange.accent4,
                    success: colors.green.accent3
                }
            }
        }
    },
    /*
    ** Build configuration
    */
    build: {
        /*
        ** You can extend webpack config here
        */
        transpile: ['vue-agile'],
        extend(config, ctx) {}
    },
    axios: {
        baseURL: 'https://soledy.itmall.digital',
        proxyHeaders: false,
        credentials: false
    },
    auth: {
        localStorage: true,
        strategies: {
            local: {
                endpoints: {
                    login: {
                        url: `/auth/login`,
                        method: 'post',
                        propertyName: 'token'
                    },
                    logout: false,
                    user: {
                        url: `/auth/user`,
                        method: 'get',
                        propertyName: false
                    },
                },
            },
        },
        redirect: {
            login: false,
            logout: '/',
            callback: false,
            home: false
        }
    }
}
