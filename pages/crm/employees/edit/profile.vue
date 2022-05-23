<template>
    <v-sheet class="about-content">
        <v-container grid-list-xl fluid class="grid-desk">
            <v-flex lg12>
                <v-card class="profile-edit">
                    <div id="formInfo">
                        <v-card-title  class="d-flex justify-space-between elevation-1">
                            <h5>My profile</h5>
                        </v-card-title>
                    </div>
                    <v-card-text class="pt-0"> <br>
                        <v-form class="row" ref="info" v-model="valid" lazy-validation>
                            <div class="col-md-6 col-12">
                                <v-text-field
                                    label="Full name"
                                    v-model="editedUser.name"
                                    :rules="rules.nameRules"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    label="Login"
                                    v-model="login=editedUser.login"
                                    :rules="rules.loginRules"
                                    required
                                ></v-text-field>
                                <v-text-field
                                    label="Password"
                                    type="password"
                                    v-model="formData.password"
                                    :rules="rules.passwordRules"
                                    ></v-text-field>
                                <v-text-field
                                    label="Repeat Password"
                                    type="password"
                                    v-model="formData.confirmPassword"
                                    :rules="rules.confirmPasswordRules"
                                    required
                                    ></v-text-field>
                                <v-btn color="primary" large class="mt-3 mb-3" @click="submitUserInfo">
                                    Save
                                </v-btn>
                            </div>

                            <div class="col-md-6 col-12">
                                <v-row>
                                    <div class="col-md-12"><b>Avatar Upload:</b></div>
                                    <div class="col-md-6">
                                        <input type="file" @change="onFileChange" />
                                        <v-btn @click="onUploadFile" color="primary" large class="upload-button mt-3 mb-3"
                                        :disabled="!this.selectedFile">Upload file</v-btn>
                                    </div>
                                    <div class="col-md-6 text-center">
                                        <v-avatar size="90" color="primary">
                                            <img
                                                v-if="editedUser.avatar"
                                                :src="`/avatars/${editedUser.avatar}`"
                                            >
                                            <span v-else class="white--text headline">E</span>
                                        </v-avatar>
                                    </div>
                                    <div class="col-md-12">
                                        <b>Credentials:</b> <br>
                                        Login: <b>{{ editedUser.login }}</b> <br>
                                        Password: <b>{{ showPassword(editedUser.hash) }}</b>
                                    </div>
                                </v-row>
                            </div>
                        </v-form>
                    </v-card-text>
                </v-card>
            </v-flex>

            <v-snackbar
                v-model="snackbar"
                :multi-line="true"
                right
                >
                {{ snackbarText }}

                <template v-slot:action="{ attrs }">
                    <v-btn
                    color="red"
                    text
                    v-bind="attrs"
                    @click="snackbar = false"
                    >
                    Close
                    </v-btn>
                </template>
            </v-snackbar>

        </v-container>
    </v-sheet>
</template>

<script>

import { mapGetters, mapActions } from "vuex"
import EmployeeToService from "@/components/crm/widgets/features/EmployeeToService"
import axios from "axios"

export default {
    layout: "crm",
    middleware: ['admin'],
    data: () => ({
        selectedFile: '',
        editedUser: {},
        valid: true,
        snackbar: false,
        snackbarText: "",
        roles: [
            'employee',
            'manager',
            'root'
        ],
        formData: {
            login: '',
            password: '',
            confirmPassword: '',
        },
        rules: {
            loginRules: [
                v => !!v || 'Login is required',
                v => (v && v.length <= 10) || 'login must be less than 10 characters',
            ],
            nameRules: [ v => !!v || 'Name is required'],
            emailRules: [ v => !!v || 'Email is required'],
            phoneRules: [ v => !!v || 'Phone is required'],
            passwordRules: [
                v => !!v || 'Password is required',
                v => (v && v.length >= 4) || 'Password must be more than 4 characters',
            ],
            confirmPasswordRules: [
                v => !!v || 'Type confirm password',
                v => (v && v.length >= 4) || 'Password must be more than 4 characters',
            ]
        }
    }),
    computed: mapGetters({
        authUser: 'authCRM/getUser',
        managers: 'admin/getManagers'
    }),
    mounted() {
        this.editedUser = this.authUser
    },
    methods: {
        ...mapActions({
            createNewEmployee: 'admin/createNewEmployee',
            editEmployeeInfo: 'admin/editEmployeeInfo',
            editUser: 'admin/editUser',
            editEmployeeAccount: 'admin/editEmployeeAccount',
            editUserAvatar: 'admin/editUserAvatar',
            initApp: 'admin/initApp'
        }),
        showPassword(pass) {
            try {
                return atob(pass)
            } catch (e) {
                return 'password is unkown'
            }
        },
        onFileChange(e) {
            const selectedFile = e.target.files[0]
            this.selectedFile = selectedFile;
        },
        onUploadFile() {
            const formData = new FormData();
            formData.append("file", this.selectedFile)
            formData.append("id", this.editedUser._id)

            this.editUserAvatar({formData, id: this.editedUser._id}).then(user => {
                this.editedUser = user
                this.initApp()
            })
        },
        submitUserInfo() {
            if (this.$refs.info.validate()) {
                this.editedUser.password = this.formData.password
                this.editUser(this.editedUser).then(() => {
                    this.snackbar = true
                    this.snackbarText = "The changes have been saved successfully!"
                    this.$socket.emit('refreshUsersData')
                })
            }
        },
        submitUserAccount() {
            if (this.$refs.account.validate()) {
                this.editedUser.password = this.formData.password
                this.editUser(this.editedUser).then(() => {
                    this.snackbar = true
                    this.snackbarText = "The changes have been saved successfully!"
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

ext-field>
                                    </div>
                                    <div class="col-md-3 col-12">
                                        <v-text-field
                                            label="Payment"
                                            v-model="userDetatils.payment"
                                            required
                                        ></v-text-field>
                                    </div>
                                    <div class="col-12 text-right">
                                        <v-btn color="primary" @click="submitUserDetails">
                                            save
                                        </v-btn>
                                    </div>
                                </v-form>
                            </v-card-text>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>

import {mapActions} from "vuex";
import sidebar from '@/components/front/partials/nav-cabinet'
import crmApi from "@/api/crmApi";

export default {
    middleware: ['user'],
    components: {sidebar},
    data() {
        return {
            formGeneralData: {
                name: this.$auth.user.name,
                email: this.$auth.user.email,
                phone: this.$auth.user.phone,
                age: this.$auth.user.age,
                rules: {
                    name: [v => !!v || 'Name is required'],
                    email: [
                        v => !!v || 'E-mail is required',
                        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                    ],
                    phone: [v => !!v || 'Phone is required'],
                }
            },
            formPasswords: {
                oldPassword: '',
                newPassword: '',
                confirmPassword: '',
                rules: {
                    oldPassword: [
                        v => !!v || 'Type old password',
                        v => v === atob(this.$auth.user.hash) || 'Old Password is not corect'
                    ],
                    newPassword: [v => !!v || 'Type new password'],
                    confirmPassword: [
                        (value) => !!value || 'Type confirm password',
                        (value) =>
                            value === this.formPasswords.newPassword || 'The password confirmation does not match.',
                    ]
                }
            },
            formAvatar: {
                avatar: this.$auth.user.avatar,
                selectedFile: '',
            },
            userDetatils: {
                whatsapp: '',
                messager: '',
                viber: '',
                telegram: '',
                facebook: '',
                instagram: '',
                other: '',
                preferred: '',
                address: '',
                city: '',
                country: '',
                postalCode: '',
                language: '',
                currency: '',
                payment: '',
            },
        }
    },
    mounted() {
        this.getDetails()
    },
    methods: {
        ...mapActions({
            editUserAvatar: 'admin/editUserAvatar',
        }),
        async submitFormData() {
            if (this.$refs.formGeneralData.validate()) {
                this.formGeneralData.userId = this.$auth.user._id
                await crmApi.setUserGeneralData(this.formGeneralData, user => {
                    this.$auth.user.name = user.name
                    this.$auth.user.email = user.email
                    this.$auth.user.phone = user.phone
                    this.$auth.user.age = user.age
                })
            }
        },
        async submitPasswords() {
            if (this.$refs.formPasswords.validate()) {
                this.formPasswords.userId = this.$auth.user._id
                await crmApi.setUserPasswords(this.formPasswords, user => {
                    this.$auth.user.hash = user.hash
                })
            }
        },
        onFileChange(e) {
            this.formAvatar.selectedFile = e.target.files[0]
        },
        onUploadFile() {
            const formData = new FormData();
            formData.append("file", this.formAvatar.selectedFile)
            formData.append("id", this.$auth.user._id)

            this.editUserAvatar({formData, id: this.$auth.user._id}).then(user => {
                this.$auth.user.avatar = user.avatar
                this.formAvatar.avatar = user.avatar
            })
        },
        getInitials(user) {
            const name = user.name
            if (name) {
                const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
                let initials = [...name.matchAll(rgx)] || [];

                initials = (
                    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
                ).toUpperCase();

                return initials
            }
            return 'C'
        },
        async getDetails() {
            await crmApi.getUserDetails(this.$auth.user._id, response => {
                if (response.user !== null) {
                    this.userDetatils = response.user
                }
            })
        },
        async submitUserDetails() {
            this.userDetatils.userId = this.$auth.user._id
            await crmApi.setUserDetails(this.userDetatils, response => {
            })
        },
    }
}
</script>

<style scoped>
.account-area {
    margin-top: 20px;
}

.cabinet-content {

.radiogroup {
    flex-direction: row;
}

}

@media (max-width: 991px) {
    .account-area {
        margin-top: 20px;
    }
    .display-1{
        font-size: 1.5rem !important;
    }
}
</style>

