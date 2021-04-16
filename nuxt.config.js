const colors = require('vuetify/es5/util/colors').default

module.exports = {
  telemetry: false,
  // mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s',
    title: 'docrom.info',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'docrom.info' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/fav.png' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
      'font-awesome/css/font-awesome.css'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
      {src: '@/plugins/socket', ssr : false},
      {src: '~/plugins/vue-agile'},
      {src: '~/plugins/global.js'},
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
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** vuetify module configuration
  ** https://github.com/nuxt-community/vuetify-module
  */
  vuetify: {
    customVariables: ['~/assets/variables.scss'],
    theme: {
      light: true,
      themes: {
        light: {
          // primary: '#002b7f', //blue
          primary: '#293754',
          accent:  '#fcd116', //yellow
          // secondary: '#ce1126', //red
          secondary: '#ff0008',
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
    extend (config, ctx) {
    }
},
axios: {
    baseURL: 'https://docrom.info',
    proxyHeaders: false,
    credentials: false
},
//
//   auth: {
//   strategies: {
//     local: {
//       token: {
//         property: 'token',
//         // required: true,
//         // type: 'Bearer'
//       },
//       user: {
//         property: 'user',
//         // autoFetch: true
//       },
//       endpoints: {
//         login: { url: '/api/auth/login', method: 'post', propertyName: 'token'},
//         logout: { url: '/api/auth/logout', method: 'post' },
//         user: { url: '/api/auth/user', method: 'get' }
//       }
//     }
//   }
// }

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
            facebook: {
                endpoints: {
                    userInfo: 'https://graph.facebook.com/v6.0/me?fields=id,name,picture{url}'
                },
                clientId: '164020048934642',
                scope: ['public_profile', 'email']
            },
            google: {
                clientId: '...'
            },
        },
        redirect: {
            login: false,
            logout: false,
            callback: false,
            home: false
        }
    },

}
