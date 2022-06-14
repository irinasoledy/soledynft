<template>
  <div class="filterModal-container">
    <v-sheet color="body" class="filterModal-container__header d-flex align-center" elevation="2">
      <v-card-subtitle>Sort by</v-card-subtitle>
      <v-spacer></v-spacer>
      <v-btn icon color="primary" @click="closeSortModal">
        <v-icon>mdi-close</v-icon>
      </v-btn>
    </v-sheet>
    <v-sheet class="filterModal-container__scroll pt-3">
      <div class="filter__group">
        <v-radio-group
            v-model="sort"
            column
            @change="sortBy()"
        >
          <v-radio
              label="Sort by price desc"
              value="priceDesc"
          ></v-radio>
          <v-radio
              label="Sort by price asc"
              value="priceAsc"
          ></v-radio>
        </v-radio-group>
      </div>
    </v-sheet>
    <v-sheet class="filterModal-container__footer pa-4" color="body" elevation="2">
      <v-btn block color="body">
        show results
      </v-btn>
    </v-sheet>
  </div>
</template>

<script>

import { mapGetters } from 'vuex'
import contentApi from '@/api/contentApi'

export default {
  props: ['category'],
  data() {
    return {
      sort: null
    }
  },
  computed: mapGetters({
    categories: 'getCategories',
    language: 'getLanguage',
    currency: 'getCurrency',
    trans: 'getTranslations',
  }),
  methods: {
    sortBy() {
      contentApi.sortProducts(
          {
            categoryId: this.category.id,
            sort: this.sort,
            lang: this.language.lang,
            currency: this.currency.id
          }, response => {
            this.$nuxt.$emit('replaceProducts', response)
            this.closeSortModal()
          })
    },
    closeSortModal() {
      this.$emit('closeSortModal')
    },
    openSortModal() {
      this.$emit('openSortModal')
    }
  }
}
</script>

<style lang="scss" scoped>
.filter {

  &__title {
    font-weight: 700;
    padding: 10px 0 15px;
    color: #0e0e0f;
    font-size: 14px;
    line-height: 16px;
    padding: 10px 0;
  }

  &__group {
    padding-bottom: 10px;
  }

  &__check {
    background: transparent !important;
  }

}

.filterModal-container {
  height: 100vh;
  position: relative;

  &__scroll {
    height: 100%;
    overflow: scroll;
    padding: 20px 14px;
  }

  &__header {
    position: sticky;
    z-index: 1;
    top: 0;
  }

  &__footer {
    position: sticky;
    z-index: 1;
    bottom: 0;
  }
}

.v-card__text {
  background: $bcg-body !important;
}
</style>
