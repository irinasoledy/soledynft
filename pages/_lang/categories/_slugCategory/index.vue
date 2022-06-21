<template>
  <v-container v-if="category">

    <v-navigation-drawer v-model="filterModal" fixed color="body" temporary>
      <filter-modal @closeFilterModal="closeFilterModal" :category="category"/>
    </v-navigation-drawer>

    <v-navigation-drawer v-model="sortModal" fixed color="body" temporary>
      <sort-modal @closeSortModal="closeSortModal" :category="category"/>
    </v-navigation-drawer>

    <v-row>
      <v-col cols="12">
        <h3 class="c-title title-olive mt-3">{{ category.translation.name }}</h3>
      </v-col>

      <v-col class="col-12">

        <div class="category-container">
          <div class="filter">
            <v-btn large @click="openFilterModal">
              <v-icon color="title" class="mr-2">mdi-filter</v-icon>
              Filter
            </v-btn>
            <v-btn large @click="openSortModal">
              <v-icon color="title" class="mr-2">mdi-sort</v-icon>
              Sort
            </v-btn>
          </div>

          <v-row>
            <v-col class="col-lg-3 col-6 mb-2"
                   v-for="(product, key) in products"
                   :key="key"
                   v-if="product.main_image">
              <nuxt-link :to="`/ro/categories/${category.alias}/${product.alias}`" class="product">
                <v-img :src="`https://back.soledynft.shop/images/products/sm/${product.main_image.src}`"></v-img>
                <p class="product__name">{{ product.translation.name }}</p>
                <div class="collectionOne__price price">
                  <span>{{ product.personal_price.price }}</span>
                  <span v-if="product.personal_price.old_price > product.personal_price.price">/</span>
                  <span class="price__discount" v-if="product.personal_price.old_price > product.personal_price.price">
                    {{ product.personal_price.old_price }}
                  </span>
                  <span>{{ currency.abbr }} </span>
                </div>
              </nuxt-link>
            </v-col>
          </v-row>

        </div>
      </v-col>
    </v-row>

  </v-container>
</template>

<script>

import {mapGetters} from 'vuex'
import contentApi from '@/api/contentApi'
import FilterModal from '@/components/front/productWidgets/FilterModal.vue'
import SortModal from '@/components/front/productWidgets/SortModal.vue'

export default {
  components: {FilterModal, SortModal},
  async asyncData({app, params, store}) {
    let categ = null
    await contentApi.getCategory({
      lang: store.state.lang.lang,
      alias: params.slugCategory,
      currency: store.state.currency.id
    }, data => {
      categ = data
    })
    return {
      category: categ
    }
  },
  watch: {
    async currency() {
      await contentApi.getCategory({
            lang: this.language.lang,
            alias: this.category.alias,
            currency: this.currency.id
          },
          data => {
            this.category = data
            this.products = this.category.products
          }
      )
    },
  },
  data() {
    return {
      category: null,
      filterModal: false,
      sortModal: false,
      products: null
    }
  },
  computed: mapGetters({
    categories: 'getCategories',
    language: 'getLanguage',
    currency: 'getCurrency',
    trans: 'getTranslations',
  }),
  async mounted() {
    this.products = this.category.products
    this.$nuxt.$on('replaceProducts', data => {
      this.products = data
    })

    this.$nuxt.$on('resetFilter', () => {
      contentApi.getCategory({
        lang: this.language.lang,
        alias: this.category.alias,
        currency: this.currency.id
      }, data => {
        this.category = data
        this.products = this.category.products
      })
    })
  },
  methods: {
    openFilterModal() {
      this.filterModal = true
    },
    closeFilterModal() {
      this.filterModal = false
    },
    openSortModal() {
      this.sortModal = true
    },
    closeSortModal() {
      this.sortModal = false
    }
  }
}
</script>