<template>
  <div class="h-content">
    <home-banner-carousel />
    <div class="h-sections">
        
      <section class="h-section">
        <h3 class="h-section__title">
          Adorable Collection
        </h3>
        <home-carousel />
        <div class="h-section__button">
          <v-btn nuxt to="/one-collection" outlined color="primary">
            Vezi produsele
          </v-btn>
        </div>
      </section>

    </div>
    <about />
  </div>
</template>

<script>
import HomeCarousel from '@/components/front/sliders/HomeCarousel.vue'
import HomeBannerCarousel from '@/components/front/sliders/HomeBannerCarousel.vue'
import About from '@/components/front/widgets/About.vue'

export default {
  components: {HomeCarousel, About, HomeBannerCarousel}
}
</script>

<style lang="scss">
  .h-slider {
    position: relative;
    .custom-arrow {
      position: absolute;
      z-index: 2;
      top: -30px;
    }
    .prev-slide {
      right: 45px;
    }
    .next-slide {
      right: 5px;
    }
    .slick-slide {
      width: 320px;
      margin: 0 0px;
    }
  }
  .h-section {
    padding-top: 40px;
    max-width: 1880px;
    margin-left: auto;
    margin-right: auto;
    &__title {
      font-family: $font-titles;
      font-weight: 300;
      font-size: 30px;
      color: #B22D00;
      letter-spacing: 0;
      line-height: 26px;
      max-width: 80%;
      padding-left: 15px;
    }
    &__button {
      text-align: center;
      margin-top: 20px;
      display: none;
    }

    &:nth-child(even) {

      .h-section {
        &__title {
          color: $olive-color;
        }
      }
    }
  }
  @media (min-width: 1200px) {
    .h-slider {

      .slick-slide {
        width: 400px;
      }
    }
    .h-section {
      &__title {
        font-size: 40px;
        line-height: 2;
      }
      &__button {
        display: block;
      }
    }
  }
</style>
