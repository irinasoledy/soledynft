<template>
  <div class="promotions" v-if="promotions">
    <div class="banner" v-for="(promotion, i) in promotions" :key="i" :id="`${promotion.alias}`">

      <nuxt-link to="#" class="banner__inner">
        <div class="banner__image">
          <img :src="`${envAPI}/images/promotions/${promotion.img}`" v-if="!$mobileDetect.mobile()" width="100%">
          <img :src="`${envAPI}/images/promotions/${promotion.img_mobile}`" v-else width="100%">
        </div>
        <div class="banner__text">
          <div class="banner__title" v-if="promotion.translation">
            {{ promotion.translation.name }}
          </div>
        </div>
      </nuxt-link>

      <v-container>
        <v-row>
          <v-col class="col-12">
            <v-expansion-panels v-if="promotion.products.length">
              <v-expansion-panel>
                <v-row>
                  <v-col class="col-lg-3 col-md-4 col-6"
                         v-for="(product, i) in promotion.products"
                         :key="i"
                         v-if="product.main_image">
                    <nuxt-link :to="`/${language.lang}/categories/${product.category.alias}/${product.alias}`"
                               class="product">
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
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>

    </div>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'

export default {
  computed: mapGetters({
    promotions: 'getPromotions',
    currency: 'getCurrency',
    language: 'getLanguage',
    envAPI: 'getEnvAPI'
  }),
}
</script>