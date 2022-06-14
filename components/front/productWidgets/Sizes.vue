<template>
  <div>
    <div class="size">
      <div class="size__header">
        <span>Select your size</span>
        <span>Size Guide</span>
      </div>
      <div class="size__items">

        <div class="size__item" v-for="subproduct in product.subproducts" :key="subproduct.id">
          <label class="size__radio">
            <input type="radio" name="size" :value="subproduct.parameter_value.id"
                   @change="setSubproduct(subproduct.id)"/>
            <span class="size__mark">{{ subproduct.parameter_value.translation.name }}</span>
          </label>
        </div>

      </div>
    </div>
    <p class="alert-danger" v-if="alertChangeSize">{{ alertChangeSize }}</p>
    <v-btn color="body" class="mt-4" block @click="addToCart()">
      <v-icon>mdi-cart</v-icon>
      Add to cart
    </v-btn>
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
  props: ['product'],
  computed: mapGetters({
    cart: 'cart/getCart',
    userCartId: 'cart/getUserCartId',
    language: 'getLanguage',
    currency: 'getCurrency',
  }),
  data() {
    return {
      alertChangeSize: null,
      subproductId: null,
    }
  },
  methods: {
    ...mapActions({
      appendToCart: 'cart/appendToCart',
    }),
    addToCart() {
      this.alertChangeSize = null
      if (this.subproductId) {
        this.appendToCart({
          userId: this.userCartId,
          productId: this.product.id,
          subproductId: this.subproductId,
          lang: this.language.lang,
          currency: this.currency.id
        })
      } else {
        this.alertChangeSize = "Alegeti o marime!"
      }
    },
    setSubproduct(subproductId) {
      this.alertChangeSize = null
      this.subproductId = subproductId
    }
  }
}
</script>

<style lang="scss" scoped>
.size {
  &__header {
    font-size: 12px;
    color: $main-color;
    display: flex;
    justify-content: space-between;

    span:nth-child(2) {
      opacity: 0.5;
      text-decoration: underline;

      &:hover {
        opacity: 1;
      }
    }
  }

  &__items {
    display: flex;
    width: 100%;
    margin-top: 5px;
  }

  &__item {
    margin-right: 5px;
  }

  &__radio {
    min-width: 50px;
    height: 50px;
    position: relative;
    display: block;

    input {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }
  }

  &__mark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 9px;
    line-height: 50px;
    text-align: center;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(0, 0, 0, 0.6);
    z-index: 1;
  }

  input:checked ~ &__mark {
    color: $main-color;
    border-color: $main-color;
    border-width: 2px;
  }
}

.alert-danger {
  color: #C0392B;
  padding-top: 20px;
}
</style>
