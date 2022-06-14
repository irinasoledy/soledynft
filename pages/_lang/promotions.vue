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
                  <v-col class="col-lg-3 col-md-4 col-6" v-for="(product, i) in promotion.products" :key="i"
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
                <!-- </v-expansion-panel-content> -->
              </v-expansion-panel>
            </v-expansion-panels>
          </v-col>
        </v-row>
      </v-container>
    </div>
    <v-row class="experts">
      <v-col class="col-12">
        <h3 class="p-title-experts">{{ $trans('DetailsProductSet', 'viewLiveProducts') }}</h3>
      </v-col>
    </v-row>
  </div>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
  computed: mapGetters({
    promotions: 'getPromotions',
    currency: 'getCurrency',
    language: 'getLanguage',
    envAPI: 'getEnvAPI'
  }),
}
</script>

<style lang="scss" scoped>
button.v-expansion-panel-header {
  padding: 0 !important;
  justify-content: center;
  color: $main-color;
  background-color: $bcg-body;
  max-width: 400px;
  margin: auto;
}

.v-expansion-panel {
  background-color: $bcg-body !important;
}

.v-expansion-panel-header__icon {
  margin-left: 5px;
  color: $main-color;
}

.v-expansion-panel::before {
  box-shadow: none !important;
}

.v-expansion-panel-content {
  margin-left: -24px;
  margin-right: -24px;
}

.promotions {
  overflow: hidden;
}

@media (min-width: 1200px) {
  button.v-expansion-panel-header {
    font-size: 20px;
  }
}

.product {
  &__name,
  &__price {
    display: block;
    font-family: $font-text;
    font-size: 14px;
    color: $olive-color;
    letter-spacing: 0;
    text-align: center;
    line-height: 1.2;
    margin-top: 10px;
    margin-bottom: 0;
  }
}
</style>
