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
        <h3 class="c-title title-olive mt-3">NFTs Marketplace</h3>
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
                   v-for="(item, key) in products"
                   :key="key"
                   v-if="item.product.main_image">
              <nuxt-link :to="`/ro/marketplace/${item.product.alias}`" class="product">
                <v-img :src="`https://back.soledynft.shop/images/products/sm/${item.product.main_image.src}`"></v-img>
                <p class="product__name">{{ item.product.translation.name }}</p>
                <div class="product-properties-list">
                    <span class="product-properties-item"
                          v-for="(property, key) in filterProperties(item.properties)"
                          :key="key">
                      <b>{{ key }}:</b> {{ property }}
                    </span>
                </div>
                <div class="collectionOne__price price">
                  <span>{{ item.product.personal_price.price }}</span>
                  <span v-if="item.product.personal_price.old_price > item.product.personal_price.price">/</span>
                  <span class="price__discount"
                        v-if="item.product.personal_price.old_price > item.product.personal_price.price">
                    {{ item.product.personal_price.old_price }}
                  </span>
                  <span>{{ currency.abbr }}</span>

                </div>
              </nuxt-link>
              <span class="marketplace-btn-area">
                <near-buy-sub-product-btn :product="item.product"></near-buy-sub-product-btn>
              </span>
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
import NearBuyProductBtn from "~/components/front/near/NearBuyProductBtn"

export default {
  components: {FilterModal, SortModal, NearBuyProductBtn},
  async asyncData({app, params, store}) {
    let categ = null;
    let products = null;
    await contentApi.getMarketplaceCategory({
      lang: store.state.lang.lang,
      alias: 'nfts',
      currency: store.state.currency.id
    }, data => {
      categ = data.category
      products = data.products
    })
    return {
      category: categ,
      products: products
    }
  },
  watch: {
    async currency() {
      await contentApi.getMarketplaceCategory({
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
    }
  },
  computed: mapGetters({
    categories: 'getCategories',
    language: 'getLanguage',
    currency: 'getCurrency',
    trans: 'getTranslations',
  }),
  async mounted() {
    this.$nuxt.$on('replaceProducts', data => {
      this.products = data
    })

    this.$nuxt.$on('resetFilter', () => {
      contentApi.getMarketplaceCategory({
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
    filterProperties(properties) {
      return Object.assign(
          ...Object
              .keys(properties)
              .slice(0, 2)
              .map(k => ({[k]: properties[k]}))
      );
    },
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

<style lang="scss">
.marketplace-btn-area {
  padding-top: 20px;
  display: block;

  .btn-wrapper_1 {
    margin-left: 5px;
  }

  .buy-btn-area {
    display: flex;
    justify-content: space-between;

    button {
      background-color: #eddcd5 !important;
      width: auto !important;
      font-size: 13px;
      color: #734030 !important;
      padding: 6px !important;

      i {
        font-size: 14px;
      }
    }
  }
}

.product-properties-list {
  margin: 5px 5px 15px 5px;
  display: flex;
  justify-content: space-between;

  .product-properties-item {
    text-transform: none;
    display: inline-block;
    font-size: 13px;
    font-weight: bold;
    b {
      color: #5C591A;
      font-weight: normal;
    }
  }
}

</style>