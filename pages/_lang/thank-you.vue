<template>
  <main class="thank-you-area" v-if="order">
    <v-container class="text-center">
      <v-row>
        <v-col>
          <h2>Thank You</h2>
        </v-col>
      </v-row>
      <v-row>
        <v-col>
          <h3>For your order</h3>
        </v-col>
      </v-row>
      <v-divider></v-divider>
      <v-row>
        <v-col><br>
          <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid atque autem dolore ex
            excepturi maiores molestias nemo nulla obcaecati pariatur quasi qui quod reiciendis rerum sit
            veniam vitae, voluptas.</p>
        </v-col>
      </v-row>

      <v-row v-if="order">
        <v-simple-table class="full-width">
          <template v-slot:default>
            <thead>
            <tr>
              <th class="text-center">ID</th>
              <th class="text-center"></th>
              <th class="text-center">Product</th>
              <th class="text-center">Qty</th>
              <th class="text-center">Unit Price</th>
              <th class="text-center">Price</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(cartsProduct, index) in order.cart.products" :key="cartsProduct.id">
              <td>{{ index + 1 }}</td>
              <td class="cart-image">
                <nuxt-link
                    :to="`/${language.lang}/categories/${cartsProduct.product.category.alias}/${cartsProduct.product.alias}`">
                  <img :src="`https://back.soledynft.shop/images/products/sm/${cartsProduct.product.main_image.src}`"
                       alt="">
                </nuxt-link>
              </td>
              <td class="str-col" v-if="cartsProduct.product.translation">
                <nuxt-link
                    :to="`/${language.lang}/categories/${cartsProduct.product.category.alias}/${cartsProduct.product.alias}`">
                  {{ cartsProduct.product.translation.name }}
                </nuxt-link>
              </td>
              <td class="text-center qty-area str-col">
                <span>{{ cartsProduct.qty }}</span>
              </td>
              <td class="str-col">{{ cartsProduct.product.personal_price.price }} EUR</td>
              <td class="str-col">{{ cartsProduct.product.personal_price.price * cartsProduct.qty }} EUR</td>
            </tr>

            <tr v-for="(cartsSubproduct, index) in order.cart.subproducts" :key="cartsSubproduct.id">
              <td>{{ cartsProducts.length + index + 1 }}</td>
              <td class="cart-image">
                <nuxt-link
                    :to="`/${language.lang}/categories/${cartsSubproduct.subproduct.product.category.alias}/${cartsSubproduct.subproduct.product.alias}`">
                  <img
                      :src="`https://back.soledynft.shop/images/products/sm/${cartsSubproduct.subproduct.product.main_image.src}`"
                      alt="">
                </nuxt-link>
              </td>
              <td class="str-col" v-if="cartsSubproduct.subproduct.product.translation">
                <nuxt-link
                    :to="`/${language.lang}/categories/${cartsSubproduct.subproduct.product.category.alias}/${cartsSubproduct.subproduct.product.alias}`">
                  {{ cartsSubproduct.subproduct.product.translation.name }}
                  <p><small><b>Size: {{ cartsSubproduct.subproduct.parameter_value.translation.name }}</b></small></p>
                </nuxt-link>
              </td>
              <td class="text-center qty-area str-col">
                <span>{{ cartsSubproduct.qty }}</span>
              </td>
              <td class="str-col">{{ cartsSubproduct.subproduct.product.personal_price.price }} EUR</td>
              <td class="str-col">{{ cartsSubproduct.subproduct.product.personal_price.price * cartsSubproduct.qty }}
                EUR
              </td>
            </tr>
            </tbody>
          </template>
        </v-simple-table>
      </v-row>

      <v-row>
        <v-col v-if="order">
          <strong> Amount : {{ order.amount }} EUR</strong>
        </v-col>
      </v-row>
      <v-row>
        <v-col><br>
          <v-btn color="primary" :to="`/${language.lang}/`">
            <v-icon>mdi-home</v-icon>
            go back home
          </v-btn>
        </v-col>
        <v-col><br>
          <v-btn color="primary" :to="`/${language.lang}/account/orders`">
            <v-icon>mdi-format-list-bulleted</v-icon>
            go to history orders
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </main>
</template>

<script>
import { mapGetters } from 'vuex'
import cartApi from '@/api/cartApi'

export default {
  data() {
    return {
      order: null,
    }
  },
  computed: mapGetters({
    language: 'getLanguage',
  }),
  mounted() {

    cartApi.getOrder(this.$route.query.order, res => {
      this.order = res
      console.log(res.cart.products);
    })
  }
}
</script>

<style scoped>
.thank-you-area {
  min-height: 500px;
  margin-top: 150px;
}

.full-width {
  width: 100% !important;
}

.cart-image img {
  max-width: 50px;
}
</style>
