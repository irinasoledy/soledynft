<template>
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
                    <p class="title">Free customer support</p>
                    <a href="">{{ trans.ContactsAndForms.companyMainPhone1 }}</a>
                </div>
            <v-tabs
                v-model="tab"
                centered
                >
                <v-tabs-slider></v-tabs-slider>
                <v-tab href="#tab-login">
                    Login
                </v-tab>
                <v-tab href="#tab-register">
                    Register
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
                                @click="facebookLogin()"
                                >
                                <v-icon>mdi-facebook</v-icon>
                                Login with Facebook account
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                                class="full-width social-btns"
                                @click="googleLogin()"
                                light
                                >
                                <v-icon>mdi-google</v-icon>
                                Login with Google account
                            </v-btn>
                        </v-card-text>
                    </v-card-actions>
                    <div class=" bordered-text">
                        <span>sau</span>
                    </div>
                    <v-card flat>
                        <v-card-text>
                            <login-form button-title="Login" :form.sync="form"></login-form>
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
                                @click="facebookLogin()"
                                >
                                <v-icon>mdi-facebook</v-icon>
                                Login with Facebook account
                            </v-btn>
                            <v-spacer></v-spacer>
                            <v-btn
                                class="full-width social-btns"
                                @click="googleLogin()"
                                light
                                >
                                <v-icon>mdi-google</v-icon>
                                Login with Google account
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
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

import LoginForm from '@/components/front/forms/LoginForm'
import RegisterForm from '@/components/front/forms/RegisterForm'

export default {
    components: { LoginForm, RegisterForm },
    data: () => ({
        tab: null,
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
    }),
    watch: {
        finish (newVal) {
            if (newVal) {
                this.login()
                this.form.finish = false
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
