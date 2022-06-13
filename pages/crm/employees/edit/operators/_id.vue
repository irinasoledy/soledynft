<template>
    <v-sheet class="about-content">
        <v-container grid-list-xl fluid class="grid-desk">
            <v-flex lg8>
                <v-card class="profile-edit">
                    <div id="formInfo">
                        <v-card-title class="d-flex justify-space-between elevation-1 title-relative">
                            <h4>Edit employee</h4>
                            <div class="credentials">
                                <b>Credentials:</b> <br>
                                Login: <b>{{ editedUser.login }}</b> <br>
                                Password: <b>{{ showPass }}</b>
                            </div>
                        </v-card-title>
                        <v-card-title class="pb-0 mt-3">
                            <h5 class="mb-0">User Info</h5>
                        </v-card-title>
                    </div>
                    <v-card-text class="pt-0">
                        <v-form class="row" ref="info" v-model="valid" lazy-validation>
                            <div class="col-md-6 col-12">
                                <v-text-field
                                    label="Full name"
                                    v-model="editedUser.name"
                                    :rules="rules.nameRules"
                                    required
                                ></v-text-field>
                            </div>
                            <div class="col-md-6 col-12">
                                <v-select
                                    :items="positions"
                                    name="category"
                                    label="Position"
                                    v-model="editedUser.position"
                                >
                                    <template v-slot:item="{item}">
                                        {{ trans.Team[item] }}
                                    </template>
                                    <template slot="selection" slot-scope="data">{{
                                            trans.Team[editedUser.position]
                                        }}
                                    </template>
                                </v-select>
                            </div>
                            <div class="col-md-6 col-12">
                                <v-text-field
                                    label="Email"
                                    type="email"
                                    v-model="editedUser.email"
                                    :rules="rules.emailRules"
                                    required
                                ></v-text-field>
                            </div>
                            <div class="col-md-6 col-12">
                                <v-text-field
                                    label="Phone"
                                    type="number"
                                    v-model="editedUser.phone"
                                    :rules="rules.phoneRules"
                                    required
                                ></v-text-field>
                            </div>
                            <v-divider class="my-4"></v-divider>
                            <v-card-title class="d-flex justify-center">
                                <v-btn color="primary" large class="mt-3 mb-3" @click="submitUserInfo">
                                    Save
                                </v-btn>
                            </v-card-title>
                            <div class="col-md-12 col-12"></div>

                            <div class="col-md-6 col-12">
                                <input type="file" @change="onFileChange"/>
                                <v-btn @click="onUploadFile" color="primary" large class="upload-button mt-3 mb-3"
                                       :disabled="!this.selectedFile">Upload file
                                </v-btn>
                            </div>

                            <div class="col-md-6 col-12 text-center">
                                <v-avatar size="115" color="primary">
                                    <img
                                        v-if="editedUser.avatar"
                                        :src="`/avatars/${editedUser.avatar}`"
                                        alt="John"
                                    >
                                    <span v-else class="white--text headline">E</span>
                                </v-avatar>
                            </div>
                        </v-form>
                    </v-card-text>
                    <v-divider class="my-4"></v-divider>
                    <v-card-title class="">
                        <h5 class="mb-0">Account Data</h5>
                    </v-card-title>
                    <v-card-text>
                        <v-form class="row" ref="account" v-model="valid" lazy-validation>
                            <div class="col-md-4 col-12">
                                <v-text-field
                                    label="Login"
                                    v-model="login=editedUser.login"
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
                            <v-divider class="my-4"></v-divider>
                            <v-card-title class="d-flex justify-center">
                                <v-btn color="primary" large class="mt-3 mb-3" @click="submitUserAccount">
                                    Save
                                </v-btn>
                            </v-card-title>
                        </v-form>
                    </v-card-text>
                    <v-divider class="my-4"></v-divider>
                </v-card>
            </v-flex>
            <v-flex lg4>
                <EmployeeToService :employee="editedUser" :employeeId="editedUser._id"/>
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

import {mapGetters, mapActions} from "vuex"
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
        showPass: "",
        roles: [
            'employee',
            'manager',
            'root'
        ],
        positions: [
            'employeePositionExpertCetatenie',
            'employeePositionExpertActeSoferi',
            'employeePositionExpertActeCivileIdentitate',
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
            nameRules: [v => !!v || 'Name is required'],
            emailRules: [v => !!v || 'Email is required'],
            phoneRules: [v => !!v || 'Phone is required'],
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
        employees: 'admin/getEmployees',
        trans: 'getTranslations',
    }),
    async mounted() {
        this.editedUser = await this.employees.find((employee) => employee._id === this.$route.params.id)
        if (Object.keys(this.editedUser).length === 0) {
            this.$router.push("/back/employees")
        }
        this.showPassword(this.editedUser.hash, true)
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
        showPassword(pass, hashed = false) {
            if (hashed) {
                try {
                    return this.showPass = atob(pass)
                } catch (e) {
                    return this.showPass = 'password is unkown'
                }
            }
            return this.showPass = pass
        },
        getTransValue(value) {
            return value
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
                    this.showPassword(this.editedUser.password)
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

.title-relative {
    position: relative;
}

.credentials {
    position: absolute;
    font-size: 12px;
    right: 10px;
    line-height: 1.5;
    // text-align: right;
}
</style>
