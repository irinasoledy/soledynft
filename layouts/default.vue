<template>
    <v-app app>
        <nuxt />
    </v-app>
</template>

<script>
import { mapActions, mapGetters } from "vuex"

export default {
    data: () => ({
        connectToGlobalSocket : false
    }),
    computed: mapGetters({
        user: 'chat/getUser',
    }),
    mounted(){
        if (!this.$store.state.chat.cookie) {
            this.setUserCookies()
        }
    },
    methods: {
        ...mapActions({
            "setUserCookies" : "chat/setUserCookies"
        })
    }
};
</script>
