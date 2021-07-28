<template>
  <v-container v-if="collection">
    <v-row>
      <v-col class="col-12">
        <h3 class="collectionOne__title">
          <span>{{ collection.translation.name }}</span>
        </h3>
      </v-col>

      <v-col class="col-12">
        <v-row v-for="(set, i) in collection.sets" :key="i" class="collectionsItems mb-8">
          <v-col class="col-12">
            <h4 class="collectionOne__subtitle">
              {{ set.translation.name }}
            </h4>
          </v-col>
          <v-col class="col-12">
            <div class="collectionOne">
              <v-row class="justify-space-between">
                <v-col class="col-lg-7 col-12">
                  <!-- <slider-one-product :images="collectionImages" @openZoom="openZoom" :productImages="collectionImages" /> -->
                </v-col>
                <v-col class="col-12 collectionOne__mobile">
                  <v-btn color="body" block>
                    Adauga setul
                    <!-- <cart /> -->
                    <span class="collectionOne__discount">
                      5%
                    </span>
                  </v-btn>
                  <div class="collectionOne__price price">
                    <span>190 RON</span>
                    <span>/</span>
                    <span class="price__discount">320</span>
                    <span>RON </span>
                  </div>
                </v-col>

                <!-- <v-col class="col-lg-4 col-12">
                  <v-row>
                    <v-col class="col-12 mt-6" v-for="(item, i) in 3" :key="i">
                      <div class="colProd__item">
                        <v-row>
                          <v-col class="col-4 pb-0">
                            <div class="colProd__image">
                              <img src="https://soledy.com/images/products/sm/necklace-anne-blush-s6.JPG?5fa2a780ed00b" alt="">
                            </div>
                          </v-col>
                          <v-col class="col-8 pb-0">
                            <div class="colProd__descr">
                              <div class="colProd__name">
                                Colier Anné Blush
                              </div>
                              <div class="colProd__price price">
                                <span>190 RON</span>
                                <span>/</span>
                                <span class="price__discount">320</span>
                                <span>RON </span>
                              </div>
                              <div class="colProd__color">
                                Black
                              </div>
                            </div>
                          </v-col>
                          <v-col class="col-12 pt-0">
                            <sizes :sizes="sizesOptions" />
                          </v-col>
                        </v-row>
                      </div>
                    </v-col>
                    <v-col class="col-12">
                      <div class="collectionOne__total">
                        <span>items selected: 3</span>
                        <div class="price ma-0">
                          <span>230$</span>
                        </div>
                      </div>
                    </v-col>
                    <v-col class="col-12">
                      <v-btn color="primary">
                        Add items to bag
                      </v-btn>
                    </v-col>
                  </v-row>
                </v-col> -->

              </v-row>
            </div>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- <zoom v-if="zoom" @closeZoom="zoom = false" :mainImage="mainImage" :productImages="collectionImages" /> -->
  </v-container>
</template>

<script>
import {mapActions, mapGetters} from 'vuex'

// import SliderOneProduct from '../components/carousel/SliderOneProduct.vue'
// import Cart from '../components/icons/Cart.vue'
// import Sizes from '../components/products/Sizes.vue'
// import Zoom from '../components/products/Zoom.vue'

export default {
  // components: {SliderOneProduct, Cart, Sizes, Zoom},
  data () {

    return {
        collection: null,
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
      collectionImages: [
        "https://www.nawpic.com/media/2020/desktop-backgrounds-nawpic-1.png",
        "https://www.nawpic.com/media/2020/desktop-backgrounds-nawpic-17.jpg",
        "https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg?size=626&ext=jpg&ga=GA1.2.1685543998.1622592000",
        "https://soledy.com/images/products/sm/necklace-anne-kelly-black-s4.JPG?5fa2a780ed00b",
        "https://soledy.com/images/products/sm/necklace-anne-kelly-black-s5.JPG?5fa2a780ed00b",
        "https://soledy.com/images/products/sm/necklace-anne-kelly-black-s6.JPG?5fa2a780ed00b"
      ],
      zoom: false,
      mainImage: null
    }
  },
  computed: mapGetters({
      collections: 'getCollections',
      language: 'getLanguage',
      trans: 'getTranslations',
  }),
  async mounted() {
      this.collection = await this.collections.find((collection) => collection.alias == this.$route.params.slugCollection)
      // this.title = this.service.translation.seo_title
      // this.description = this.service.translation.seo_description
      // this.setChatBotmessage(this.trans.General.botMessageTemplate1 + " " + this.service.translation.bot_message + '? '+ this.trans.General.botMessageTemplate2)
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
  .collectionOne {

    &__discount {
      font-family: $font-text-bold;
      font-size: 25px;
      color: $red-color;
      padding-left: 20px;
      letter-spacing: 0.04px;
      line-height: 1.2;
      text-align: center;
      padding-top: 3px;
    }
    &__total {
      display: flex;
      align-items: center;
      justify-content: space-between;
      color: $main-color;
      font-size: 18px;
      text-transform: uppercase;

      .price {
        font-size: 22px;
      }
    }
    .v-btn.body {
      color: $main-color !important;
      margin: 20px 0;

      .cart-icon {
        width: 15px;
        margin-left: 5px;
        margin-bottom: 5px;
      }
    }

    &__title,
    &__subtitle {
      font-size: 30px;
      text-align: center;
      font-family: $font-titles;
      color: $main-color;
      text-transform: uppercase;
      line-height: 1.5;
      margin-top: 20px;

      span {
        border-bottom: 1px solid $main-color;
      }
    }
    &__subtitle {
      font-size: 20px;
      margin-bottom: 20px;
    }
    &__button-desktop,
    &__price-desktop {
      display: none;
    }
  }
  .colProd {
    position: relative;
    &__item {
      position: relative;
      display: block;
      text-align: left;
    }
    &__name {
      font-size: 20px;
      font-family: $font-text;
      margin-bottom: 8px;
      display: block;
      line-height: 1;
      color: $main-color;
    }
    &__price {
      text-align: left;
      margin-bottom: 3px;
    }
    &__color {
      font-size: 20px;
      font-family: $font-text;
      color: $main-color;
      margin-top: 0;
    }
    &__image {
      img {
        width: 100%;
      }
    }
  }
  @media (min-width: 1200px) {
    .collectionOne {

      &__mobile {
        display: none;
      }
      &__button-desktop.v-btn.body {
        display: block;
        margin-top: 50px;
      }
      &__price-desktop {
        display: block;
      }
    }
    .container {
      max-width: 900px;
    }
    .collectionsItems {
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
      padding-bottom: 40px;
    }
  }
</style>
