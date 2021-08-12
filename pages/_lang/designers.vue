<template>
  <div class="designers">
    <div class="banner">
      <div class="banner__image">
        <img src="https://cdn2.hubspot.net/hub/491011/hubfs/BLOG_6-technology-trends-reshaping-luxury-fashion-industry.jpg?width=1600&name=BLOG_6-technology-trends-reshaping-luxury-fashion-industry.jpg" alt="banner" />
      </div>
      <div class="banner__text">
        <div class="banner__title">
          Lorem ipsum dolor sit amet.
        </div>
      </div>
    </div>
    <v-container>
      <v-row>
        <v-col class="col-12">
          <h3 class="c-title title-olive my-3">
            Designers
          </h3>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-xl-3 col-lg-4 col-6" v-for="(item, i) in 6" :key="i">
          <nuxt-link to="/one-designer" class="designers__item">
            <div class="designers__image">
              <img src="https://res.cloudinary.com/wolfandbadger/image/upload/s--C_dyHIrF--/q_auto:eco,f_auto,w_262,h_262,c_fill,g_center/designers/l6gh605s4h9mfpk3o6go" alt="">
              <div class="designers__hover">
                Read More
              </div>
            </div>
            <p class="designers__name my-2">
              AANOUKIS SWIMWEAR
            </p>
            <p class="designers__text">
              "A desire for joy, freedom, love, and shared laughter, have inspired my brand new collection, which I call "la vie en rose". It's all about…
            </p>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss" scoped>
  .banner {
    position: relative;
    height: 70vh;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    &__image {
      width: 100%;
      height: 70vh;
    }
  }
  .designers {
    &__image {
      position: relative;
    }
    img {
      width: 100%;
      display: block;
    }
    &__name {
      color: $olive-color;
      font-size: 14px;
      text-transform: uppercase;
      text-align: center;
    }
    &__text {
      text-align: center;
      font-size: 12px;
      line-height: 18px;
      height: 54px;
      overflow: hidden;
      text-overflow: ellipsis;
    }
    &__hover {
      position: absolute;
      left: 0;
      top: 0;
      width: 100%;
      height: 100%;
      background: rgba($color: #ffff, $alpha: 0.4);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      z-index: 1;
      opacity: 0;
      transition: opacity .5s ease;
    }
    &__image:hover &__hover {
      opacity: 1;
    }
  }
  @media (min-width: 1200px) {
    .designers {
      &__name {
        font-size: 14px;
      }
      &__text {
        font-size: 18px;
      }
    }
  }
</style>
