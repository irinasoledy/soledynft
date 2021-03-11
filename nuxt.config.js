const colors = require('vuetify/es5/util/colors').default

module.exports = {
  telemetry: false,
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    titleTemplate: '%s - ' + process.env.npm_package_name,
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
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
      '@/plugins/nestable',
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
    '@nuxtjs/pwa',
    '@nuxtjs/dotenv',
    'nuxt-mobile',
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
          primary: '#002b7f', //blue
          accent:  '#fcd116', //yellow
          secondary: '#ce1126', //red
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
    baseURL: 'https://back.itmall.digital',
    proxyHeaders: false,
    credentials: false
  }
}
