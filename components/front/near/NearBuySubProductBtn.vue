<template>
  <div class="buy-btn-area">

    <v-btn color="primary" @click="buy" width="200" v-if="currentUser">
      <v-icon>mdi-cart</v-icon>
      Buy with Near
    </v-btn>

    <near-auth :title="'Buy with Near'" :icon="'mdi-cart'" v-else></near-auth>

    <div class="btn-wrapper_1">
      <v-btn color="primary" width="200" @click="buy">
        <v-icon>mdi-label-multiple-outline</v-icon>
        Make Offer
      </v-btn>
    </div>

  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Big from 'big.js';
import NearAuth from "~/components/front/near/NearAuth";

export default {
  name: "NearBuySubProductBtn",
  components: {NearAuth},
  props: ['subProduct', 'product'],
  data() {
    return {
      user: '',
      price: 0,
    }
  },
  computed: mapGetters({
    contract: 'near/getContract',
    currentUser: 'near/getCurrentUser',
    nearConfig: 'near/getNearConfig',
    walletConnection: 'near/getWalletConnection',
    language: 'getLanguage',
  }),
  mounted() {
    this.initContract();
  },
  methods: {
    ...mapActions({
      initContract: 'near/initContract'
    }),
    getRandomInt(min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    },
    buy() {
      this.user = this.currentUser.accountId;
      this.price = this.product.main_price.price;

      const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

      this.contract.order(
          {
            itemId: this.product.id,
            itemName: this.product.translation.name,
            userName: this.user,
            price: parseFloat(this.price).toFixed(2)
          },
          BOATLOAD_OF_GAS,
          Big(this.price || '0').times(10 ** 24).toFixed()
      )
    }
  }
}
</script>

<style scoped>
.buy-btn-area {
  display: flex;
}
</style>