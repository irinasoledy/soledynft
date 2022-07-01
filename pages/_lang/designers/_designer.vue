<template>
  <div class="designers" v-if="designer">

    <div class="banner">
      <div class="banner__image">
        <img :src="`https://back.soledynft.shop/images/brands/${designer.image}`" v-if="!$mobileDetect.mobile()">
        <img :src="`https://back.soledynft.shop/images/brands/${designer.logo}`" v-else>
      </div>
      <div class="banner__text">
        <div class="banner__title">
          {{ designer.translation.name }}
        </div>
      </div>
    </div>

    <v-container>
      <v-row class="justify-center">

        <v-col class="col-12">
          <h3 class="c-title title-olive my-3">{{ designer.translation.name }}</h3>
        </v-col>

        <v-col class="col-12" v-html="designer.translation.description "></v-col>

        <v-col class="col-auto">
          <div class="guaranty">
            <div class="guaranty__content">
              <div class="guaranty__item">
                <img src="/images/IMG_1070.PNG" alt=""><span>happy worker</span>
              </div>
              <div class="guaranty__item">
                <img src="/images/IMG_1071.PNG" alt=""><span>non-toxic dyes</span>
              </div>
              <div class="guaranty__item">
                <img src="/images/IMG_1072.PNG" alt=""><span>happy worid</span>
              </div>
              <div class="guaranty__item">
                <img src="/images/IMG_1073.PNG" alt=""><span>co-product</span>
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="col-12">
          <p class="designers__available">Available online</p>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-xl-2 col-lg-3 col-md-4 col-6"
               v-for="(product, i) in designer.products"
               :key="i"
               v-if="designer.products && product.main_image">
          <nuxt-link :to="getProductLink(product)" class="product">
            <v-img :src="`https://back.soledynft.shop/images/products/sm/${product.main_image.src}`"></v-img>
            <p class="product__name">{{ product.translation.name }}</p>
            <div class="collectionOne__price price">
              <span>{{ product.personal_price.price }}</span>
              <span v-if="product.personal_price.old_price < product.personal_price.price">/</span>
              <span class="price__discount" v-if="product.personal_price.old_price < product.personal_price.price">
                {{ product.personal_price.old_price }}
              </span>
              <span>{{ currency.abbr }} </span>
            </div>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>

  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import contentApi from '@/api/contentApi.js'

export default {
  async asyncData({app, params, store}) {
    let item = null
    await contentApi.getDesigner({
      lang: store.state.lang.lang,
      currency: store.state.currency.id,
      alias: params.designer
    }, data => {
      item = data
    })
    return {designer: item}
  },
  data: () => ({
    designer: null,
  }),
  computed: mapGetters({
    language: 'getLanguage',
    currency: 'getCurrency',
  }),
  methods: {
    ...mapActions({
      setDefaultChangedEmployee: 'setDefaultChangedEmployee'
    }),
    getProductLink(product) {
      if (product.category.alias === 'nfts') {
        return `/${this.language.lang}/marketplace/${product.alias}`;
      } else {
        return `/${this.language.lang}/categories/${product.category.alias}/${product.alias}`;
      }
    },
  }
}
</script>
