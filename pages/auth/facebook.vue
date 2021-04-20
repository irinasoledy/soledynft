<template lang="html">
    <main>
        <v-row align="center" justify="center" class="spinner">
            wait please....
        </v-row>
    </main>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import userApi from '@/api/userApi'

export default {
    data : () => ({
        code: null,
    }),
    computed: mapGetters({
        user: 'chat/getUser',
    }),
    mounted() {
        if (!this.$route.query.code) {
            this.$router.push("/")
        }
        this.code = this.$route.query.code
        this.attemptToLogin()
    },
    methods: {
        async attemptToLogin() {
            await userApi.attemptToLoginFacebook('facebook', this.code, this.user, async user => {
                const pass = atob(user.hash)
                await this.$auth.loginWith('local', {
                    data: {
                        email: user.email,
                        password: pass,
                        type: 'client',
                    }
                })
                // this.$router.push("/")
            }, error => {
                // this.$router.push("/")
                console.log(error);
            })
        }
    }
}
</script>

<style lang="css" scoped>
.spinner{
    min-height: 400px;
    margin-top: 80px;
}
</style>
