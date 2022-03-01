<template>
  <div class="a-slider">
    <VueSlickCarousel ref="homeCarousel" v-bind="settings" >
      <div class="a-slider__item" v-for="(similar, i) in similars" :key="i">
        <nuxt-link :to="`/ro/categories/${similar.category.alias}/${similar.alias}`" class="a-slider__item-inner">
          <div class="a-slider__image">
              <v-img :src="`https://back.soledynft.shop/images/products/sm/${similar.main_image.src}`"></v-img>
          </div>
        </nuxt-link>
      </div>
    </VueSlickCarousel>
    <div class="custom-arrow next-slide" @click="nextSlide">
      <v-btn icon color="primary">
        <arrow-left />
      </v-btn>
    </div>
    <div class="custom-arrow prev-slide" @click="prevSlide">
      <v-btn icon color="primary">
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
  name: 'SimilarCarousel',
  components: { VueSlickCarousel, ArrowLeft },
  props: ['similars'],
  data () {
    return {
      settings: {
        dots: false,
        slidesToScroll: 1,
        slidesToShow: 3,
        arrows: false,
        infinite: true,
        responsive: [
          {
            breakpoint: 768,
            settings: {
              slidesToShow: 1
            }
          }
        ]
      }
    }
  },
  methods: {
    nextSlide () {
      this.$refs.homeCarousel.next()
    },
    prevSlide () {
      this.$refs.homeCarousel.prev()
    }
  }
}
</script>

<style lang="scss" scoped>
  .a-slider {
    &__item {
      position: relative;
      display: block;
      padding: 25px 16px;
    }
    &__inner {
      display: block;
    }
    &__image {
      img {
        width: 100%;
      }
    }
  }
  .a-slider {
    position: relative;
    .custom-arrow {
      position: absolute;
      z-index: 2;
      top: -34px;
      opacity: .5;

      &:hover {
        opacity: 1;
      }
    }
    .prev-slide {
      right: 45px;
    }
    .next-slide {
      right: 5px;
      transform: rotate(180deg);
    }
  }

</style>
