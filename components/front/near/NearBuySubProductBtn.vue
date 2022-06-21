<template>
  <v-btn color="body" class="mt-4" block @click="buy">
    <v-icon>mdi-cart</v-icon>
    Buy with Near
  </v-btn>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
import Big from 'big.js';

export default {
  name: "NearBuySubProductBtn",
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
      this.user = "User " + this.getRandomInt(12000, 90000);
      this.price = this.product.main_price.price / 100;

      const BOATLOAD_OF_GAS = Big(3).times(10 ** 13).toFixed();

      this.contract.addMessage(
          {productName: this.product.translation.name, userName: this.user, price: parseFloat(this.price).toFixed(2)},
          BOATLOAD_OF_GAS,
          Big(this.price || '0').times(10 ** 24).toFixed()
      )
    }
  }
}
</script>

<style scoped>

</style>