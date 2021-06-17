<template lang="html">
    <div class="banner">
        <slick
              v-if="!$mobileDetect.mobile()"
              ref="slick"
              :options="slickOptions"
              >
              <a href="#" class="slick--wrapp" v-for="(promotion, i) in promotions">
                  <div class="fill-height-home-slider">
                      <v-row
                          class="fill-height-home-slider"
                          align="center"

                          >
                          <v-col class="text-center col-md-6">
                              <div class="display-1 text-center c-title">
                                  {{ promotion.translation.name }}
                              </div>
                              <div class="text-center c-subtitle">
                                  {{ promotion.translation.description }}
                              </div>
                              <v-btn
                                  class="btn-custom"
                                  color="accent"
                                  :to="`/${language.lang}/promotions#${promotion.alias}`"
                              >{{ promotion.translation.btn_text }}</v-btn>
                          </v-col>
                      </v-row>
                  </div>
                  <img :src="`${envAPI}/images/promotions/${promotion.img}`" alt="">
              </a>
        </slick>

        <slick
              v-else
              ref="slick"
              :options="slickOptions"
              >
              <a href="#"  class="slick--wrapp" v-for="(promotion, i) in promotions">
                  <div class="fill-height-home-slider">
                      <v-row
                          class="fill-height-home-slider"
                          align="center"
                          justify="center"
                          >
                          <v-col md12 class="text-center">
                              <div class="display-1 text-center c-title">
                                  {{ promotion.translation.name }}
                              </div>
                              <v-btn
                                  class="btn-custom"
                                  color="accent"
                                  :to="`/${language.lang}/promotions#${promotion.alias}`"
                              >{{ promotion.translation.btn_text }}</v-btn>
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
import { mapActions, mapGetters } from 'vuex'
import Slick from 'vue-slick'

export default {
    data() {
        return {
            slickOptions: {
                slidesToShow: 1,
                arrows: false,
                dots: true,
            },
        };
    },
    computed: mapGetters({
        promotions : 'getPromotions',
        trans: 'getTranslations',
        envAPI: 'getEnvAPI',
        language: 'getLanguage',
    }),
    components: {
        Slick
    },
}
</script>

<style lang="scss">
.slick-slide img{
    width: 100%;
}
.fill-height-home-slider{
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
}
.slick--wrapp{
    position: relative;
}
.slick-list{
    text-align: center;
}
.slick-dots{
    text-align: center;
    list-style: none;
    background: rgba(0,0,0,.3);
    padding: 18px;
    padding-top: 10px;
    position: absolute;
    width: 100%;
    bottom: 0px;
}
.slick-dots li{
    display: inline-block;
    font-size: 0;
    color: trasparent;
    width: 18px;
    height: 18px;
    border-radius: 50%;
    background-color: #DDD;
    margin: 0 5px;
}
.slick-active{
    background-color: #FFF !important;
}
.c-title{
    margin-bottom: 50px;
}
.banner{
    margin-top: -27px;
}
.c-subtitle{
    margin-bottom: 20px;
}
.btn-custom{
    color: $custom_blue !important;
}
</style>
