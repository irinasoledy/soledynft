<template>
  <main class="margin-top">
    <v-container>
      <v-row>
        <v-col>
          <v-progress-linear
              color="primary accent-4"
              indeterminate
              rounded
              height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
      <v-alert prominent type="error" v-if="error">
        <v-row align="center">
          <v-col class="grow">
            Login failed. Try again!
          </v-col>
          <v-col class="shrink">
            <v-btn to="/">go home</v-btn>
          </v-col>
        </v-row>
      </v-alert>
    </v-container>
  </main>
</template>

<script>

import { mapGetters } from "vuex"
import userApi from '@/api/userApi'

export default {
  data() {
    return {
      userHash: null,
      error: false,
      logged: false,
    }
  },
  watch: {
    user() {
      if (this.user && !this.logged) {
        this.socialLogin()
      }
    }
  },
  computed: mapGetters({
    user: 'chat/getUser',
  }),
  mounted() {
    if (this.user) {
      this.socialLogin()
    }
  },
  methods: {
    socialLogin() {
      this.userHash = this.$route.query.user
      if (!this.userHash) {
        this.error = true
      } else {
        userApi.socialLogin(this.userHash, response => {
          if (response.data) {
            response.data.guestId = this.user._id
            userApi.chechSocialUserLogin(response.data, async data => {
              await this.$auth.loginWith('local', {
                data: {
                  email: data.email,
                  password: atob(data.hash),
                  type: 'client',
                  cookie: this.user.cookies[0]
                }
              })
              this.$socket.emit('userJoin', this.$auth.user._id)
              this.logged = true
              this.$router.push('/')
            })
          } else {
            this.error = true
          }
        }, error => {
          this.error = true
        })
      }
    }
  }
}
</script>

<style lang="css" scoped>
.margin-top {
  margin-top: 150px;
}
</style>
