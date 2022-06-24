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
.oneProduct-content {
  max-width: 1500px;
}
.moreProducts {
  border: 2px solid $main-color;
  padding: 15px;
  margin-bottom: 20px;
  span {
    color: $main-color;
  }
  .v-btn {
    width: 100%
  }
  .row {
    align-items: center;
  }
}
.help {
  align-items: center;
  color: $main-color;
  font-size: 12px;
  margin-top: 20px;
  .col {
    padding: 0 10px;
  }
  span {
    padding-bottom: 15px;
  }
  .v-btn {
    display: flex;
    margin-bottom: 0 !important;
  }
  .v-icon {
    margin-right: 5px;
  }
}
.productOne {
  &__name {
    font-family: $font-titles;
    font-size: 25px;
    color: $olive-color;
    letter-spacing: 0;
    line-height: 17px;
    text-align: left;
    text-transform: uppercase;
    margin-top: 20px;
    line-height: 1.5;
  }
  &__price {
    margin-top: 10px;
    text-transform: uppercase;
    font-size: 18px;
    font-family: $font-roboto;
    font-weight: 400;
    color: $main-color;
  }
  &__discount {
    position: absolute;
    top: -40px;
    right: 0;
    width: 100px;
    height: 100px;
    // background-image: url("./static/discountIcon.png");
    background-size: 110%;
    background-position: center center;
    font-family: $font-text-bold;
    font-size: 25px;
    color: $red-color;
    padding-left: 20px;
    letter-spacing: 0.04px;
    line-height: 1.2;
    text-align: center;
    display: -ms-flex;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: center;
    -ms-flex-pack: center;
    justify-content: center;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -ms-flex-direction: column;
    flex-direction: column;
    padding-top: 20px;
  }
  &__by {
    color: $main-color;
    font-size: 12px;
  }
  &__exp {
    padding: 0;
    &::before {
      box-shadow: none;
    }
    div {
      padding: 0 !important;
    }
  }
  .v-expansion-panel,
  .v-expansion-panel__header {
    background-color: $bcg-body !important;
  }
  .v-expansion-panel-content__wrap {
    padding: 0  30px !important;
  }
  &__exp &__bloc-text {
    padding: 0;
  }
  &__exp-header {
    color: $olive-color;
    padding: 0;
    text-transform: uppercase;
  }
  &__bloc {
    padding-top: 10px;
    margin-bottom: 0;
    border-top: 1px solid rgba(0, 0, 0, 0.12);
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  }
  &__bloc-text {
    font-family: $font-roboto;
    font-size: 13px;
    line-height: 1.7;
    text-align: left;
    color: $main-color;
    font-weight: 300;
    padding: 0 24px 0;
    a {
      text-decoration: underline;
    }
  }
  &__bloc-title {
    color: $olive-color;
    padding: 0;
    font-size: 0.9375rem;
    line-height: 1;
    min-height: 30px;
    display: flex;
    align-items: center;
    text-transform: uppercase;
  }
  .v-btn.body {
    color: $main-color !important;
  }
  .v-btn {
    margin-bottom: 15px;
    .cart-icon {
      width: 15px;
      margin-left: 10px;
      margin-bottom: 6px;
    }
  }
}
.p-title {
  text-align: left;
  color: $main-color;
  font-family: $font-titles;
  font-size: 25px;
  letter-spacing: -0.11px;
  text-align: center;
  text-transform: uppercase;
  line-height: 1.3;
}
.p-subtitle {
  text-align: center;
  font-size: 20px;
  color: $olive-color;
  letter-spacing: -0.11px;
  font-family: $font-titles;
}
.prof {
  padding-bottom: 15px;
  &__iamge {
    position: relative;
  }
  &__indicator {
    position: absolute;
    top: 35px;
    left: 35px;
  }
  .v-card__actions {
    display: flex;
    justify-content: center;
  }
  .v-btn {
    border-radius: 9px !important;
  }
}
.v-input--selection-controls {
  margin-top: 5px;
}
.productOne .exp__point {
  color: $main-color;
  margin-bottom: 10px;
  position: relative;
  margin-left: 10px !important;
  &:after {
    content: "";
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: $main-color;
    opacity: .5;
    position: absolute;
    left: 0;
    top: 6px;
  }
}
.buyOn {
  margin-top: 30px;
  padding-top: 20px;
  border-top: 1px solid rgba(0, 0, 0, 0.12);
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  &__header {
    color: $olive-color;
    text-transform: uppercase;
    margin-bottom: 10px;
  }
  img {
    width: auto;
    height: 50px;
  }
  .v-btn {
    width: auto;
    height: auto;
    margin-right: 10px;
    &:last-child {
      img {
        height: 40px;
      }
    }
  }
  span {
    width: 100% !important
  }
}
.ozon-icon img {
  height: 30px !important;
}
.guaranty {
  padding-bottom: 20px;
  padding-top: 20px;
  border-bottom: 1px solid rgba(0, 0, 0, 0.12);
  &__header {
    color: $olive-color;
    text-transform: uppercase;
  }
  &__content {
    display: flex;
    align-items: center;
    margin-top: 10px;
  }
  &__item {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-right: 10px;
    span {
      font-size: 10px;
      color: $main-color;
      text-transform: uppercase;
    }
  }
  img {
    width: 60px
  }
}
.color {
  margin-top: 15px;
  margin-bottom: 40px;
}
@media (min-width: 1200px) {
  .additional-title {
    font-size: 30px;
  }
}
.exp__point {
  padding-left: 30px !important;
}
.productOne__bloc-text {
  padding: 0 0px !important;
}
.v-expansion-panel-header {
  max-width: 100% !important;
}
</style>
