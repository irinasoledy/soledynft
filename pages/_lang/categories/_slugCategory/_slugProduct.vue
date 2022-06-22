<template>
  <v-container class="oneProduct-content" v-if="product">
    <v-row>

      <v-col class="col-12">
        <div class="productOne mt-6">
          <v-row class="justify-space-between">
            <v-col class="col-lg-6 col-12">
              <slider-one-product :images="product.images"
                                  @openZoom="openZoom"
                                  :productImages="product.images"
                                  path="products"/>
            </v-col>
            <v-col class="col-lg-6 col-12">
              <p class="productOne__name">{{ product.translation.name }}</p>
              <p class="productOne__by" v-if="product.brand">by {{ product.brand.translation.name }}</p>
              <p class="productOne__price">
                {{ product.personal_price.price }}
                <span v-if="product.personal_price.old_price > product.personal_price.price">/</span>
                <span class="price__discount" v-if="product.personal_price.old_price > product.personal_price.price">
                  {{ product.personal_price.old_price }}
                </span>
                {{ currency.abbr }}
              </p>

              <sizes :product="product" v-if="product.subproducts.length"/>

              <div class="mt-4" v-else>
                <near-buy-sub-product-btn :product="product" ></near-buy-sub-product-btn>
              </div>

              <div class="buyOn">
                <div class="buyOn__header">
                  {{ $trans('DetailsProductSet', 'buyItOn') }}
                </div>
                <div class="buyOn__methods">
                  <v-btn icon target="_blank" :href="`${product.amazon}`">
                    <img src="/images/amazon_icon.png" alt="">
                  </v-btn>
                  <v-btn icon class="ozon-icon" target="_blank" :href="`${product.ozon}`">
                    <img src="/images/ozon.png" height="30px">
                  </v-btn>
                  <v-btn icon target="_blank" :href="`${product.w_b}`">
                    <img src="/images/wolf.png" alt="">
                  </v-btn>
                </div>
              </div>

              <div class="guaranty">
                <div class="guaranty__header">
                  {{ $trans('DetailsProductSet', 'GuaranteesSustainability') }}
                </div>
                <div class="guaranty__content">
                  <div class="guaranty__item">
                    <img src="/images/IMG_1070.PNG" alt="">
                    <span>happy worker</span>
                  </div>
                  <div class="guaranty__item">
                    <img src="/images/IMG_1071.PNG" alt="">
                    <span>non-toxic dyes</span>
                  </div>
                  <div class="guaranty__item">
                    <img src="/images/IMG_1072.PNG" alt="">
                    <span>happy worid</span>
                  </div>
                  <div class="guaranty__item">
                    <img src="/images/IMG_1073.PNG" alt="">
                    <span>co-product</span>
                  </div>
                </div>
              </div>

              <v-expansion-panels accordion>
                <v-expansion-panel aria-expanded="true" class="productOne__exp">
                  <v-expansion-panel-header class="productOne__exp-header">
                    {{ $trans('DetailsProductSet', 'productDescr') }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <p class="productOne__bloc-text" v-html="product.translation.body"></p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="productOne__exp" v-if="product.translation.info">
                  <v-expansion-panel-header class="productOne__exp-header">
                    {{ $trans('DetailsProductSet', 'careAndInfo') }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <p class="productOne__bloc-text" v-html="product.translation.info"></p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
                <v-expansion-panel class="productOne__exp">
                  <v-expansion-panel-header class="productOne__exp-header">
                    <!-- Deliveries & Returns -->
                    {{ $trans('DetailsProductSet', 'deliveriesAndReturnsTitle') }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <div class="exp__point">
                      {{ $trans('DetailsProductSet', 'deliveriesAndReturnsSubitle1') }}
                    </div>
                    <p class="productOne__bloc-text">
                      {{ $trans('DetailsProductSet', 'deliveriesAndReturnsList1.1') }}
                      <br>
                      <br>
                      {{ $trans('DetailsProductSet', 'deliveriesAndReturnsList1.2') }}
                      <br>
                      <br>
                      {{ $trans('DetailsProductSet', 'deliveriesAndReturnsList1.3') }}
                      <br>
                      <br>
                      {{ $trans('DetailsProductSet', 'deliveriesAndReturnsList1.4') }}
                    </p>
                    <div class="exp__point">
                      {{ $trans('DetailsProductSet', 'deliveriesAndReturnsSubtitle2') }}
                    </div>
                    <p class="productOne__bloc-text">
                      {{ $trans('DetailsProductSet', 'deliveriesAndReturnsList2.1') }}
                    </p>
                    <div class="exp__point">
                      {{ $trans('DetailsProductSet', 'deliveriesAndReturnsSubtitle3') }}
                    </div>
                    <p class="productOne__bloc-text">
                      {{ $trans('DetailsProductSet', 'deliveriesAndReturnsList3.1') }}
                    </p>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-expansion-panels>
              <div class="productOne__bloc" v-if="product.brand">
                <div class="productOne__bloc-title">
                  {{ $trans('DetailsProductSet', 'meetTheDesignerTitle') }}
                </div>
                <p class="productOne__bloc-text" v-html="product.brand.translation.description"></p>
              </div>
              <v-row class="help">
                <v-col class="col-md col-12">
                  <span>{{ $trans('Contacts', 'needHelp') }}</span>
                </v-col>
                <v-col class="col-md col-6">
                  <v-btn color="primary" small text :href="`tel:${$trans('Contacts', 'phoneNumber')}`">
                    <v-icon>mdi-phone</v-icon>
                    {{ $trans('Contacts', 'phoneNumber') }}
                  </v-btn>
                </v-col>
                <v-col class="col-md col-6">
                  <v-btn color="primary" small text :href="`mailto:${$trans('Contacts', 'email')}`">
                    <v-icon>mdi-mail</v-icon>
                    {{ $trans('Contacts', 'email') }}
                  </v-btn>
                </v-col>
              </v-row>
            </v-col>
          </v-row>
        </div>
      </v-col>
      <v-col class="col-12"></v-col>

      <v-col class="col-12 mt-lg-8">
        <v-row>
          <v-col class="col-12 mt-lg-8" v-if="similars">
            <h3 class="additional-title">{{ $trans('DetailsProductSet', 'similarProducts') }}</h3>
            <similar-slider :similars="similars"/>
          </v-col>
        </v-row>
      </v-col>

    </v-row>

    <zoom v-if="zoom" @closeZoom="zoom = false" :mainImage="mainImage" :productImages="productImages" path="products"/>

  </v-container>
</template>

<script>

import {mapGetters} from 'vuex'
import contentApi from '@/api/contentApi'
import SliderOneProduct from '@/components/front/sliders/SliderOneProduct.vue'
import SimilarSlider from '@/components/front/sliders/SimilarCarousel.vue'
import CartBtn from '~/components/front/cart/CartBtn.vue'
import Sizes from '@/components/front/productWidgets/Sizes.vue'
import Zoom from '@/components/front/productWidgets/Zoom.vue'
import NearBuyProductBtn from "~/components/front/near/NearBuyProductBtn"
import NearBuySubProductBtn from "~/components/front/near/NearBuySubProductBtn";

export default {
  components: {NearBuySubProductBtn, SliderOneProduct, SimilarSlider, Sizes, Zoom, CartBtn, NearBuyProductBtn},
  async asyncData({app, params, store}) {
    let prod = null
    let similars1 = null
    await contentApi.getProduct({
      lang: store.state.lang.lang,
      alias: params.slugProduct,
      currency: store.state.currency.id
    }, data => {
      prod = data.product
      similars1 = data.similars
    })
    return {
      similars: similars1,
      product: prod,
      productImages: prod.images
    }
  },
  watch: {
    async currency() {
      await contentApi.getProduct({
        lang: this.language.lang,
        alias: this.product.alias,
        currency: this.currency.id
      }, data => {
        this.product = data.product
        this.similars = data.similars
        this.productImages = this.product.images
      })
    },
  },
  computed: mapGetters({
    categories: 'getCategories',
    language: 'getLanguage',
    currency: 'getCurrency',
    trans: 'getTranslations',
  }),
  data() {
    return {
      product: null,
      productImages: [],
      zoom: false,
      mainImage: null
    }
  },
  methods: {
    openZoom(image) {
      console.log(image);
      this.mainImage = image
      this.zoom = true
    }
  }
}
</script>

<style lang="scss">
.buyOn__methods {
  .v-btn--icon.v-size--default {
    width: auto !important;
  }
}
.productOne__bloc {
  .v-application p {
    padding: 0;
  }
}
</style>
