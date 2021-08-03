<template>
    <v-container class="oneProduct-content" v-if="product">
        <v-row>
            <v-col class="col-12">
                <div class="productOne mt-6">
                    <v-row class="justify-space-between">
                        <v-col class="col-lg-5 col-12">
                            <slider-one-product :images="product.images" @openZoom="openZoom" :productImages="product.images" path="products"/>
                        </v-col>
                        <v-col class="col-lg-5 col-12">
                            <p class="productOne__name">{{ product.translation.name }}</p>
                            <p class="productOne__by">by Emily Laura Designs</p>
                            <p class="productOne__price">{{ product.personal_price.price }} {{ currency.abbr }}</p>

                            <!-- {{ product.subproducts }} -->

                            <sizes :sizes="sizesOptions" :subproducts="product.subproducts" v-if="product.subproducts.length"/>

                            <v-btn color="body" class="mt-4" block>
                                Add to cart
                                <!-- <cart /> -->
                                <span class="productOne__discount"> 5% </span>
                            </v-btn>
                            <div class="buyOn">
                                <div class="buyOn__header">
                                    Buy it on
                                </div>
                                <div class="buyOn__methods">
                                    <v-btn icon>
                                        <img src="/images/amazon_icon.png" alt="">
                                    </v-btn>
                                    <v-btn icon>
                                        <img src="/images/ebay.png" alt="">
                                    </v-btn>
                                    <v-btn icon>
                                        <img src="/images/etsy.png" alt="">
                                    </v-btn>
                                    <v-btn icon>
                                        <img src="/images/wolf.png" alt="">
                                    </v-btn>
                                </div>
                            </div>
                            <div class="guaranty">
                                <div class="guaranty__header">
                                    Sustainability Guarantees
                                </div>
                                <div class="guaranty__content">
                                    <div class="guaranty__item">
                                        <img src="/images/IMG_1070.png" alt="">
                                        <span>happy worker</span>
                                    </div>
                                    <div class="guaranty__item">
                                        <img src="/images/IMG_1071.png" alt="">
                                        <span>non-toxic dyes</span>
                                    </div>
                                    <div class="guaranty__item">
                                        <img src="/images/IMG_1072.png" alt="">
                                        <span>happy worid</span>
                                    </div>
                                    <div class="guaranty__item">
                                        <img src="/images/IMG_1073.png" alt="">
                                        <span>co-product</span>
                                    </div>
                                </div>
                            </div>
                            <v-expansion-panels accordion>
                                <v-expansion-panel aria-expanded="true" class="productOne__exp">
                                    <v-expansion-panel-header class="productOne__exp-header">
                                        product description
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <p class="productOne__bloc-text">
                                            Soledy's Colier Anné Blush - Începînd cu anul 2012, colierul iconic ”Anné”, solicitat în peste 20 de țări, rămîne a fi colierul de semnătură al designerului Anné Popova, executat din elemente florale unice,detalii de semnatură ale colecțiilor ”Anné Popova”.
                                            <br>
                                            <br>
                                            Culoare: Blush
                                            <br>
                                            <br>
                                            Compoziţie: Margele, Elemente textile realizate manual, Bronz antic, Piese metalice nealergice, Mătase artificială, Flori
                                            <br>
                                            <br>
                                            Faceți un tur pentru a descoperi uimitoarele și adorabilele Bijuteri handmade, coliere handmade, coliere dama, coliere din margele, coliere elegante de seara, coliere femei, set colier si cercei, coliere lungi în magazinul online multi-brand Fashion Soledy. Mărci comerciale originale de modă pentru femei cu gust remarcabil!
                                        </p>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="productOne__exp">
                                    <v-expansion-panel-header class="productOne__exp-header">
                                        CARE & INFO
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <p class="productOne__bloc-text">
                                            How to look after your earrings:
                                            <br>
                                            <br>
                                            Polymer clay is a delicate material so trying to avoid dropping and putting pressure on the earrings will ensure a long life with your pair! The earrings have been coated in a varnish to protect the hand painted designs but please avoid getting them wet.
                                            <br>
                                            <br>
                                            Materials: <br>
                                            Polymer Clay (PVC, Plasticizer, Additive), Acrylic Paint, Polymer Varnish with UVLS (Matte), Rose Gold Links, Stainless Steel Studs.
                                            <br>
                                            <br>
                                            Handmade by artisan company Emily Laura Designs in the UK.
                                        </p>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                                <v-expansion-panel class="productOne__exp">
                                    <v-expansion-panel-header class="productOne__exp-header">
                                        Deliveries & Returns
                                    </v-expansion-panel-header>
                                    <v-expansion-panel-content>
                                        <div class="exp__point">
                                            Delivery
                                        </div>
                                        <p class="productOne__bloc-text">
                                            COVID-19: We're open online and shipping as usual, though there may be minor delays in some cases.
                                            <br>
                                            <br>
                                            FREE DELIVERY on orders over $200 in USA / C$250 in Canada / A$300 in Australia / 200€ in Europe
                                            <br>
                                            <br>
                                            Items are shipped to you directly by our brands, using tracked, contactless delivery.
                                            <br>
                                            <br>
                                            All customs fees, duties and taxes are included - see Delivery page for full details, conditions apply.
                                        </p>
                                        <div class="exp__point">Returns</div>
                                        <p class="productOne__bloc-text">
                                            FREE RETURNS worldwide within 14 days of delivery - see Returns page for full details.
                                        </p>
                                        <div class="exp__point">Price Match Guarantee</div>
                                        <p class="productOne__bloc-text">
                                            If you find an item cheaper elsewhere we will match the price, see FAQs or Contact Us for full details, conditions apply. Please note we're unable to offer a price match for products sold through independent retailers, or being shipped internationally.
                                        </p>
                                    </v-expansion-panel-content>
                                </v-expansion-panel>
                            </v-expansion-panels>
                            <div class="productOne__bloc">
                                <div class="productOne__bloc-title">
                                    Meet the designer
                                </div>
                                <p class="productOne__bloc-text">
                                    Emily Laura Designs is a woman owned business inspired by uniqueness, slowmade fashion and homeware and a passion for colour and nature.
                                    <br> <br>
                                    Emily hand makes every one of her products, creating truly unique fabrics and jewellery. Whether you are looking to add a pop of colour and warmth to your home or outfit, Emily's work will ensure you stand out by design and quality.
                                </p>
                            </div>
                            <v-row class="help">
                                <v-col class="col-md col-12">
                                    <span>NEED HELP?:</span>
                                </v-col>
                                <v-col class="col-md col-6">
                                    <v-btn color="primary" small text href="tel:+4402036950011">
                                        <v-icon>mdi-phone</v-icon>
                                        +44 (0) 20 3695 0011
                                    </v-btn>
                                </v-col>
                                <v-col class="col-md col-6">
                                    <v-btn color="primary" small text href="mailto:info@likemedia.com">
                                        <v-icon>mdi-mail</v-icon>
                                        info@likemedia.com
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
            <v-col class="col-12">
                <div class="moreProducts">
                    <v-row>
                        <v-col class="col-md-4 col-12">
                            <span>Not quite found the product for you?</span>
                        </v-col>
                        <v-col class="col-md-8 col-12">
                            <v-row>
                                <v-col class="col-md-6 col-12">
                                    <v-btn color="primary" nuxt to="/one-designer">
                                        view more from this designer
                                    </v-btn>
                                </v-col>
                                <v-col class="col-md-6 col-12">
                                    <v-btn color="primary" outlined to="/all-products" nuxt>
                                        view more earrings
                                    </v-btn>
                                </v-col>
                            </v-row>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
            <v-col class="col-12 mt-lg-8">
                <v-row>
                    <!-- <v-col class="col-12">
                        <h3 class="p-title">VEZI LIVE PRODUSELE</h3>
                        </v-col>
                        <v-col class="col-12">
                        <h4 class=" p-subtitle">Consulta-te live cu Consultantii nostri Fashion</h4>
                        </v-col> -->
                    <!-- <v-col class="col-12">
                        <v-row>
                          <v-col class="col-12 col-md-6 col-lg-4" v-for="(item, i) in 3" :key="i">
                            <v-card class="prof">
                              <v-card-text class="prof__image">
                                <v-img src="https://i.redd.it/6onq25y0sh311.jpg"></v-img>
                                <v-chip color="green" class="prof__indicator">Online</v-chip>
                              </v-card-text>
                              <v-card-actions>
                                <v-btn color="primary" outlined>
                                  <v-icon>mdi-chat</v-icon>
                                  Chat
                                </v-btn>
                              </v-card-actions>
                            </v-card>
                          </v-col>
                        </v-row>
                        </v-col>

                        <v-col class="col-12 mt-lg-8">
                        <h3 class="additional-title">Completează-ți Look-ul</h3>
                        <similar-slider />
                        </v-col>
                        <v-col class="col-12 mt-lg-8" >
                        <h3 class="additional-title">Produse Similare</h3>
                        <similar-slider />
                        </v-col> -->
                </v-row>
            </v-col>
        </v-row>
        <zoom v-if="zoom" @closeZoom="zoom = false" :mainImage="product.main_image" :productImages="productImages" />
    </v-container>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import contentApi from '@/api/contentApi'

import SliderOneProduct from '@/components/front/sliders/SliderOneProduct.vue'
import SimilarSlider from '@/components/front/sliders/SimilarCarousel.vue'

// import Cart from '../components/icons/Cart.vue'
// import Colors from '@/components/front/productWidgets/Colors.vue'

import Sizes from '@/components/front/productWidgets/Sizes.vue'
import Zoom from '@/components/front/productWidgets/Zoom.vue'

export default {
  components: {SliderOneProduct, SimilarSlider, Sizes, Zoom},
  async asyncData({ app, params, store }) {
      let prod = null
      await contentApi.getProduct({lang: store.state.lang.lang, alias: params.slugProduct, currency: store.state.currency.id}, data => {
          prod = data
      })
      return {
          product: prod,
          productImages: prod.images
      }
  },
  computed: mapGetters({
      categories: 'getCategories',
      language: 'getLanguage',
      currency: 'getCurrency',
      trans: 'getTranslations',
  }),
  data () {
    return {
        product: null,
      sizesOptions: [
        {
          label: "XS",
          value: "xs",

        },
        {
          label: "S",
          value: "s",
          selected: true
        },
        {
          label: "M",
          value: "m"
        },
        {
          label: "L",
          value: "l"
        },
        {
          label: "XL",
          value: "xl"
        },
        {
          label: "XXL",
          value: "xxl"
        }
      ],
      colorOptions: [
        {
          label: "Red",
          value: "red"
        },
        {
          label: "Green",
          value: "green",
          selected: true
        },
        {
          label: "Purple",
          value: "purple"
        },
        {
          label: "White",
          value: "white"
        },
        {
          label: "Black",
          value: "black"
        }
      ],
      productImages: [
        "https://soledy.com/images/products/sm/necklace-anne-kelly-black-s1.JPG?5fa2a780ed00b",
        "https://soledy.com/images/products/sm/necklace-anne-kelly-black-s2.JPG?5fa2a780ed00b",
        "https://soledy.com/images/products/sm/necklace-anne-kelly-black-s3.JPG?5fa2a780ed00b",
        "https://soledy.com/images/products/sm/necklace-anne-kelly-black-s4.JPG?5fa2a780ed00b",
        "https://soledy.com/images/products/sm/necklace-anne-kelly-black-s5.JPG?5fa2a780ed00b",
        "https://soledy.com/images/products/sm/necklace-anne-kelly-black-s6.JPG?5fa2a780ed00b"
      ],
      zoom: false,
      mainImage: null
    }
  },
  methods: {
    openZoom (image) {
      this.mainImage = image
      this.zoom = true
    }
  }
}
</script>

<style lang="scss" scoped>
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
      padding: 0 !important;
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
    padding-left: 20px !important;

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
</style>
