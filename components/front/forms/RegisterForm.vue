<template>
    <v-form
        ref="registerForm"
        v-model="form.valid"
        lazy-validation
        >
        <v-text-field
            v-model="form.name"
            :rules="nameRules"
            label="Name"
            required
            ></v-text-field>
        <v-text-field
            v-model="form.email"
            :rules="emailRules"
            label="E-mail"
            required
            ></v-text-field>
        <v-text-field
            :type="'number'"
            v-model="form.phone"
            :rules="phoneRules"
            label="Phone"
            required
            ></v-text-field>
        <v-text-field
            v-model="form.password"
            :rules="passwordRules"
            :type="'password'"
            label="Password"
            required
            ></v-text-field>
        <v-text-field
            v-model="form.confirmPassword"
            :rules="confirmPasswordRules"
            :type="'password'"
            label="Confirm Password"
            required
            ></v-text-field>

        <v-checkbox v-model="form.agreement" :rules="agreementRules">
            <template v-slot:label>
                <div>
                    Am citit si sunt deacord cu colectarea si procesarea datelor mele personale impreuna cu
                    <a target="_blank"
                        :href="`ro/terms`"
                        @click.stop
                        >
                    Termenii si condiții
                    </a>
                </div>
            </template>
        </v-checkbox>

        <div class="spacer-block"></div>

        <v-alert type="error" v-if="error">
            {{ error.message }}
        </v-alert>

        <v-btn
            :disabled="!form.valid"
            color="primary lighten-1"
            class="mr-4 full-width"
            @click="register()"
            >
            Register
        </v-btn>
    </v-form>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import userApi from '@/api/userApi'

export default {
    name: 'LoginForm',
    props: ['user'],
    data(){
        return {
            error: null,
            form: {
                valid: false,
                name: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
                agreement: false,
            },
            nameRules: [
                v => !!v || 'Name is required',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            phoneRules: [
                v => !!v || 'Phone is required',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
            ],
            confirmPasswordRules: [
                (value) => !!value || 'Type confirm password',
                (value) =>
                value === this.form.password || 'The password confirmation does not match.',
            ],
            agreementRules: [
                (value) => !!value || 'At least one item should be selected',
            ]
        }
    },
    mounted() {
        this.form.valid = false
    },
    computed: mapGetters({
        language: 'getLanguage',
        trans: 'getTranslations',
    }),
    methods: {
        register() {
            this.error = null
            if (this.$refs.registerForm.validate()) {
                this.form.guestId = this.user._id
                userApi.register(this.form, async response => {
                    try {
                        await this.$auth.loginWith('local', {
                            data: {
                                email: this.form.email,
                                password: this.form.password,
                                type: 'client',
                            }
                        })

                        this.$nuxt.$emit('clooseLoginDialog')
                    } catch (e) {
                        this.error = e.response.data.message
                    }
                }, error => {
                    this.error = error
                })
            }
        },
        validate() {
            if (this.$refs.registerForm.validate()) {
                this.form.finish = true
                this.$emit('update:form', this.form)
            }
        },
    }
}

</script>

<style media="screen">
    .full-width{
        width: 100%;
    }
    .spacer-block{
        height: 30px;
    }
</style>
