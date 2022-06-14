<template>
  <v-container>
    <v-row>

      <v-col class="col-12">
        <h3 class="c-title title-olive my-3">Outlet</h3>
      </v-col>

      <v-col class="col-lg-3 col-md-4 col-6 mb-2"
             v-for="(product, key) in products"
             :key="key"
             v-if="products.length > 0">
        <nuxt-link :to="`/ro/categories/${product.category.alias}/${product.alias}`" class="product">
          <v-img :src="`${envAPI}/images/products/md/${product.main_image.src}`"></v-img>
          <p class="product__name">{{ product.translation.name }}</p>
          <div class="collectionOne__price price">
            <span>{{ product.personal_price.price }}</span>
            <span v-if="product.personal_price.old_price > product.personal_price.price">/</span>
            <span class="price__discount"
                  v-if="product.personal_price.old_price > product.personal_price.price">
              {{ product.personal_price.old_price }}
            </span>
            <span>{{ currency.abbr }} </span>
          </div>
        </nuxt-link>
      </v-col>

    </v-row>

    <v-row class="experts" v-if="products.length > 0">
      <v-col class="col-12">
        <h3 class="p-title-experts">{{ $trans('DetailsProductSet', 'viewLiveProducts') }}</h3>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>

import {mapGetters} from 'vuex'
import contentApi from '@/api/contentApi'

export default {
  async asyncData({app, params, store}) {
    let prods = null
    await contentApi.getOutletProducts({
      lang: store.state.lang.lang,
      currency: store.state.currency.id,
    }, data => {
      prods = data
    })
    return {
      products: prods,
    }
  },
  watch: {
    async currency() {
      await contentApi.getOutletProducts({
        lang: this.language.lang,
        currency: this.currency.id,
      }, data => {
        this.products = data
      })
    },
  },
  computed: mapGetters({
    categories: 'getCategories',
    language: 'getLanguage',
    currency: 'getCurrency',
    trans: 'getTranslations',
    envAPI: 'getEnvAPI',
  }),
  data() {
    return {
      products: null
    }
  }
}
</script>

<style>
.product__name {
  text-align: center !important;
}
</style>
