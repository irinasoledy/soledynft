import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function({ store }) {
  Vue.use(
    new VueSocketIO({
      debug: false,
      connection: 'https://demo.terradigital.online',
      vuex: {
        store,
        actionPrefix: 'SOCKET_',
        mutationPrefix: 'SOCKET_'
      }
    })
  )
}
