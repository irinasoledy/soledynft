<template>
  <div class="designers" v-if="designer">
    <div class="banner">
      <div class="banner__image">
          <!-- <img :src="$banner('Designers_Banner', $mobileDetect.mobile())" alt="banner" /> -->
          <img :src="`https://back.soledy.com/images/brands/${designer.image}`" v-if="!$mobileDetect.mobile()">
          <img :src="`https://back.soledy.com/images/brands/${designer.logo}`" v-else>
      </div>
      <div class="banner__text">
        <div class="banner__title">
         {{ designer.translation.name }}
        </div>
      </div>
    </div>
    <v-container>
      <v-row class="justify-center">
        <v-col class="col-12">
          <h3 class="c-title title-olive my-3">
            {{ designer.translation.name }}
          </h3>
        </v-col>
        <v-col class="col-12" v-html="designer.translation.description "></v-col>
        <v-col class="col-auto">
          <div class="guaranty">
            <div class="guaranty__content">
              <div class="guaranty__item">
                <img src="/images/IMG_1070.PNG" alt="">
                <span>happy worker</span>
              </div>
              <div class="guaranty__item">
                <img src="/images/IMG_1071.PNG" alt="">
                <span>non-toxic dyes</span>
              </div>
              <div class="guaranty__item">
                <img src="/images/IMG_1072.PNG" alt="">
                <span>happy worid</span>
              </div>
              <div class="guaranty__item">
                <img src="/images/IMG_1073.PNG" alt="">
                <span>co-product</span>
              </div>
            </div>
          </div>
        </v-col>
        <v-col class="col-12">
          <p class="designers__available">
            Available online
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col class="col-xl-2 col-lg-3 col-md-4 col-6" v-for="(product, i) in designer.products" :key="i" v-if="designer.products && product.main_image">
          <nuxt-link :to="`/ro/categories/${product.category.alias}/${product.alias}`" class="product">
              <v-img :src="`https://back.soledy.com/images/products/sm/${product.main_image.src}`"></v-img>
              <p class="product__name">{{ product.translation.name }}</p>
              <div class="collectionOne__price price">
                  <span>{{ product.personal_price.price }}</span>

                  <span v-if="product.personal_price.old_price < product.personal_price.price">/</span>
                  <span class="price__discount" v-if="product.personal_price.old_price < product.personal_price.price">
                      {{ product.personal_price.old_price }}
                  </span>
                  <span>{{ currency.abbr }} </span>
              </div>
          </nuxt-link>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import contentApi from '@/api/contentApi.js'

export default {
    async asyncData({ app, params, store }) {
        let item = null

        await contentApi.getDesigner({
            lang: store.state.lang.lang,
            currency: store.state.currency.id,
            alias: params.designer
        }, data => {
            item = data
        })
        return { designer: item }
    },
    data: () => ({
        designer: null,
    }),
    computed: mapGetters({
        language: 'getLanguage',
        currency: 'getCurrency',
    }),
    methods: {
        ...mapActions({
            setDefaultChangedEmployee: 'setDefaultChangedEmployee',
            setDefaultReject: 'call/setDefaultReject',
            setDefaultResponse: 'call/setDefaultResponse',
            setClientAsUser: 'chat/setClientAsUser',
            setUser: 'chat/setUser',
            setInterlocutor: 'dialog/setInterlocutor',
            initCall: 'dialog/initCall',
        }),
    }
}
</script>

<style lang="scss" scoped>
  .banner {
    position: relative;
    // height: 70vh;

    img {
      width: 100%;
      height: 100%;
      object-fit: cover;
      display: block;
    }
    &__image {
      width: 100%;
      // height: 70vh;
    }
  }
  .designers {
    .price {
      margin-top: 0;
    }
    p {
      font-size: 14px;
      color: $main-color;
      text-align: center;
    }
    &__code {
      opacity: .7;
      margin-bottom: 0;
    }
    &__available {
      font-weight: bold;
      margin-bottom: 0;
    }
    &__image {
      position: relative;
    }
    &__image:hover &__image-hover {
      opacity: 1;
    }
    &__image-hover {
      opacity: 0;
      transition: opacity .3s ease;
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      width: 100%;
      object-fit: cover;
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
  }
  .guaranty {
    padding-bottom: 20px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.12);
    &__header {
      color: $olive-color;
      text-transform: uppercase;
    }
    &__content {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }
    &__item {
      display: flex;
      flex-direction: column;
      align-items: center;
      margin-right: 10px;

      span {
        font-size: 10px;
        color: $main-color;
        text-transform: uppercase;
      }
    }
    img {
      width: 60px
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
