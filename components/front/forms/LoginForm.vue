<template>
    <v-form
        ref="form"
        v-model="form.valid"
        lazy-validation
        >
        <v-text-field
            v-model="form.email"
            :rules="emailRules"
            label="E-mail"
            required
            ></v-text-field>
        <v-text-field
            v-model="form.password"
            :rules="passwordRules"
            :type="'password'"
            label="Password"
            required
            ></v-text-field>
        <v-alert type="error" v-if="error">
            {{ error.message }}
        </v-alert>
        <v-btn
            :disabled="!form.valid"
            color="primary lighten-1"
            class="mr-4 full-width"
            @click="login()"
            >
            LogIn
        </v-btn>
    </v-form>
</template>

<script>
export default {
    name: 'LoginForm',
    data: () => ({
        error: null,
        form: {
            valid: false,
            email: '',
            password: '',
        },
        emailRules: [
            v => !!v || 'E-mail is required',
            v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
        ],
        passwordRules: [
            v => !!v || 'Password is required'
        ]
    }),
    mounted () {
        this.form.valid = false
    },
    methods: {
        async login() {
            if (this.$refs.form.validate()) {
                try {
                    await this.$auth.loginWith('local', {
                        data: {
                            email: this.form.email,
                            password: this.form.password,
                            type: 'client'
                        }
                    })
                    this.$nuxt.$emit('clooseLoginDialog')
                } catch (e) {
                    this.error = e.response.data.message
                }
            }
        },
        validate () {
            if (this.$refs.form.validate()) {
                this.form.finish = true
                this.$emit('update:form', this.form)
            }
        }
    }
}
</script>

<style media="screen">
    .full-width{
        width: 100%;
    }
</style>
