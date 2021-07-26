<template>
  <div class="banner">
    <VueSlickCarousel ref="productSlider" v-bind="settings" >
      <nuxt-link  to="/promotions" class="banner__inner" v-for="(item, i) in 4" :key="i">
        <div class="banner__image">
          <img src="https://cdn2.hubspot.net/hub/491011/hubfs/BLOG_6-technology-trends-reshaping-luxury-fashion-industry.jpg?width=1600&name=BLOG_6-technology-trends-reshaping-luxury-fashion-industry.jpg" alt="banner" />
        </div>
        <div class="banner__text">
          <div class="banner__title">
             vezi promotia {{i + 1}}
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
  }
</style>
