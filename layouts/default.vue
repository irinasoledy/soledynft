<template>
    <v-app app>
         <!-- cookie - {{ this.$store.state.chat.cookie }}<br>
         client - {{ this.$store.state.chat.client }}<br>
         emplooy - {{ this.$store.state.chat.employee }}<br>
         user - {{ this.$store.state.chat.user }} -->
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
