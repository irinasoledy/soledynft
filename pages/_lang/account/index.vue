<template>
  <main>
    <div class="container account-area">
      <div class="row">
        <div class="col-md-3 pad">
          <sidebar></sidebar>
        </div>
        <div class="col-md-9 account-area">
          <div class="row cabinet-content">
            <div class="col-lg-10 col-md-12 col-12 display-1 text-center">
              My Profile
            </div>
            <div class="col-lg-12 col-md-12 col-12">
              <v-form
                  ref="formGeneralData"
                  class="row"
                  lazy-validation
              >
                <div class="col-md-12">
                  <h3>General Data</h3>
                </div>
                <div class="col-md-3">
                  <v-text-field
                      v-model="formGeneralData.name"
                      :rules="formGeneralData.rules.name"
                      label="Name"
                      required
                  ></v-text-field>
                </div>
                <div class="col-md-3">
                  <v-text-field
                      v-model="formGeneralData.email"
                      :rules="formGeneralData.rules.email"
                      label="E-mail"
                      required
                  ></v-text-field>
                </div>
                <div class="col-md-3">
                  <v-text-field
                      v-model="formGeneralData.phone"
                      :rules="formGeneralData.rules.phone"
                      type="number"
                      label="Phone"
                      required
                  ></v-text-field>
                </div>
                <div class="col-md-3">
                  <v-text-field
                      v-model="formGeneralData.age"
                      type="number"
                      label="Age"
                      required
                  ></v-text-field>
                </div>
                <div class="col-12 text-right">
                  <v-btn color="primary" @click="submitFormData()">
                    Save
                  </v-btn>
                </div>
              </v-form>
              <v-divider class="my-4"></v-divider>

              <v-form
                  ref="formPasswords"
                  class="row"
                  lazy-validation
              >
                <div class="col-md-12">
                  <h3>Reset Password</h3>
                </div>
                <div class="col-md-4">
                  <v-text-field
                      v-model="formPasswords.oldPassword"
                      :rules="formPasswords.rules.oldPassword"
                      label="Old Password"
                      type="password"
                      required
                  ></v-text-field>
                </div>

                <div class="col-md-4">
                  <v-text-field
                      v-model="formPasswords.newPassword"
                      :rules="formPasswords.rules.newPassword"
                      label="New Password"
                      type="password"
                      required
                  ></v-text-field>
                </div>

                <div class="col-md-4">
                  <v-text-field
                      v-model="formPasswords.confirmPassword"
                      :rules="formPasswords.rules.confirmPassword"
                      label="Confirm Password"
                      type="password"
                      required
                  ></v-text-field>
                </div>
                <div class="col-12 text-right">
                  <v-btn color="primary" @click="submitPasswords()">
                    Save
                  </v-btn>
                </div>
              </v-form>
              <v-divider class="my-4"></v-divider>

              <div class="col-md-12">
                <h3>Avatar</h3>
              </div>
              <div class="col-12">
                <v-avatar size="115" color="primary">
                  <img
                      v-if="formAvatar.avatar"
                      :src="`/avatars/${formAvatar.avatar}`"
                  >
                  <span v-else class="white--text headline">
                                        {{ getInitials($auth.user) }}
                                    </span>
                </v-avatar>
                <input type="file" @change="onFileChange"/>
                <v-btn @click="onUploadFile" color="primary" large class="upload-button mt-3 mb-3"
                       :disabled="!this.formAvatar.selectedFile">Upload file
                </v-btn>
              </div>
              <v-divider class="my-4"></v-divider>
              <v-card-title class="pb-0 mt-3">
                <h5 class="mb-0">Social Contacts:</h5>
              </v-card-title>
              <v-card-text>
                <v-form class="row">
                  <div class="col-md-3 col-12">
                    <v-text-field
                        label="Whatsapp"
                        v-model="userDetatils.whatsapp"
                        required
                    ></v-text-field>
                  </div>
                  <div class="col-md-3 col-12">
                    <v-text-field
                        label="Messenger"
                        v-model="userDetatils.messager"
                        required
                    ></v-text-field>
                  </div>

                  <div class="col-md-3 col-12">
                    <v-text-field
                        label="Viber"
                        v-model="userDetatils.viber"
                        required
                    ></v-text-field>
                  </div>
                  <div class="col-md-3 col-12">
                    <v-text-field
                        label="Telegram"
                        v-model="userDetatils.telegram"
                        required
                    ></v-text-field>
                  </div>
                  <div class="col-md-3 col-12">
                    <v-text-field
                        label="Facebook"
                        v-model="userDetatils.facebook"
                        required
                    ></v-text-field>
                  </div>
                  <div class="col-md-3 col-12">
                    <v-text-field
                        label="Instagram"
                        v-model="userDetatils.instagram"
                        required
                    ></v-text-field>
                  </div>
                  <div class="col-md-3 col-12">
                    <v-text-field
                        label="Other"
                        v-model="userDetatils.other"
                        required
                    ></v-text-field>
                  </div>
                  <div class="col-md-3 col-12">
                    <v-text-field
                        label="Preferred communication channel"
                        v-model="userDetatils.preferred"
                        required
                    ></v-text-field>
                  </div>
                </v-form>
              </v-card-text>

              <v-card-title class="pb-0 mt-3">
                <h5 class="mb-0">Contacts:</h5>
              </v-card-title>
              <v-card-text>
                <v-form class="row">
                  <div class="col-md-3 col-12">
                    <v-text-field
                        label="Address"
                        v-model="userDetatils.address"
                        required
                    ></v-text-field>
                  </div>
                  <div class="col-md-3 col-12">
                    <v-text-field
                        label="City"
                        v-model="userDetatils.city"
                        required
                    ></v-text-field>
                  </div>
                  <div class="col-md-3 col-12">
                    <v-text-field
                        label="Country"
                        v-model="userDetatils.country"
                        required
                    ></v-text-field>
                  </div>
                  <div class="col-md-3 col-12">
                    <v-text-field
                        label="Postal Code"
                        v-model="userDetatils.postalCode"
                        required
                    ></v-text-field>
                  </div>
                  <div class="col-md-3 col-12">
                    <v-text-field
                        label="Language"
                        v-model="userDetatils.language"
                        required
                    ></v-text-field>
                  </div>
                  <div class="col-md-3 col-12">
                    <v-text-field
                        label="Currency"
                        v-model="userDetatils.currency"
                        required
                    ></v-text-field>
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

  .display-1 {
    font-size: 1.5rem !important;
  }
}
</style>
