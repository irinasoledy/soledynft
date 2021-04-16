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
                    <v-alert type="error" v-if="error">
                        {{ error.message }}
                    </v-alert>
                    <div class="col-12">
                        <v-btn color="info" class="d-block" @click="login" :disabled="!valid">
                            sign in
                        </v-btn>
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
    data: () => ({
        error: null,
        message: '',
        valid: true,
        // login: 'manager10',
        login: 'email@email.com',
        loginRules: [
            v => !!v || 'Login is required',
            // v => (v && v.length <= 20) || 'login must be less than 10 characters',
        ],
        password: 'passw',
        passwordRules: [
            v => !!v || 'Password is required',
            // v => (v && v.length <= 20) || 'password must be less than 10 characters',
        ],
    }),
    computed: mapGetters({
        auth: 'admin/getAuthUser',
    }),
    mounted(){
        const { message } = this.$route.query;
        if (message === "noUser") {
          this.message = "Your session has expired.";
        }
        setTimeout(() => this.message = '', 5000)
    },
    methods: {
        ...mapActions({
            loginUser: 'admin/login',
            setUserStatus: 'admin/setUserStatus',
        }),
        submit () {
            if (this.$refs.form.validate()) {
                this.loginUser({login: this.login, password: this.password}).then((data) => {
                    if (this.auth) {
                        return this.$router.push('/crm/dashboard')
                    }
                })
            }
        },
        async login() {
            if (this.$refs.form.validate()) {
                try {
                    await this.$auth.loginWith('local', {
                        data: {
                            email: this.login,
                            password: this.password,
                            type: 'employee'
                        }
                    })
                    return this.$router.push('/crm/dashboard')
                } catch (e) {
                    this.error = e.response.data.message
                }
            }
        }
    },
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
    background-image: url(https://demos.creative-tim.com/vue-notus/img/register_bg_2.2fee0b50.png);
    background-size: 100%;

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
  .error-alert{
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
  .crm-logo-wrapp img{
      // width: 50%;
      max-width: 300px;
  }
</style>
