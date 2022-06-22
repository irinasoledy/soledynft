<template>
  <footer class="footer pt-15">
    <v-container>
      <v-row>
        <v-col class="col-12">
          <nuxt-link to="/" class="footer__logo">
            <v-img src="/images/logo.png" alt="logo" width="150"/>
          </nuxt-link>
        </v-col>
        <v-col class="col-12 footer__mobile">
          <v-expansion-panels>
            <v-row>
              <v-col class="col-lg-4 col-12">
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    {{ $trans('PagesNames', 'pageAboutAnne') }}
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <nuxt-link :to="`/${language.lang}/about`">
                      {{ $trans('PagesNames', 'pageAbout') }}
                    </nuxt-link>
                    <nuxt-link :to="`/${language.lang}/contacts`">
                      {{ $trans('PagesNames', 'pageNameContacts') }}
                    </nuxt-link>
                    <nuxt-link :to="`/${language.lang}/livrare-achitare-retur`">
                      {{ $trans('PagesNames', 'pageDelivery') }}
                    </nuxt-link>
                    <nuxt-link :to="`/${language.lang}/designers`">
                      {{ $trans('PagesNames', 'pageNameDesigners') }}
                    </nuxt-link>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-col>
              <v-col class="col-lg-4 col-12">
                <v-expansion-panel>
                  <v-expansion-panel-header>
                    {{ $trans('HeaderFooter', 'ourProducts') }}:
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <nuxt-link :to="`/${language.lang}/categories/all`">
                      {{ $trans('PagesNames', 'pageNameAllProducts') }}
                    </nuxt-link>
                    <nuxt-link :to="`/${language.lang}/collections/authentic`">
                      {{ $trans('PagesNames', 'pageNameCollections') }}
                    </nuxt-link>
                    <nuxt-link :to="`/${language.lang}/outlet`">
                      {{ $trans('PagesNames', 'pageNameOutletTitle') }}
                    </nuxt-link>
                    <nuxt-link :to="`/${language.lang}/new`">
                      {{ $trans('PagesNames', 'pageNameNewTitle') }}
                    </nuxt-link>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-col>
              <v-col class="col-lg-4 col-12">
                <v-expansion-panel elevation="0">
                  <v-expansion-panel-header>
                    {{ $trans('HeaderFooter', 'usefulInfo') }}:
                  </v-expansion-panel-header>
                  <v-expansion-panel-content>
                    <nuxt-link :to="`/${language.lang}/${page.alias}`" v-for="(page, index) in pages" :key="index">
                      {{ page.translation.name }}
                    </nuxt-link>
                  </v-expansion-panel-content>
                </v-expansion-panel>
              </v-col>
            </v-row>
          </v-expansion-panels>
        </v-col>
        <v-col class="col-12 footer__desktop">
          <v-row>
            <v-col class="col-lg-4 col-12">
              <div class="footer__subtitle">
                {{ $trans('PagesNames', 'pageAboutAnne') }}
              </div>
              <div class="footer__list">
                <nuxt-link :to="`/${language.lang}/about`">
                  {{ $trans('PagesNames', 'pageAbout') }}
                </nuxt-link>
                <nuxt-link :to="`/${language.lang}/contacts`">
                  {{ $trans('PagesNames', 'pageNameContacts') }}
                </nuxt-link>
                <nuxt-link :to="`/${language.lang}/livrare-achitare-retur`">
                  {{ $trans('PagesNames', 'pageDelivery') }}
                </nuxt-link>
                <nuxt-link :to="`/${language.lang}/designers`">
                  {{ $trans('PagesNames', 'pageNameDesigners') }}
                </nuxt-link>
              </div>
            </v-col>
            <v-col class="col-lg-4 col-12">
              <div class="footer__subtitle">
                {{ $trans('HeaderFooter', 'ourProducts') }}:
              </div>
              <div class="footer__list">
                <nuxt-link :to="`/${language.lang}/categories/all`">
                  {{ $trans('PagesNames', 'pageNameAllProducts') }}
                </nuxt-link>
                <nuxt-link :to="`/${language.lang}/collections/authentic`">
                  {{ $trans('PagesNames', 'pageNameCollections') }}
                </nuxt-link>
                <nuxt-link :to="`/${language.lang}/outlet`">
                  {{ $trans('PagesNames', 'pageNameOutletTitle') }}
                </nuxt-link>
                <nuxt-link :to="`/${language.lang}/new`">
                  {{ $trans('PagesNames', 'pageNameNewTitle') }}
                </nuxt-link>
              </div>
            </v-col>
            <v-col class="col-lg-4 col-12">
              <div class="footer__subtitle">
                {{ $trans('HeaderFooter', 'usefulInfo') }}:
              </div>
              <div class="footer__list">
                <nuxt-link :to="`/${language.lang}/${page.alias}`" v-for="(page, index) in pages" :key="index">
                  {{ page.translation.name }}
                </nuxt-link>
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col class="col-12">
          <div class="footer__payments d-flex align-center justify-space-between">
            <div class="footer__payments-img">
              <v-img width="60" src="https://back.soledy.com/images/mc_symbol.svg"/>
            </div>

          </div>
        </v-col>
        <v-col class="col-12">
          <p class="my-3">
            {{ $trans('HeaderFooter', 'followUs') }}:
            <a class="footer-social-link" :href="`${$trans('ContactsAndForms', 'companyInstagram')}`">
              <v-icon color="title">mdi-instagram</v-icon>
            </a>
          </p>
        </v-col>
        <v-col class="col-12">
          <p class="my-3">
            {{ $trans('HeaderFooter', 'concept') }}
          </p>
          <p class="ma-0 py-3">
            {{ $trans('HeaderFooter', 'copyright') }}
          </p>
        </v-col>
      </v-row>
    </v-container>
  </footer>
</template>

<script>

import {mapGetters} from 'vuex';

export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-instagram',
    ],
    serviceArray: [],
  }),
  watch: {
    services() {
      this.serviceArray = []
      this.splitToChunks(this.services, 2)
    }
  },
  computed: mapGetters({
    pages: 'getPages',
    language: 'getLanguage',
    trans: 'getTranslations',
    services: 'getServices',
  }),
  mounted() {
    this.splitToChunks(this.services, 2)
  },
  methods: {
    splitToChunks(array, parts) {
      const services = []
      array.forEach(service => services.push(service))
      for (let i = parts; i > 0; i--) {
        this.serviceArray.push(services.splice(0, Math.ceil(services.length / i)))
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.footer {
  background: $bcg-header;

  .v-expansion-panel {
    box-shadow: none !important;
    background: $bcg-header !important;
    font-family: $font-roboto;

    &:before {
      box-shadow: none;
    }
  }

  .v-expansion-panel-header {
    font-size: 20px !important;
    color: $main-color;
    padding-left: 0;
    padding-right: 0;
  }

  .v-expansion-panel-content__wrap {
    padding-left: 0 !important;
    padding-right: 0 !important;
  }

  a {
    font-size: 18px;
    color: $main-color;
    display: block;
    line-height: 1.8;
    font-weight: 300;
    font-family: $font-roboto, sans-serif;
  }

  p {
    font-family: $font-roboto, sans-serif;
    font-size: 20px;
    color: $main-color;
    letter-spacing: 0;
    line-height: 1.5;
    margin-bottom: 10px;
    font-weight: 300;
  }

  &__desktop {
    display: none;
  }
}

@media (min-width: 1200px) {
  .footer {
    &__payments {
      max-width: 600px;
    }

    &__mobile {
      display: none;
    }

    &__desktop {
      display: block;
      margin-top: 30px;
    }

    &__subtitle {
      font-family: $font-roboto, sans-serif;
      font-size: 20px;
      color: $main-color;
      letter-spacing: 0;
      line-height: 20px;
      font-weight: 400;
      margin-bottom: 20px;
    }

    a {
      font-family: $font-roboto;
      text-transform: capitalize;
    }
  }
}

.footer-social-link {
  display: inline-block !important;

}
</style>
