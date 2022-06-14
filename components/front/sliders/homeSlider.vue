<template lang="html">
  <div class="banner" v-if="loaded">
    <slick
        v-if="!$mobileDetect.mobile()"
        ref="slick"
        :options="slickOptions"
    >
      <a :to="`/${language.lang}/promotions#${promotion.alias}`" class="slick--wrapp"
         v-for="(promotion, i) in promotions">
        <div class="fill-height-home-slider">
          <v-container>
            <v-row
                class="fill-height-home-slider slider-text-desktop text-left"
                align="center">
              <v-col cols="12" md="10" class="slider-text-video" v-if="promotion.video">
                <div class="display-1 c-title">
                  {{ promotion.translation.name }}
                </div>
                <div class="c-subtitle">
                  {{ promotion.translation.description }}
                </div>
                <v-btn
                    class="btn-custom"
                    color="accent"
                    :to="`/${language.lang}/promotions#${promotion.alias}`">
                  {{ promotion.translation.btn_text }}
                </v-btn>
              </v-col>
              <v-col class="col-md-5" v-else>
                <div class="display-1 c-title">
                  {{ promotion.translation.name }}
                </div>
                <div class="c-subtitle">
                  {{ promotion.translation.description }}
                </div>
                <v-btn
                    class="btn-custom"
                    color="accent"
                    :to="`/${language.lang}/promotions#${promotion.alias}`">
                  {{ promotion.translation.btn_text }}
                </v-btn>
              </v-col>
            </v-row>
          </v-container>
        </div>

        <img :src="`${envAPI}/images/promotions/${promotion.img}`" alt="">
      </a>
    </slick>

    <slick
        v-else
        ref="slick"
        :options="slickOptions">
      <a href="#" class="slick--wrapp" v-for="(promotion, i) in promotions">
        <div class="fill-height-home-slider">
          <v-row
              class="fill-height-home-slider slider-text-mobile"
              align="center"
              justify="center">
            <v-col md12 class="text-center">
              <div class="text-center c-title">
                {{ promotion.translation.name }}
              </div>
              <div class="text-center c-subtitle">
                {{ promotion.translation.description }}
              </div>
              <v-btn
                  class="btn-custom"
                  color="accent"
                  :to="`/${language.lang}/promotions#${promotion.alias}`">
                {{ promotion.translation.btn_text }}
              </v-btn>
            </v-col>
          </v-row>
        </div>
        <img :src="`${envAPI}/images/promotions/${promotion.img_mobile}`" alt="">
      </a>
    </slick>
  </div>
</template>

<script>

import 'slick-carousel/slick/slick.css';
import {mapGetters} from 'vuex'
import Slick from 'vue-slick'

export default {
  data() {
    return {
      loaded: false,
      slickOptions: {
        slidesToShow: 1,
        arrows: false,
        dots: true,
      },
    };
  },
  computed: mapGetters({
    promotions: 'getPromotions',
    trans: 'getTranslations',
    envAPI: 'getEnvAPI',
    language: 'getLanguage',
  }),
  mounted() {
    this.loaded = true
  },
  components: {Slick}
}
</script>

<style lang="scss">
.slick-slide img {
  width: 100%;
}

.fill-height-home-slider {
  position: absolute;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 3;
}

.slick--wrapp {
  position: relative;
}

.slick-list {
  text-align: center;
}

.slick-dots {
  text-align: center;
  list-style: none;
  background: rgba(0, 0, 0, .3);
  padding: 18px;
  padding-top: 10px;
  position: absolute;
  width: 100%;
  bottom: 0px;
}

.slick-dots li {
  display: inline-block;
  font-size: 0;
  color: trasparent;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: #DDD;
  margin: 0 5px;
}

.banner {
  .slick-active {
    background-color: #FFF !important;
  }
}

.c-title {
  margin-bottom: 50px;
}

.banner {
  margin-top: -45px;
}

.c-subtitle {
  margin-bottom: 20px;
  color: #FFF;
}

.btn-custom {
  color: $custom_blue !important;
}

.slider-text-mobile {
  width: 100%;
  margin-left: 0;
  margin-top: -55px;

  .c-title {
    font-size: 1.5rem !important;
    line-height: 1.2 !important;
    color: #FFF !important;
    margin-bottom: 20px !important;
  }

  .c-subtitle {
    font-size: 0.9rem !important;
    line-height: 1.2 !important;
    color: #FFF !important;
  }
}

.slider-text-desktop {
  .c-title {
    text-shadow: 2px 2px 9px #000;
    font-size: 3.3rem !important;
    text-transform: uppercase;
    color: #FFF !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    margin-bottom: 40px;
    letter-spacing: -2px;
  }

  .c-subtitle {
    line-height: 1.2 !important;
    font-size: 1.25rem !important;
    color: #FFF !important;
    margin-bottom: 40px;
    font-weight: bold !important;
    text-shadow: 2px 2px 9px #000;
  }
}

.slider-text-video {
  .c-title {
    text-shadow: 2px 2px 9px #000;
    font-size: 4rem !important;
    text-transform: uppercase;
    color: #FFF !important;
    font-weight: 700 !important;
    line-height: 1 !important;
    margin-bottom: 40px;
    letter-spacing: -2px;
  }

  .c-subtitle {
    line-height: 1.2 !important;
    font-size: 1.25rem !important;
    color: #FFF !important;
    margin-bottom: 40px;
    font-weight: bold !important;
    text-shadow: 2px 2px 9px #000;
  }
}

video {
  width: 100% !important;
}

.vjs_video_3-dimensions {
  height: auto !important;
}

.video-js {
  width: 100% !important;
  height: auto !important;
}

.vjs-control-bar {
  display: none !important;
}

.vjs-modal-dialog {
  display: none !important;
}

.vjs-control-text {
  display: none !important;
}

.vjs-big-play-button, .vjs-loading-spinner, .vjs-text-track-display, .vjs-poster {
  display: none !important;
}

.slick-dots {
  bottom: 28px;
}

@media (max-width: 991px) {
  .slick-dots {
    bottom: -5px;
  }
}
</style>
