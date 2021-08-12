<template>
  <div class="about">
    <v-container>
      <v-row>
        <v-col class="col-12">
          <h3 class="c-title">{{ $trans('About', 'title') }}</h3>
        </v-col>
        <v-col class="col-12">
          <div class="about__multi">
            {{ $trans('About', 'row1-1') }}
            <br>
            {{ $trans('About', 'row1-2') }}
          </div>
        </v-col>
        <v-col class="col-12">
          <v-row class="justify-center" >
            <v-col class="col-lg-3 col-md-4 col-5 image-left">
              <img src="https://back.soledy.com/images/banners/5f872dcdba429-About2-apl.JPG" alt="banner" />
            </v-col>
            <v-col class="col-lg-5 col-md-6 col-7 image-right">
              <img src="https://back.soledy.com/images/banners/5f8728233f64f-About1-apj.JPG" alt="banner" />
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
            <p class="about__text">
                {{ $trans('General', 'brandHitoryBody') }}
            </p>
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
                <img src="https://back.soledy.com/images/banners/5f8728f3432a8-About3-apj.JPG" alt="">
              </v-col>
              <v-col class="col-lg-9 col-12">
                <p class="about__text bloc1">
                    {{ $trans('About', 'section2-1') }}
                </p>
              </v-col>
            </v-row>
          </v-col>
          <v-col class="col-12">
            <p class="subtitle">
                {{ $trans('About', 'section2-2') }}
              <!-- De ce să cumperi de la noi? -->
            </p>
            <img src="https://back.soledy.com/images/banners/5f872990e0b16-About4-apl.JPG" alt="">

             <p class="about__text bloc3">
                 {{ $trans('About', 'section2-3') }}
             </p>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <section class="sectionParallax">
      <img src="https://back.soledy.com/images/banners/5f8729adcde25-About5-apj.JPG" alt="">
    </section>
    <section class="sectionThree">
      <v-container>
        <v-row>
          <v-col class="col-12">
            <h4 class="bloc1">
              {{ $trans('About', 'section3Title') }}
            </h4>
          </v-col>
          <v-col class="col-12">
            <p class="about__text bloc2">
                {{ $trans('About', 'section3Body') }}
            </p>
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
            <img src="https://back.soledy.com/images/banners/5f872b29d3049-About7-apj.JPG" alt="">
          </v-col>
          <v-col class="col-6">
            <img src="https://back.soledy.com/images/banners/5f872b450f08a-About6-apj.JPG" alt="">
          </v-col>
          <v-col class="col-3 image-right">
            <img src="https://back.soledy.com/images/banners/5f872b874876c-About8-apj.JPG" alt="">
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <p class="about__text">
                {{ $trans('About', 'outBijouxBody') }}
            </p>
            <p class="about__north">
                {{ $trans('About', 'welcomeToBijoux') }}
            </p>
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
            <h3 class="c-title">
              {{ $trans('About', 'welcomeToHomewear') }}
            </h3>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-3 image-left">
            <img src="https://back.soledy.com/images/banners/5f872bebc34d4-About10-apl.JPG" alt="">
          </v-col>
          <v-col class="col-6">
            <img src="https://back.soledy.com/images/banners/5f872c574ef39-About9-apl.JPG" alt="">
          </v-col>
          <v-col class="col-3 image-right">
            <img src="https://back.soledy.com/images/banners/5f872c74bc8cb-About11-apl.JPG" alt="">
          </v-col>
        </v-row>
        <v-row>
          <v-col class="col-12">
            <p class="about__text">
                {{ $trans('About', 'ourHomewareBody') }}
            </p>
            <p class="about__north">
                {{ $trans('About', 'welcomeToHomewear') }}
            </p>
          </v-col>
        </v-row>
      </v-container>
    </section>
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

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
        this.setChatBotmessage(this.$trans('General', 'botMessageTemplateAboutExperts'))
        this.title = this.$trans('PageNames', 'aboutSeoTitle')
        this.description = this.$trans('PageNames', 'aboutSeoDesc')
    },
    methods: {
        ...mapActions({
            setChatBotmessage: 'chat/setChatBotmessage'
        })
    },
}
</script>

<style lang="scss" scoped>
.about {
  padding-top: 30px;

  img {
    width: 100%;
  }

  &__multi {
    font-family: $font-titles;
    font-size: 25px;
    color: $main-color;
    letter-spacing: 3.17px;
    line-height: 1;
    text-align: center;
    margin: 30px 0;
    padding: 0 15px;
  }

  .image-left {
    text-align: right;
    position: relative;
    padding: 0;
    img {
      width: 120%;
      position: absolute;
      left: 0;
      top: 20%;
    }
  }
  .image-right {
    padding: 0;
    text-align: left;
    overflow: hidden;
    img {
      width: 120%;
    }
  }
}
.c-title-multi {
  font-family: $font-titles;
  font-size: 25px;
  color: $olive-color;
  letter-spacing: 3.17px;
  line-height: 1;
  text-align: left;
  margin: 30px 0;
  font-weight: 400;
}
.c-title-green {
  font-family: $font-titles;
  font-size: 30px;
  color: $olive-color;
  letter-spacing: 0.13px;
  line-height: 30px;
  margin-top: 30px;
}
.c-title {
  color: $red-color;
}
.sectionOne .about__text {
  font-family: $font-text;
  font-size: 20px;
  color: $main-color;
  letter-spacing: 0.08px;
  line-height: 24px;
  margin-top: 20px;
}
.about .sectionTwo {
  background-color: $bcg-header;
  text-align: right;
  margin-top: 100px;
  &-container {
    position: relative;
    padding-top: 200px;
  }
  &__image-one {
    position: absolute;
    top: -80px;
    right: 15px;
    width: 200px;
    margin-left: auto;
    margin-right: 0;
  }
  p.bloc1 {
    font-family: $font-text;
    font-size: 30px;
    color: $main-color;
    letter-spacing: 0.13px;
    line-height: 30px;
    margin-top: 30px;
  }
  p.bloc3 {
    font-family: $font-text;
    font-size: 20px;
    color: $main-color;
    letter-spacing: 0.08px;
    line-height: 24px;
    margin-top: 30px;
  }
  .subtitle {
    font-family: $font-text;
    font-weight: 700;
    color: $main-color;
    letter-spacing: 3.17px;
    line-height: 1;
    font-size: 25px;
    margin-top: 30px;
  }
  p {
    text-align: left;
  }
}
.about .sectionThree {
  .bloc1,
  .bloc2 {
    font-family: $font-text;
    font-size: 20px;
    color: $main-color;
    letter-spacing: 0.08px;
    line-height: 24px;
  }
  .bloc1 {
    margin-top: 20px;
  }
}
.about .sectionFour,
.about .sectionFive {
  background: -webkit-gradient(linear, left top, left bottom, color-stop(37%, #eddcd5), color-stop(37%, #fffcf5));
  background: linear-gradient(to bottom, #eddcd5 37%, #fffcf5 37%);
  background-repeat: no-repeat;
  padding-top: 30px;
  margin-top: 30px;

  .c-title {
    font-family: $font-titles;
    font-size: 30px;
    color: $olive-color;
    letter-spacing: 0.13px;
    text-transform: uppercase;
    text-align: center;
    line-height: 1;
  }
  p {
    font-family: $font-text;
    font-size: 20px;
    color: $main-color;
    letter-spacing: 0.08px;
    line-height: 24px;
    margin-top: 20px;
  }
  .about__north {
    font-family: $font-north;
    font-size: 30px;
    line-height: 1.3;
    text-align: center;
    color: $olive-color;
    margin-top: 30px;
  }
  .image-left,
  .image-right {
    position: relative;
    overflow: visible;

    img {
      position: absolute;
      width: 120%;
    }
  }
  .image-right img {
    right: 0;
    top: 20%;
  }
  .image-left img {
    left: 0;
    top: 35%;
  }
}
.about .sectionFive {
  background: transparent;

  .c-title {
    color: $red-color;
  }
  .about__north {
    color: $red-color;
  }
  .image-right img {
    right: 0;
    top: 35%;
  }
  .image-left img {
    left: 0;
    top: 20%;
  }
}
.sectionParallax {
  background-image: url('~static/images/about-parallax.jpg');
  background-size: cover;
  background-attachment: fixed;
  background-repeat: no-repeat;

  img {
    opacity: 0;
  }
}
@media (min-width: 1200px) {
  .about .sectionTwo {

    &__image-one {
      position: absolute;
      top: -80px;
      right: 15px;
      width: 300px;
      margin-left: auto;
      margin-right: 0;
    }
    &-container {
      padding-top: 50px;
    }
    .subtitle {
      margin-bottom: 50px;
      margin-top: 80px;
    }
  }
}
</style>
