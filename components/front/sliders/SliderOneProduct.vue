<template>
  <div class="p-slider">
    <VueSlickCarousel ref="productSlider" v-bind="settings">
      <div class="p-slider__item" v-for="(item, i) in images" :key="i">
        <div class="p-slider__image">
          <img :src="`https://back.soledynft.shop/images/${path}/md/${item.src}`" alt="" @click="openZoom">
        </div>
      </div>
    </VueSlickCarousel>
    <div class="custom-arrow next-slide" @click="nextSlide">
      <v-btn icon color="primary">
        <arrow-left/>
      </v-btn>
    </div>
    <div class="custom-arrow prev-slide" @click="prevSlide">
      <v-btn icon color="primary">
        <arrow-left/>
      </v-btn>
    </div>
  </div>
</template>

<script>

import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import VueSlickCarousel from 'vue-slick-carousel'
import ArrowLeft from '@/components/front/sliders/ArrowLeft.vue'

export default {
  name: 'SliderOneProduct',
  components: {VueSlickCarousel, ArrowLeft},
  props: ["images", "path"],
  data() {
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
    nextSlide() {
      this.$refs.productSlider.next()
    },
    prevSlide() {
      this.$refs.productSlider.prev()
    },
    openZoom(e) {
      if (window.outerWidth > 768) {
        const zoomImg = e.target.getAttribute('src')
        this.$emit('openZoom', zoomImg)
      }
    }
  }
}
</script>

<style lang="scss">
.p-slider {
  position: relative;

  &__item {
    position: relative;
    display: block;
  }

  &__image {
    img {
      width: 100%;
      cursor: zoom-in;
    }
  }

  .custom-arrow {
    top: calc(50% - 10px);
    position: absolute;
    opacity: .5;

    &:hover {
      opacity: 1;
    }
  }

  .next-slide {
    right: 15px;
    transform: rotate(180deg);
    top: calc(50% - 5px);
  }

  .prev-slide {
    left: 15px;
  }

  .slick-dots {
    position: absolute;
    list-style: none;
    top: 40px;
    right: 20px;

    button {
      font-size: 0;
      height: 10px;
      width: 10px;
      border-radius: 50%;
      background: $main-color;
      opacity: .4;
    }

    .slick-active button {
      background: $olive-color;
      opacity: 1;
    }
  }
}
</style>
