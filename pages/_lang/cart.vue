<template lang="html">
  <main class="content">

    <v-stepper v-model="stepper" class="cart-area">
      <v-container>
        <v-stepper-header>
          <template>
            <v-stepper-step
                key="1-step"
                :complete="stepper > 1"
                step="1"
                editable
            >
              Shopping cart
            </v-stepper-step>
            <v-divider></v-divider>
          </template>
          <template>
            <v-stepper-step
                key="2-step"
                :complete="stepper > 2"
                step="2"
                editable
            >
              Customer information
            </v-stepper-step>
            <v-divider></v-divider>
          </template>

          <template v-if="order">
            <v-stepper-step
                key="3-step"
                :complete="stepper > 3"
                :step="3"
                editable
            >
              Complete order
            </v-stepper-step>
          </template>
          <template v-else>
            <v-stepper-step
                key="3-step"
                :complete="stepper > 3"
                :step="3"
            >
              Complete order
            </v-stepper-step>

          </template>
        </v-stepper-header>
      </v-container>

      <v-stepper-items>
        <v-stepper-content step="1">
          <v-container>
            <v-row>
              <v-col class="col-md-8 cart-box">
                <cartBox/>
              </v-col>
              <v-col class="col-md-4 cart-summary">
                <cartSummary step="1" btnTitle="Continue to checkout"/>
              </v-col>
              <v-col><br>
                <p><b>We accept:</b></p>
                <img class="cards-img" src="/cards-img.png" alt="">
              </v-col>
            </v-row>

          </v-container>
        </v-stepper-content>

        <v-stepper-content step="2">
          <v-container>
            <v-row no-gutters>
              <v-col cols="12" md="8" sm="12" xs="12" class="cart-box">
                <checkOutBox/>
              </v-col>
              <v-col cols="12" md="4" sm="12" xs="12" class="cart-summary">
                <cartSummary step="2" btnTitle="Continue to payment"/>
              </v-col>
              <v-col><br>
                <p><b>We accept:</b></p>
                <img class="cards-img" src="/cards-img.png" alt="">
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>

        <v-stepper-content step="3">
          <v-container>
            <v-row>
              <v-col class="col-md-8 cart-box">
                <paymentBox/>
                <br>
                <p><b>We accept:</b></p>
                <img class="cards-img" src="/cards-img.png" alt="">
              </v-col>
              <v-col class="col-md-4 cart-summary">
                <cartSummary step="3" btnTitle="Pay"/>
              </v-col>
            </v-row>
          </v-container>
        </v-stepper-content>
      </v-stepper-items>
    </v-stepper>
  </main>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

import cartBox from '~/components/front/cart/CartBox'
import cartSummary from '~/components/front/cart/CartSummary'
import checkOutBox from '~/components/front/cart/CheckOutBox'
import paymentBox from "~/components/front/cart/PaymentBox";

export default {
  data() {
    return {
      stepper: 1,
      steps: [
        {id: 1, title: 'Shopping Cart'},
        {id: 2, title: 'Checkout'},
        {id: 3, title: 'Payment'},
      ],
    }
  },
  computed: mapGetters({
    cart: 'cart/getCart',
    order: 'cart/getOrder',
  }),
  watch: {
    steps(val) {
      if (this.stepper > val) {
        this.stepper = val
      }
    },
  },
  mounted() {
    this.$nuxt.$on('nextStep', step => {
      this.nextStep(step)
    })
  },
  methods: {
    ...mapActions({
      removeCart: 'cart/removeCart',
    }),
    nextStep(n) {
      n = parseInt(n)
      if (n === 3) {
        this.stepper = 1
      } else {
        this.stepper = n + 1
      }
    },
  },
  components: {
    cartBox, cartSummary, checkOutBox, paymentBox
  }
}
</script>