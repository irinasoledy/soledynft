<template>
  <v-list-item-content>
    <v-btn block outlined color="primary" :to="`/${language.lang}/account`" v-if="currentUser">
      Account
    </v-btn>
    <v-btn block outlined color="primary" @click="signIn" v-else>
      {{ $trans('ContactsAndForms', 'authSignIn') }}
    </v-btn>
  </v-list-item-content>
</template>

<script>
import {mapGetters} from 'vuex';

export default {
  name: "NearAuth",
  computed: mapGetters({
    contract: 'near/getContract',
    currentUser: 'near/getCurrentUser',
    nearConfig: 'near/getNearConfig',
    walletConnection: 'near/getWalletConnection',
  }),
  methods: {
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
