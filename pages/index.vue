<template>
  <main>
      <div class="banner">
        <v-carousel :show-arrows="false" cycle>
          <v-carousel-item
            v-for="(promotion, i) in promotions"
            :key="i"
            :src="`${envAPI}/images/promotions/${promotion.img}`"
          >
            <v-container class="fill-height">
              <v-row
                class="fill-height"
                align="center"
                justify="center"
              >
                <v-col md12 class="text-center">
                  <div class="display-1 text-center c-title">
                    {{ promotion.translation.name }}
                  </div>
                  <v-sheet
                    class="c-sheet"
                    elevation="1"
                    height="auto"
                    width="auto"
                  >
                    {{ promotion.translation.btn_text }}
                  </v-sheet>
                </v-col>
              </v-row>
            </v-container>
          </v-carousel-item>


        </v-carousel>
      </div>
      <div class="callNow">
        <v-parallax height="200" src="call-now-bg.png">
          <v-container>
            <v-row>
              <v-col>
                <v-sheet
                  class="c-sheet text-center"
                  elevation="0"
                  height="auto"
                  width="auto"
                  >

                  <v-btn
                    class="ma-2 btn-yell"
                    medium
                    max-width="330"
                    color="secondary"
                    @click="$nuxt.$emit('open-appointment-form')"
                  >
                    <v-icon left>mdi-comment-bookmark</v-icon>
                    Consultație gratuită
                  </v-btn>
                </v-sheet>

              </v-col>
            </v-row>
          </v-container>
        </v-parallax>

      </div>
      <services></services>
      <experts></experts>
      <div class="callNow">
        <v-parallax height="200" src="call-now-bg.png">
          <v-container>
            <v-row>
              <v-col>
                <v-sheet
                  class="c-sheet text-center"
                  elevation="0"
                  height="auto"
                  width="auto"
                  >

                  <v-btn
                    class="ma-2 btn-yell"
                    medium
                    color="secondary"
                    @click="$nuxt.$emit('open-appointment-form')"
                  >
                    <v-icon left>mdi-comment-bookmark</v-icon>
                    Consultație gratuită
                  </v-btn>
                </v-sheet>

              </v-col>
            </v-row>
          </v-container>
        </v-parallax>

      </div>
      <section class="testimonials">
        <v-container>
          <v-row>
            <v-col cols="12">
              <div class="display-1 text-center">
                Clienții Noștri
              </div>
            </v-col>
            <v-col cols="12">
              <testimonial></testimonial>
            </v-col>
          </v-row>
        </v-container>
      </section>
      <map-contact></map-contact>
  </main>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import Testimonial from "@/components/sliders/testimonial"
import MapContact from "@/components/mapContact.vue"
import Experts from "@/components/blocs/experts.vue"
import Services from '@/components/blocs/services.vue'

export default {
  layout: "default",
  components: {
    Testimonial,
    MapContact,
    Experts,
    Services
  },
  computed: mapGetters({
     promotions : 'getPromotions',
     envAPI: 'getEnvAPI'
  }),
}
</script>

<style lang="scss">

  .display-1 {
    color: $custom_blue !important;
    font-weight: 700 !important;
  }

  .banner {

    .c-title {
      color: $custom_blue;
      font-weight: 900 !important;
      margin-bottom: 5rem;
    }

    .c-sheet {
      padding: 20px;
      text-align: center;
      display: inline;
      background: rgba($color: $custom_red, $alpha: 1);
    }

    .v-responsive__content {
      background-color: rgba($color: #ffff, $alpha: 0.8);
    }
  }
  .callNow {
    .c-sheet {
      background: transparent;
    }

    .btn-yell {
      background: $custom_yellow !important;
      color: #000000 !important;
    }
  }

  .experts {
    background-color: $custom_blue;
    .display-1 {
      color: #ffff !important;
    }

    .text {
      color: #ffff;
      max-width: 500px;
      margin: 20px auto;
    }
  }

  section {
    padding: 50px 0;
  }

  main {
    padding-bottom: 50px;
    padding-top: 56px;
  }
  @media (min-width: 767px) {
    .banner {

      .v-window,
      .v-carousel__item {
        min-height: 80vh;
      }
    }
  }

  @media (min-width: 992px) {
    main {
      padding-top: 118px;
    }
  }
</style>
