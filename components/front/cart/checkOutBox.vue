<template>
   <div>
       <v-form
           class="row"
           ref="formCheckOut"
           v-if="$auth.loggedIn"
           lazy-validation
           v-model="form.valid"
       >
           <v-col class="col-md-12">
               <h4>User Info:</h4>
           </v-col>
           <v-col class="col-md-4">
               <v-text-field
                   v-model="form.name"
                   :rules="form.rules.name"
                   label="Name"
               ></v-text-field>
           </v-col>
           <v-col class="col-md-4">
               <v-text-field
                   v-model="form.email"
                   :rules="form.rules.email"
                   label="Email"
               ></v-text-field>
           </v-col>
           <v-col class="col-md-4">
               <v-text-field
                   v-model="form.phone"
                   :rules="form.rules.phone"
                   label="Phone"
                   type="number"
               ></v-text-field>
           </v-col>
           <v-col class="col-md-12">
               <h4>Contacts:</h4>
           </v-col>
           <v-col class="col-md-6">
               <v-text-field
                   v-model="form.address"
                   :rules="form.rules.address"
                   label="Address"
               ></v-text-field>
           </v-col>
           <v-col class="col-md-6">
               <v-text-field
                   v-model="form.city"
                   :rules="form.rules.city"
                   label="City"
               ></v-text-field>
           </v-col>
           <v-col class="col-md-6">
               <v-text-field
                   v-model="form.country"
                   :rules="form.rules.country"
                   label="Country"
               ></v-text-field>
           </v-col>
           <v-col class="col-md-6">
               <v-text-field
                   v-model="form.postalCode"
                   :rules="form.rules.postalCode"
                   label="Postal Code"
                   type="number"
               ></v-text-field>
           </v-col>
       </v-form>
   </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    data() {
        return {
            form: {
                valid: false,
                name: this.$auth.user.name,
                email: this.$auth.user.email,
                phone: this.$auth.user.phone,
                address: '',
                city: '',
                country: '',
                postalCode: '',
                rules: {
                    name: [v => !!v || 'Name is required'],
                    email: [
                        v => !!v || 'E-mail is required',
                        v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
                    ],
                    phone: [v => !!v || 'Phone is required'],
                    address: [v => !!v || 'Address is required'],
                    city: [v => !!v || 'City is required'],
                    country: [v => !!v || 'Country is required'],
                    postalCode: [v => !!v || 'Postal Code is required'],
                }
            }
        }
    },
    computed: mapGetters({
        cart: 'cart/getCart',
    }),
    mounted() {
        this.$nuxt.$on('valiadateCheckoutForm', response => {
            this.validateForm(response)
        })
    },

    methods: {
        ...mapActions({
            removeCart: 'cart/removeCart',
        }),
        validateForm(response) {
            if (this.$refs.formCheckOut){
                if (this.$refs.formCheckOut.validate()) {
                    response.done()
                }
            }
            // this.$refs.form.reset()
        }
    }
}
</script>

<style scoped>
.v-form {
    padding-left: 10px;
}
</style>