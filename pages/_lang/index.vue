<template>
  <div class="h-content">

    <home-banner-carousel/>

    <div class="h-sections">

      <section class="h-section" v-for="(item, index) in items" :key="index">

        <h3 class="h-section__title">
          {{ item.view.translation.name }}
        </h3>

        <home-carousel-sets :sets="item.view.sets" :collection="item.view" v-if="item.type === 'collection'"/>

        <home-carousel-products :products="item.view.products" :category="item.view" v-else/>

        <div class="h-section__button">
          <v-btn nuxt :to="`/${language.lang}/collections/${item.view.alias}`" outlined color="primary"
                 v-if="item.type === 'collection'">
            {{ $trans('DetailsProductSet', 'viewItemsFromSet') }}
          </v-btn>
          <v-btn nuxt :to="`/${language.lang}/categories/${item.view.alias}`" outlined color="primary" v-else>
            {{ $trans('DetailsProductSet', 'viewProducts') }}
          </v-btn>
        </div>

      </section>

    </div>

  </div>
</template>

<script>

import {mapGetters} from 'vuex'
import HomeCarouselSets from '@/components/front/sliders/HomeCarouselSets.vue'
import HomeCarouselProducts from '@/components/front/sliders/HomeCarouselProducts.vue'
import HomeBannerCarousel from '@/components/front/sliders/HomeBannerCarousel.vue'

export default {
  components: {HomeBannerCarousel, HomeCarouselSets, HomeCarouselProducts},
  computed: mapGetters({
    categories: 'getCategories',
    collections: 'getCollections',
    language: 'getLanguage'
  }),
  data() {
    return {
      items: null
    }
  },
  mounted() {
    const items = []
    this.categories.forEach((category, i) => {
      if (category.on_home === 1) {
        items.push({type: 'category', view: category})
      }
      if (typeof this.collections[i] !== 'undefined') {
        if (this.collections[i].on_home === 1) {
          items.push({type: 'collection', view: this.collections[i]})
        }
      }
    })
    this.items = items
  }
}
</script>

<style lang="scss">

</style>
