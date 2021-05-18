<template>
    <v-sheet class="auth">
        <v-alert
            v-if="message"
            type="warning"
            class="error-alert"
            >
            {{ message }}
        </v-alert>
        <div class="crm-logo-wrapp justify-center text-center">
            <img src="/logo-docrom4.png" class="crm-logo">
        </div>
        <div class="v-sheet auth__inner">
            <div class="v-card pa-4" light>
                <div>
                    <h3 class="text-center">CRM</h3>
                </div>
                <v-alert
                    v-if="loginMessage"
                    color="blue-grey"
                    class="text-center"
                    dark
                    >
                    <v-row align="center">
                        <v-col class="grow">
                            <small>{{ loginMessage }}...</small>
                        </v-col>
                    </v-row>
                </v-alert>
                <v-form class="row" ref="form" v-model="valid" lazy-validation>
                    <div class="col-12">
                        <v-text-field
                            v-model="login"
                            :rules="loginRules"
                            label="Login"
                            required
                            ></v-text-field>
                    </div>
                    <div class="col-12">
                        <v-text-field
                            v-model="password"
                            :rules="passwordRules"
                            label="Password"
                            type="password"
                            required
                            ></v-text-field>
                    </div>
                    <div class="col-12">
                        <v-btn color="info" class="d-block" @click="submit" :disabled="!valid">
                            sign in
                        </v-btn>
                    </div>
                    <div class="col-12 text-center back-home">
                        <nuxt-link :to="`/`">
                            <small>< back home</small>
                        </nuxt-link>
                    </div>
                </v-form>
            </div>
        </div>
    </v-sheet>
</template>

<script>

import { mapGetters, mapActions } from "vuex"

export default {
    layout: 'conference',
    middleware: ['dashboard'],
    data: () => ({
        message: '',
        valid: true,
        login: 'manager10',
        loginRules: [
            v => !!v || 'Login is required',
        ],
        password: 'pass',
        passwordRules: [
            v => !!v || 'Password is required',
        ]
    }),
    mounted() {
        const { message } = this.$route.query;
        if (message === "noUser") {
            this.message = "Your session has expired.";
        }
        setTimeout(() => this.message = '', 5000)
    },
    computed: mapGetters({
        loginMessage: 'authCRM/getMessage',
        token: 'authCRM/getToken',
        user: 'authCRM/getAuth'
    }),
    methods: {
        ...mapActions({
            loginUser: 'authCRM/login',
            getUser: 'authCRM/getUser',
            setUserStatus: 'admin/setUserStatus',
        }),
        submit() {
            if (this.$refs.form.validate()) {
                this.loginUser({ login: this.login, password: this.password }).then((data) => {
                    if (this.token) {
                        this.$cookies.set('crm-token', this.token, {
                            path: '/',
                            maxAge: 60 * 60 * 24 * 7
                        })
                        localStorage.setItem('crm-token', this.token)

                        this.getUser().then(data => {
                            this.setUserStatus({status: true, emploeeId: this.user._id}).then(() => {
                                this.$socket.emit('shareEmployeeStatus', this.user)
                                this.$socket.emit('refreshUserData')
                            })
                            return this.$router.push('/crm/dashboard')
                        })
                    }
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
    .display-1 {
        color: $custom_blue !important;
        font-weight: 700 !important;
    }
    .auth {
        height: 100vh;
        width: 100vw;
        background-color: #1a202c;
        &__inner {
            display: flex;
            align-items: center;
            justify-content: center;
            height: 100%;
            flex-direction: column;
        }
        &__header {
            justify-content: space-around;
            margin-bottom: 20px;
        }
        &__other {
            display: flex;
            justify-content: space-between;
            color: #ffff;
            background-color: transparent;
            width: 360px;
            margin-top: 10px;
            a {
                color: #ffff;
                font-size: 16px;
                text-decoration: none;
            }
        }
        form {
            margin-top: 20px;
        }
        .d-block {
            display: block !important;
            width: 100%;
            margin-bottom: 10px;
        }
        .v-card {
            background-color: #ffff;
            border-radius: 3px;
            padding: 30px;
            width: 360px;
            h3 {
                text-align: center;
            }
        }
    }
    .error-alert {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
    }
    .crm-logo-wrapp {
        position: absolute;
        width: 100%;
        padding-top: 5em;
    }
    .crm-logo-wrapp img {
        max-width: 300px;
    }
    .back-home{
        padding: 0;
        margin-top: -15px;
        color: $custom_blue !important;
    }
</style>
