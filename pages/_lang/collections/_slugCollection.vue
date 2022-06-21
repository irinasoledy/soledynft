<template>
  <v-container v-if="collection">
    <v-row>

      <v-col class="col-12">
        <h3 class="collectionOne__title"><span>{{ collection.translation.name }}</span></h3>
      </v-col>

      <v-col class="col-12">
        <v-row v-for="(set, i) in collection.sets" :key="i" class="collectionsItems mb-8">
          <v-col class="col-12">
            <h4 class="collectionOne__subtitle" :id="set.alias">
              {{ set.translation.name }}
            </h4>
          </v-col>

          <v-col class="col-12">
            <div class="collectionOne">
              <v-row class="justify-space-between">
                <v-col class="col-lg-7 col-12">
                  <slider-one-product :images="set.photos"
                                      @openZoom="openZoom"
                                      :productImages="set.photos"
                                      path="sets"/>
                </v-col>

                <set-products :set="set"/>

              </v-row>
            </div>
          </v-col>

          <zoom v-if="zoom"
                @closeZoom="zoom = false"
                :mainImage="mainImage"
                :productImages="set.photos"
                path="sets"/>

        </v-row>
      </v-col>

    </v-row>
  </v-container>
</template>

<script>
import {mapGetters} from 'vuex'
import SliderOneProduct from '@/components/front/sliders/SliderOneProduct.vue'
import SetProducts from '@/components/front/productWidgets/SetProducts.vue'
import Sizes from '@/components/front/productWidgets/Sizes.vue'
import Zoom from '@/components/front/productWidgets/Zoom.vue'
import contentApi from '@/api/contentApi'

export default {
  components: {
    SliderOneProduct,
    Sizes,
    Zoom,
    SetProducts,
  },
  async asyncData({app, params, store}) {
    let collect = null
    await contentApi.getCollection({
      lang: store.state.lang.lang,
      currency: store.state.currency.id,
      alias: params.slugCollection
    }, data => {
      collect = data
    })
    return {
      collection: collect,
    }
  },
  watch: {
    async currency() {
      await contentApi.getCollection({
        lang: this.language.lang,
        currency: this.currency.id,
        alias: this.collection.alias
      }, data => {
        this.collection = data
      })
    },
  },
  data() {
    return {
      collection: null,
      collectionImages: [],
      zoom: false,
      mainImage: null
    }
  },
  computed: mapGetters({
    collections: 'getCollections',
    language: 'getLanguage',
    currency: 'getCurrency',
    trans: 'getTranslations',
  }),
  methods: {
    getTotalSetPrice(products) {
      let price = 0
      for (var i = 0; i < products.length; i++) {
        price += parseInt(products[i].product.personal_price.price)
      }
      return parseFloat(price).toFixed(2)
    },
    openZoom(image) {
      this.mainImage = image
      this.zoom = true
    }
  }
}
</script>
