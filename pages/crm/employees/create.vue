<template>
    <v-sheet class="about-content">
        <v-container>
            <v-card class="profile-edit">
                <div id="formInfo">
                    <v-card-title  class="d-flex justify-space-between elevation-1">
                        <h4>Create new employee</h4>
                        <v-btn color="primary" @click="submit">
                            Save All
                        </v-btn>
                    </v-card-title>
                    <v-card-title class="pb-0 mt-3">
                        <h5 class="mb-0">User Info</h5>
                    </v-card-title>
                </div>
                <v-form ref="form" v-model="valid" lazy-validation>
                <v-card-text class="pt-0">
                    <div class="row">
                        <div class="col-md-4 col-12">
                            <v-text-field
                                label="Full name"
                                v-model="formData.name"
                                :rules="rules.nameRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-md-4 col-12">
                            <v-text-field
                                label="Email"
                                type="email"
                                v-model="formData.email"
                                :rules="rules.emailRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-md-4 col-12">
                            <v-text-field
                                label="Phone"
                                type="number"
                                v-model="formData.phone"
                                :rules="rules.phoneRules"
                                required
                            ></v-text-field>
                        </div>
                    </div>
                </v-card-text>
                <v-divider class="my-4"></v-divider>
                <v-card-title class="">
                    <h5 class="mb-0">Account Data</h5>
                </v-card-title>
                <v-card-text>
                    <div class="row">
                        <div class="col-md-4 col-12">
                            <v-text-field
                                label="Login"
                                v-model="formData.login"
                                :rules="rules.loginRules"
                                required
                            ></v-text-field>
                        </div>
                        <div class="col-md-4 col-12">
                            <v-text-field
                                label="Password"
                                type="password"
                                v-model="formData.password"
                                :rules="rules.passwordRules"
                                ></v-text-field>
                        </div>
                        <div class="col-md-4 col-12">
                            <v-text-field
                                label="Repeat Password"
                                type="password"
                                v-model="formData.confirmPassword"
                                :rules="rules.confirmPasswordRules"
                                required
                                ></v-text-field>
                        </div>
                    </div>
                </v-card-text>
                <v-divider class="my-4"></v-divider>
                <v-card-title class="d-flex justify-center">
                    <v-btn color="primary" large class="mt-3 mb-3" @click="submit">
                        Save All
                    </v-btn>
                </v-card-title>
            </v-form>
            </v-card>
        </v-container>
    </v-sheet>
</template>

<script>

import { mapGetters, mapActions } from "vuex"

export default {
    layout: "crm",
    middleware: ['admin'],
    data: () => ({
        valid: true,
        roles: [
            'employee',
            'redactor',
            'root'
        ],
        formData: {
            name: '',
            login: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            role: 'employee'
        },
        rules: {
            loginRules: [
                v => !!v || 'Login is required',
                v => (v && v.length <= 10) || 'login must be less than 10 characters',
            ],
            nameRules: [ v => !!v || 'Name is required'],
            emailRules: [ v => !!v || 'Email is required'],
            phoneRules: [ v => !!v || 'Phone is required'],
            passwordRules: [v => !!v || 'Password is required'],
            confirmPasswordRules: [v => !!v || 'Type confirm password']
        }
    }),
    methods: {
        ...mapActions({
            'createEmployee': 'admin/createEmployee',
        }),
        submit(){
            if (this.$refs.form.validate()) {
                this.createEmployee(this.formData).then(() => {
                    this.$router.push("/crm/employees")
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

.about-content {
   p {
       color: $custom_red !important
   }
   .banner {
       height: 70vh;
       position: relative;
       &__content {
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           z-index: 3;
           display: flex;
           justify-content: flex-start;
           flex-direction: column;
           padding: 0 30px;
           padding-top: 50px;
       }
       .v-card__title {
           text-align: left;
       }
       .v-card__text {
           text-align: left !important;
       }
       .v-btn {
           margin-left: 16px;
           max-width: 150px;
       }
       .v-image {
           width: 100%;
           height: 100%;
           object-fit: cover;
           object-position: center;
           position: absolute;
           z-index: 1;
           top: 0;
           left: 0;
       }
       &:after {
           content: "";
           position: absolute;
           left: 0;
           right: 0;
           width: 100%;
           height: 100%;
           background-color: rgba($color: $custom_blue, $alpha: 0.7);
           z-index: 2;
       }
   }
   .avatar-relative {
       position: relative;
       top: -80px;
       z-index: 4;
       max-width: 400px;
       min-width: 350px;
       margin-left: auto;
       margin-right: auto;
   }
}

.avatar-image {
   padding-top: 80px;
   .heading {
       font-size: 25px;
       color: $custom_blue;
       font-weight: bold;
   }
   .description button {
       text-decoration: underline;
   }
   .infoCust {
       .description {
           margin-top: 10px;
       }
       button {
           font-weight: normal;
           color: inherit;
       }
   }
}

.avatar-image .v-image {
   position: absolute;
   width: 160px;
   height: 160px;
   top: -79px;
   left: calc(50% - 80px);
   border-radius: 50% !important;
}

.avatar-image .edit {
   position: absolute;
   top: 30px;
   left: 200px
}

@media (min-width: 991px) {
   .grid-desk {
       display: flex;
   }
   .profile-edit {
       order: 1;
       margin-right: 20px;
       position: relative;
       z-index: 2;
   }
   .avatar-relative {
       order: 2;
   }
}
</style>
