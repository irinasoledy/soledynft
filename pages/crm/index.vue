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
                    <div class="col-12">
                        <v-btn color="info" class="d-block" @click="submit" :disabled="!valid">
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
        message: '',
        valid: true,
        login: 'manager10',
        loginRules: [
            v => !!v || 'Login is required',
            v => (v && v.length <= 10) || 'login must be less than 10 characters',
        ],
        password: 'passw',
        passwordRules: [
            v => !!v || 'Password is required',
            v => (v && v.length <= 10) || 'password must be less than 10 characters',
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
            setUser: 'chat/setUser' 
        }),
        submit () {
            if (this.$refs.form.validate()) {
                this.loginUser({login: this.login, password: this.password}).then((data) => {
                    if (this.auth) {
                        this.setUser(this.auth)
                        return this.$router.push('/crm/dashboard')
                    }
                })
            }
        },
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
      max-width: 300px;
  }
</style>
