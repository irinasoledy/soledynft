<template>
  <v-app>
    <Header/>
    <v-main class="py-13">
      <nuxt/>
    </v-main>
    <Footer/>
  </v-app>
</template>

<script>

import {mapActions, mapGetters} from 'vuex';
import Header from '~/components/front/partials/Header';
import Footer from '~/components/front/partials/Footer';

export default {
  components: {
    Header,
    Footer
  },
  mounted() {
    this.initContract();
  },
  computed: mapGetters({
    contract: 'near/getContract',
    currentUser: 'near/getCurrentUser',
    nearConfig: 'near/getNearConfig',
    walletConnection: 'near/getWalletConnection',
  }),
  methods: {
    ...mapActions({
      initContract: 'near/initContract'
    }),
  }
};
</script>

<style lang="scss">
a {
  text-decoration: none;
}

.v-application .v-btn.body {
  border: 1px solid $main-color !important;
  color: $red-color !important;
  border-radius: 0 !important;
}

.v-btn {
  border-radius: 0 !important;
}

body,
.theme--light.v-application {
  background: $bcg-body !important;
}
</style>
