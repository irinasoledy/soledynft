<template>
  <div class="banner" v-if="promotions">
    <VueSlickCarousel ref="productSlider" v-bind="settings" >

      <nuxt-link :to="`${language.lang}/promotions#${promotion.alias}`" class="banner__inner" v-for="(promotion, i) in promotions" :key="i">
        <div class="banner__image">
            <img :src="`${envAPI}/images/promotions/${promotion.img}`" alt="banner" v-if="!$mobileDetect.mobile()"/>
            <img :src="`${envAPI}/images/promotions/${promotion.img_mobile}`" alt="banner" v-else/>
        </div>
        <div class="banner__text">
          <div class="banner__title" v-if="promotion.translation">
<!--              {{ promotion.translation.name }}-->
          </div>
        </div>
      </nuxt-link>
    </VueSlickCarousel>
    <div class="custom-arrow next-slide" @click="nextSlide">
      <v-btn icon color="primary" rounded>
        <arrow-left />
      </v-btn>
    </div>
    <div class="custom-arrow prev-slide" @click="prevSlide">
      <v-btn icon color="primary" rounded>
        <arrow-left />
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

  import VueSlickCarousel from 'vue-slick-carousel'
  import 'vue-slick-carousel/dist/vue-slick-carousel.css'
  import ArrowLeft from '@/components/front/sliders/ArrowLeft.vue'
export default {
  name: 'HomeBannerCarousel',
  components: { VueSlickCarousel, ArrowLeft },
  data () {
    return {
      settings: {
        dots: false,
        slidesToScroll: 1,
        slidesToShow: 1,
        arrows: false,
        infinite: true
      }
    }
  },
  mounted(){},
  computed: mapGetters({
      promotions: 'getPromotions',
      collections: 'getCollections',
      language: 'getLanguage',
      envAPI: 'getEnvAPI'
  }),
  methods: {
    nextSlide () {
      this.$refs.productSlider.next()
    },
    prevSlide () {
      this.$refs.productSlider.prev()
    }
  }
}
</script>

<style lang="scss">
  .banner {
    position: relative;
    .custom-arrow {
      top: calc(50% - 17px);
      position: absolute
    }
    .next-slide {
      right: 15px;
      transform: rotate(180deg);
    }
    .prev-slide {
      left: 15px;
    }
    img{
        object-fit: fill !important;
    }
  }
</style>
