<template>
  <div class="btn-wrapper_1">
    <v-dialog
        v-if="currentUser"
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
          <v-card-text v-if="!sent">
            <form>
              <v-text-field
                  type="number"
                  v-model="offer"
                  label="Your Price"
                  required
              ></v-text-field>
              <v-alert prominent type="error" v-if="error.length">
                {{ error }}
              </v-alert>
              <v-btn
                  class="mr-4 primary"
                  @click="submit" block
              >
                submit
              </v-btn>
            </form>
          </v-card-text>
          <v-card-text v-else>
            <v-spacer></v-spacer>
            <h2 class="mt-4 text-center">Thank you, your offer is in process.</h2>
            <h3 class="mt-4 text-center"><i>{{ sent }}</i></h3>
            <v-btn
                class="mr-4 mt-4 primary"
                @click="dialog.value = false" block
            >
              Close
            </v-btn>
          </v-card-text>
        </v-card>
      </template>
    </v-dialog>
    <near-auth v-else :title="'Make Offer'" :icon="'mdi-label-multiple-outline'"></near-auth>
  </div>
</template>

<script>
import {mapGetters} from 'vuex';
import NearAuth from "~/components/front/near/NearAuth";
import userApi from "~/api/userApi";

export default {
  props: ['itemId', 'type'],
  components: {NearAuth},
  data: () => ({
    offer: null,
    error: [],
    sent: false
  }),
  computed: {
    ...mapGetters({
      contract: 'near/getContract',
      currentUser: 'near/getCurrentUser',
      nearConfig: 'near/getNearConfig',
      walletConnection: 'near/getWalletConnection',
      language: 'getLanguage',
      currency: 'getCurrency'
    }),
  },
  methods: {
    submit() {
      this.error = '';
      if (this.offer) {
        const data = {
          userId: this.currentUser.accountId,
          price: this.offer,
          productId: this.itemId,
          lang: this.language.lang,
          currency: this.currency.id
        };

        userApi.makeOffer(data, async response => {
          this.sent = response.data.message;
            this.$nuxt.$emit('update-product-offers');
        }, async error => {
          this.error = error;
        })
      } else {
        this.error = 'Price field is required';
      }
    },
  },
}
</script>