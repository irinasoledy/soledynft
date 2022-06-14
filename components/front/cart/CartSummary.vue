<template>
  <v-card class="summary">
    <v-card-title>Summary:</v-card-title>
    <div v-if="total > 0">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <v-row>
              <v-col class="col-xs-9">Shipping Price</v-col>
              <v-col class="col-xs-3 text-right">15 EUR</v-col>
            </v-row>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title>
            <v-row>
              <v-col class="col-xs-9">Subtotal</v-col>
              <v-col class="col-xs-3 text-right">{{ subtotal }} EUR</v-col>
            </v-row>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-divider></v-divider>
      <v-list-item class="total-section">
        <v-list-item-content>
          <v-list-item-title>
            <v-row>
              <v-col class="col-xs-9">Total</v-col>
              <v-col class="col-xs-3 text-right">{{ total }} EUR</v-col>
            </v-row>
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item>
        <v-list-item-content></v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-btn large color="primary" @click="nextStep()">{{ btnTitle }}</v-btn>
        <v-btn large text v-if="step > 1" @click="prevStep()">
          <v-icon>mdi-chevron-double-left</v-icon>
          Back
        </v-btn>
      </v-card-text>
    </div>
    <v-card-text v-else>
      unfortunately, the items added are priceless
    </v-card-text>
  </v-card>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
  props: ['step', 'btnTitle'],
  data() {
    return {
      show: false
    }
  },
  computed: mapGetters({
    cart: 'cart/getCart',
    subtotal: 'cart/getSubtotal',
    total: 'cart/getTotal',
    shippingPrice: 'cart/getShippingPrice'
  }),
  mounted() {
    window.addEventListener('scroll', this.handleScroll);
  },
  methods: {
    ...mapActions({
      removeCart: 'cart/removeCart',
    }),
    handleScroll() {
      const summaries = document.getElementsByClassName('summary')

      for (let i = 0; i < summaries.length; i++) {
        if (summaries[i]) {
          if (!this.$mobileDetect.mobile()) {
            if (window.scrollY > 85) {
              summaries[i].classList.add("fixed")
            } else {
              summaries[i].classList.remove("fixed")
            }
          }
        }
      }
    },
    nextStep() {
      let step = parseInt(this.step)
      if (step === 1) {
        this.$nuxt.$emit('nextStep', step++)
        return
      }
      if (step === 2) {
        this.$nuxt.$emit('valiadateCheckoutForm', {
          done: response => {
            this.$nuxt.$emit('nextStep', step++)
          }
        })
        return
      }
      if (step === 3) {
        this.$nuxt.$emit('valiadatePayment', {
          done: response => {
            alert('yes')
          }
        })
        return false
      }
    },
    prevStep() {
      let step = this.step
      this.$nuxt.$emit('nextStep', step - 2)
    },
  }
}
</script>

<style>
.summary {
  width: 370px;
  margin-left: 20px;
}

.fixed {
  position: fixed;
  margin-top: -80px;
  margin-left: 20px;
  background-color: #FFF;
}

.v-btn--icon.v-size--default {
  height: 20px;
  width: 20px;
  margin-top: -3px;
}

.v-btn--icon.v-size--default .v-icon, .v-btn--fab.v-size--default .v-icon {
  font-size: 19px;
}

@media (max-width: 991px) {
  .summary {
    width: 100%;
    margin-left: 0;
  }

}

.total-section div {
  font-size: 20px;
}
</style>
