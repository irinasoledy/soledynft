<template>
    <div>
    <v-dialog
        v-model="showDialog"
        persistent
        max-width="500"
        >
            <v-card class="dialog-wrapp">
                <span class="close-dialog" @click="showDialog = false">
                    <v-icon>mdi-close</v-icon>
                </span>
                <div class="auth-info">
                    <p class="title">{{ trans.ContactsAndForms.authCustumerSupport }}</p>
                    <a :href="`tel:${trans.ContactsAndForms.companyMainPhone1}`">
                        {{ trans.ContactsAndForms.companyMainPhone1 }}
                    </a>
                </div>
            <v-tabs
                v-model="tab"
                centered
                >
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#tab-login">
                    {{ trans.ContactsAndForms.authLogin }}
                </v-tab>
                <v-tab href="#tab-register">
                    {{ trans.ContactsAndForms.authRegister }}
                </v-tab>
            </v-tabs>

            <v-tabs-items v-model="tab">
                <v-tab-item value="tab-login">
                    <v-card-actions>
                        <v-card-text class="text-center">
                            <v-btn
                                class="full-width social-btns"
                                color="#365899"
                                dark
                                href="https://api.terradigital.ro/api/login/facebook"
                                >
                                <v-icon>mdi-facebook</v-icon>
                                {{ trans.ContactsAndForms.authGoogleLogin }}
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                                class="full-width social-btns"
                                href="https://api.terradigital.ro/api/login/google"
                                light
                                >
                                <v-icon>mdi-google</v-icon>
                                {{ trans.ContactsAndForms.authFacebookLogin }}
                            </v-btn>
                        </v-card-text>
                    </v-card-actions>
                    <div class=" bordered-text">
                        <span>sau</span>
                    </div>
                    <v-card flat>
                        <v-card-text>
                            <login-form button-title="Login" :form.sync="form" :user="user"></login-form>
                        </v-card-text>

                    </v-card>
                </v-tab-item>

                <v-tab-item value="tab-register">
                    <v-card-actions>
                        <v-card-text class="text-center">
                            <v-btn
                                class="full-width social-btns"
                                color="#365899"
                                dark
                                href="https://api.terradigital.ro/api/login/facebook"
                                >
                                <v-icon>mdi-facebook</v-icon>
                                {{ trans.ContactsAndForms.authGoogleLogin }}
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                                class="full-width social-btns"
                                href="https://api.terradigital.ro/api/login/google"
                                light
                                >
                                <v-icon>mdi-google</v-icon>
                                {{ trans.ContactsAndForms.authFacebookLogin }}
                            </v-btn>
                        </v-card-text>
                    </v-card-actions>
                    <div class=" bordered-text">
                        <span>sau</span>
                    </div>
                    <v-card flat>
                        <v-card-text>
                            <register-form :user="user"></register-form>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs-items>

        </v-card>
    </v-dialog>
    <v-dialog
        v-model="remoteLoginDialog"
        persistent
        max-width="500"
        >
        <v-card>
        <v-card-title class="headline">
          Request to login
        </v-card-title>

        <v-card-text>
          log in as admin <b>{{ userToLogin.name }}</b>, please confirm it's you......
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>

          <v-btn
            color="green darken-1"
            text
            @click="remoteLoginDialog = false"
          >
            discard
          </v-btn>

          <v-btn
            color="green darken-1"
            text
            @click="continueLogin()"
          >
            it's me
          </v-btn>
        </v-card-actions>
      </v-card>
        </v-card>
    </v-dialog>
</div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

import LoginForm from '@/components/front/forms/LoginForm'
import RegisterForm from '@/components/front/forms/RegisterForm'

export default {
    components: { LoginForm, RegisterForm },
    data: () => ({
        tab: null,
        remoteLoginDialog: false,
        showDialog: false,
        form: {
        valid: false,
        email: '',
        password: '',
        finish: false
        },
        snackbarMessage: '',
    }),
    computed: mapGetters({
        servicesList: 'getServices',
        languages: 'getLanguages',
        language: 'getLanguage',
        trans: 'getTranslations',
        user: 'chat/getUser',
        remoteLogin: 'authFront/getRemoteLogin',
        userToLogin: 'authFront/getUserToLogin',
        crmUser: 'authCRM/getUser'
    }),
    watch: {
        finish (newVal) {
            if (newVal) {
                this.login()
                this.form.finish = false
            }
        },
        remoteLogin() {
            if (!this.crmUser) {
                // console.log(this.remoteLogin);
                this.remoteLoginDialog = true
                // try {
                //     const email = this.userToLogin.email
                //     const password = atob(this.userToLogin.hash)
                //
                //     await this.$auth.loginWith('local', {
                //         data: {
                //             email: email,
                //             password: password,
                //             type: 'client',
                //             cookie: this.user.cookies[0]
                //         }
                //     })
                //     this.$nuxt.$emit('clooseLoginDialog')
                //     this.$socket.emit('userJoin', this.$auth.user._id)
                // } catch (e) {
                //     console.log(e);
                // }
            }
        }
    },
    created(){
        this.$nuxt.$on('openLoginDialog', () => {
            this.showDialog = true
        })
        this.$nuxt.$on('clooseLoginDialog', () => {
            this.showDialog = false
        })
    },
    methods: {
        async continueLogin() {
            try {
                const email = this.userToLogin.email
                const password = atob(this.userToLogin.hash)

                await this.$auth.loginWith('local', {
                    data: {
                        email: email,
                        password: password,
                        type: 'client',
                        cookie: this.user.cookies[0]
                    }
                })
                this.$nuxt.$emit('clooseLoginDialog')
                this.$socket.emit('userJoin', this.$auth.user._id)
                this.remoteLoginDialog = false
            } catch (e) {
                console.log(e);
            }
        },
        facebookLogin() {
            this.$auth.loginWith('facebook')
        },
        googleLogin() {
            this.$auth.loginWith('google')
        },
        async login () {
            try {
                const response = await this.$auth.loginWith('local', {
                data: {
                    login: this.form.email,
                    password: this.form.password
                    }
                })
                this.snackbarMessage = response.data.message
            } catch (error) {
                this.snackbar = true
                this.snackbarMessage = error.response.data.message
            }
        }
    }
}
</script>


<style lang="scss">
    .v-tab{
        margin: 0 10px;
    }
    .dialog-wrapp{
        position: relative;
        .close-dialog{
            position: absolute;
            right: 20px;
            top: 15px;
            cursor: pointer;
        }
    }

    .auth-info{
        text-align: center;
        line-height: 1;
        padding-top: 20px;
        margin-bottom: 10px;
        .v-window-item{
            min-height: 100px;
        }
        .title{
            color: #404145;
            text-align: center;
            font-weight: 500;
            margin-bottom: 0;
            font-size: 20px;
        }
        a{
            font-size: 25px;
            display: block;
            text-decoration: none;
        }
        .subtitle{
            font-size: 14px;
            color: #696969;
            text-align: center;
            display: block;
        }
    }
    .social-btns{
        margin: 5px 0;
        padding: 10px;
    }
    .social-btns i{
        margin-right: 10px;
        font-size: 20px;
    }
    .social-btns span{
        font-size: 0.7rem
    }
    .bordered-text{
        text-align: center;
        border-bottom: 1px solid #AAA;
        position: relative;
        min-height: 20px;
        margin: 0 15px;
    }
    .bordered-text span{
        background-color: #FFF;
        position: absolute;
        width: 40px;
        height: 20px;
        top: 5px;
        z-index: 9;
        z-index: 9;
        left: 50%;
        display: block;
        margin-left: -20px;
    }
</style>
