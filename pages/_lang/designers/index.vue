<template>
  <div class="designers">

    <div class="banner">
      <div class="banner__image">
        <img :src="$banner('Designers_Banner', $mobileDetect.mobile())" alt="banner"/>
      </div>
      <div class="banner__text">
        <div class="banner__title">Designers</div>
      </div>
    </div>

    <v-container>
      <v-row>
        <v-col class="col-12">
          <h3 class="c-title title-olive my-3">Designers</h3>
        </v-col>
      </v-row>

      <v-row>
        <v-col class="col-xl-3 col-lg-4 col-6" v-for="(designer, i) in designers" :key="i" v-if="designers">
          <nuxt-link :to="`/${language.lang}/designers/${designer.alias}`" class="designers__item">
            <div class="designers__image">
              <img :src="`https://back.soledynft.shop/images/brands/${designer.logo}`" alt="">
              <div class="designers__hover">Read More</div>
            </div>
            <p class="designers__name my-2">{{ designer.translation.name }}</p>
            <p class="designers__text" v-html="designer.translation.description"></p>
          </nuxt-link>
        </v-col>
      </v-row>

    </v-container>
  </div>
</template>

<script>

import contentApi from '@/api/contentApi'
import {mapGetters} from 'vuex'

export default {
  async asyncData({app, params, store}) {
    let items = null
    await contentApi.getDesigners({
      lang: store.state.lang.lang,
      currency: store.state.currency.id,
    }, data => {
      items = data
    })
    return {
      designers: items
    }
  },
  computed: mapGetters({
    language: 'getLanguage',
  })
}
</script>