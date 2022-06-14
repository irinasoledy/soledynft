<template lang="html">
  <main class="margin-top">
    <v-container>
      <v-row>
        <v-col>
          <v-progress-linear
              color="primary accent-4"
              indeterminate
              rounded
              height="6"
          ></v-progress-linear>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
  computed: mapGetters({
    order: 'cart/getOrder',
    total: 'cart/getTotal',
    language: 'getLanguage',
  }),
  mounted() {
    this.pay({
      userId: this.$auth.user._id,
      orderId: this.order._id,
      amount: this.total
    }).then(res => {
      this.resetOrder()
      this.$router.push(`/${this.language.lang}/thank-you?order=${order._id}`)
    })
  },
  methods: {
    ...mapActions({
      pay: 'cart/pay',
      resetOrder: 'cart/resetOrder'
    }),
  }
}
</script>

<style lang="css" scoped>
.margin-top {
  margin-top: 150px;
}
</style>
