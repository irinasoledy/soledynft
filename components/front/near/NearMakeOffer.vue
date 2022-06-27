<template>
  <div class="btn-wrapper_1">
    <v-dialog
        transition="dialog-top-transition"
        max-width="600"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="primary" width="200" v-bind="attrs" v-on="on">
          <v-icon>mdi-label-multiple-outline</v-icon>
          Make Offer
        </v-btn>
      </template>
      <template v-slot:default="dialog">
        <v-card>
          <v-toolbar color="primary" dark>
            <v-btn
                icon
                dark
                @click="dialog.value = false"
            >
              <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-toolbar-title> Make Offer</v-toolbar-title>
          </v-toolbar>
          <v-card-text>
            <form>
              <v-text-field
                  v-model="name"
                  :error-messages="nameErrors"
                  :counter="10"
                  label="Name"
                  required
                  @input="$v.name.$touch()"
                  @blur="$v.name.$touch()"
              ></v-text-field>
              <v-text-field
                  v-model="email"
                  :error-messages="emailErrors"
                  label="E-mail"
                  required
                  @input="$v.email.$touch()"
                  @blur="$v.email.$touch()"
              ></v-text-field>
              <v-text-field
                  type="number"
                  v-model="offer"
                  :error-messages="offerErrors"
                  label="Your Offer"
                  required
                  @input="$v.offer.$touch()"
                  @blur="$v.offer.$touch()"
              ></v-text-field>
              <v-checkbox
                  v-model="checkbox"
                  :error-messages="checkboxErrors"
                  label="Do you agree?"
                  required
                  @change="$v.checkbox.$touch()"
                  @blur="$v.checkbox.$touch()"
              ></v-checkbox>

              <v-btn
                  class="mr-4 primary"
                  @click="submit" block
              >
                submit
              </v-btn>
            </form>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
  </div>
</template>

<script>
import {validationMixin} from 'vuelidate'
import {required, maxLength, email, numeric} from 'vuelidate/lib/validators'

export default {
  mixins: [validationMixin],

  validations: {
    name: {required, maxLength: maxLength(10)},
    email: {required, email},
    offer: {required, numeric, maxLength: maxLength(3)},
    checkbox: {
      checked(val) {
        return val
      },
    },
  },

  data: () => ({
    name: '',
    email: '',
    offer: null,
    checkbox: false,
  }),

  computed: {
    checkboxErrors() {
      const errors = []
      if (!this.$v.checkbox.$dirty) return errors
      !this.$v.checkbox.checked && errors.push('You must agree to continue!')
      return errors
    },
    offerErrors() {
      const errors = []
      if (!this.$v.offer.$dirty) return errors
      !this.$v.offer.required && errors.push('Offer is required')
      !this.$v.offer.numeric && errors.push('Offer must be numeric')
      !this.$v.offer.maxLength && errors.push('Offer must be at most 3 characters long')
      return errors
    },
    nameErrors() {
      const errors = []
      if (!this.$v.name.$dirty) return errors
      !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
      !this.$v.name.required && errors.push('Name is required.')
      return errors
    },
    emailErrors() {
      const errors = []
      if (!this.$v.email.$dirty) return errors
      !this.$v.email.email && errors.push('Must be valid e-mail')
      !this.$v.email.required && errors.push('E-mail is required')
      return errors
    },
  },

  methods: {
    submit() {
      this.$v.$touch()
    },
    clear() {
      this.$v.$reset()
      this.name = ''
      this.email = ''
      this.offer = null
      this.checkbox = false
    },
  },
}
</script>