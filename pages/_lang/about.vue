<template>
  <div class="about">

    <v-container>
      <v-row>
        <v-col class="col-12">
          <h3 class="c-title">{{ $trans('About', 'title') }}</h3>
        </v-col>
        <v-col class="col-12">
          <div class="about__multi">{{ $trans('About', 'row1-1') }}<br>{{ $trans('About', 'row1-2') }}</div>
        </v-col>
        <v-col class="col-12">
          <v-row class="justify-center">
            <v-col class="col-lg-3 col-md-4 col-5 image-left">
              <img :src="$banner('Banner_About_Section_1_left', $mobileDetect.mobile())" alt="banner"/>
            </v-col>
            <v-col class="col-lg-5 col-md-6 col-7 image-right">
              <img :src="$banner('Banner_HP_About_Section_4', $mobileDetect.mobile())" alt="banner"/>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>

    <section class="sectionOne">
      <v-container>
        <v-row>
          <v-col class="col-12">
            <h3 class="c-title-multi">{{ $trans('About', 'section1Title') }}</h3>
            <p class="about__text">{{ $trans('General', 'brandHitoryBody') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="sectionTwo">
      <v-container>
        <v-row>
          <v-col class="col-12">
            <v-row class="row sectionTwo-container">
              <v-col class="col-lg-3 col-12 sectionTwo__image-one">
                <img :src="$banner('Banner_About_Section_2_right', $mobileDetect.mobile())" alt="banner"/>
              </v-col>
              <v-col class="col-lg-9 col-12">
                <p class="about__text bloc1">{{ $trans('About', 'section2-1') }}</p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12">
            <p class="subtitle">{{ $trans('About', 'section2-2') }}</p>
            <img :src="$banner('Banner_About_Section_2_left', $mobileDetect.mobile())" alt="banner"/>
            <p class="about__text bloc3">{{ $trans('About', 'section2-3') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="sectionParallax">
      <img :src="$banner('Banner_About_Section_3_fulwidth', $mobileDetect.mobile())" alt="banner"/>
    </section>

    <section class="sectionThree">
      <v-container>
        <v-row>
          <v-col class="col-12">
            <h4 class="bloc1">{{ $trans('About', 'section3Title') }}</h4>
          </v-col>
          <v-col class="col-12">
            <p class="about__text bloc2">{{ $trans('About', 'section3Body') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="sectionFour">
      <v-container>
        <v-row>
          <v-col class="col-12">
            <h3 class="c-title">{{ $trans('About', 'ourBrands') }} </h3>
          </v-col>
          <v-col class="col-12">
            <h3 class="c-title">
              {{ $trans('About', 'outBijouxTitle') }}
            </h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-3 image-left">
            <img :src="$banner('Banner_About_Section_4_bijoux_1', $mobileDetect.mobile())" alt="banner"/>
          </v-col>
          <v-col class="col-6">
            <img :src="$banner('Banner_About_Section_4_bijoux_2', $mobileDetect.mobile())" alt="banner"/>
          </v-col>
          <v-col class="col-3 image-right">
            <img :src="$banner('Banner_About_Section_4_bijoux_3', $mobileDetect.mobile())" alt="banner"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <p class="about__text">{{ $trans('About', 'outBijouxBody') }}</p>
            <p class="about__north">{{ $trans('About', 'welcomeToBijoux') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </section>

    <section class="sectionFive">
      <v-container>
        <v-row>
          <v-col class="col-12">
            <h3 class="c-title">{{ $trans('About', 'ourBrands') }} </h3>
          </v-col>
          <v-col class="col-12">
            <h3 class="c-title">{{ $trans('About', 'welcomeToHomewear') }}</h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-3 image-left">
            <img :src="$banner('Banner_About_Section_5_homewear_1', $mobileDetect.mobile())" alt="banner"/>
          </v-col>
          <v-col class="col-6">
            <img :src="$banner('Banner_About_Section_5_homewear_2', $mobileDetect.mobile())" alt="banner"/>
          </v-col>
          <v-col class="col-3 image-right">
            <img :src="$banner('Banner_About_Section_5_homewear_3', $mobileDetect.mobile())" alt="banner"/>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <p class="about__text">{{ $trans('About', 'ourHomewareBody') }}</p>
            <p class="about__north">{{ $trans('About', 'welcomeToHomewear') }}</p>
          </v-col>
        </v-row>
      </v-container>
    </section>

  </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
  layout: "default",
  head() {
    return {
      title: this.title,
      meta: [
        {
          hid: 'description',
          name: 'description',
          content: this.description
        }
      ]
    }
  },
  data: () => ({
    title: '',
    description: '',
  }),
  computed: mapGetters({
    trans: 'getTranslations'
  }),
  mounted() {
    this.title = this.$trans('PageNames', 'aboutSeoTitle')
    this.description = this.$trans('PageNames', 'aboutSeoDesc')
  }
}
</script>
