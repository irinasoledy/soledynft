import Vue from 'vue'
import VueSocketIO from 'vue-socket.io'

export default function ({store}) {
    Vue.use(
        new VueSocketIO({
            debug: false,
            connection: process.env.DOMAIN,
            vuex: {
                store,
                actionPrefix: 'SOCKET_',
                mutationPrefix: 'SOCKET_'
            }
        })
    )
}
