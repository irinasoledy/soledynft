<template>
  <div class="header-account" v-if="contract">
    <v-btn outlined color="primary" @click="signIn" v-if="!currentUser">
      {{ $trans('ContactsAndForms', 'authSignIn') }}
    </v-btn>

    <div class="near-account">
      <NuxtLink v-if="currentUser" class="near-logo" :to="`/${language.lang}/account`" nuxt>
      <span>
        <svg height="20" viewBox="0 0 20 20" width="20" xmlns="http://www.w3.org/2000/svg" fill="currentColor">
        <path
            d="m16.0444 1.02222-4.1777 6.2c-.2889.42222.2666.93334.6666.57778l4.1111-3.57778c.1112-.08889.2667-.02222.2667.13334v11.17774c0 .1556-.2.2223-.2889.1111l-12.44442-14.888844c-.4-.488889-.97778-.755556-1.62222-.755556h-.44445c-1.155554 0-2.11111.955556-2.11111 2.13333v15.73337c0 1.1777.955556 2.1333 2.13333 2.1333.73334 0 1.42223-.3778 1.82223-1.0222l4.17777-6.2c.28889-.4222-.26666-.9334-.66666-.5778l-4.11111 3.5556c-.11112.0888-.26667.0222-.26667-.1334v-11.15553c0-.15556.2-.22223.28889-.11111l12.44442 14.88884c.4.4889 1 .7556 1.6222.7556h.4445c1.1778 0 2.1333-.9556 2.1333-2.1333v-15.73337c-.0222-1.177774-.9778-2.13333-2.1555-2.13333-.7334 0-1.4223.377778-1.8223 1.02222z"></path>
        </svg>
      </span>
        <span>
        {{ currentUser.accountId }}
      </span>
      </NuxtLink>
      <a href="#" @click="signOut" v-if="currentUser">
        <i class="fa fa-arrow-left"></i> logout
      </a>
    </div>
  </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';

export default {
  name: "NearAuth",
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
      initContract : 'near/initContract'
    }),
    signOut() {
      this.walletConnection.signOut();
      window.location.replace(window.location.origin + window.location.pathname);
    },
    signIn() {
      this.walletConnection.requestSignIn(
          {contractId: this.nearConfig.contractName, methodNames: [this.contract.addMessage.name]},
          'NEAR Prototype Vue',
          null,
          null,
      )
    }
  }
}
</script>

<style>
.header-account {
  color: #734030;
}

.near-logo svg {
  width: 16px;
  height: 11px;
  display: inline-flex;
  align-self: center;
}

.near-account a {
  display: block;
  text-align: center;
}
.near-account a i{
  /*font-size: 13px;*/
}
</style>
