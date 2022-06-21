<template>
  <v-list>
    <v-list-item>
      <v-list-item-icon @click="closeDrawer">
        <v-icon color="primary">mdi-close</v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-list-item>
      <v-list-item-content>
        <v-dialog
            v-model="changeLanguage"
            width="400">
          <template v-slot:activator="{ on, attrs }">
            <v-list-item-title class="d-flex align-center userSettings" v-bind="attrs" v-on="on">
              <span class="d-flex align-center">
                {{ currency.abbr }} /
                {{ language.lang }} /
                <img class="ml-1"
                     :src="`https://back.soledynft.shop/images/flags/24x24/${country.flag}`">
              </span>
              <v-spacer></v-spacer>
              |
              <v-spacer></v-spacer>
              <span>{{ $trans('TehButtons', 'change') }}</span>
            </v-list-item-title>
          </template>
          <language-modal @closeLanguageModal="changeLanguage = false"/>
        </v-dialog>
      </v-list-item-content>
    </v-list-item>
    <v-list-item @click="openDrawerTwoCatalog">
      <v-list-item-content>
        <v-list-item-title>
          {{ $trans('PagesNames', 'pageNameProductsTitle') }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon color="primary">mdi-chevron-right</v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-list-item @click="openDrawerTwoCollections">
      <v-list-item-content>
        <v-list-item-title>
          {{ $trans('PagesNames', 'pageNameCollections') }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-icon>
        <v-icon color="primary">mdi-chevron-right</v-icon>
      </v-list-item-icon>
    </v-list-item>
    <v-list-item to="/ro/designers" nuxt>
      <v-list-item-content>
        <v-list-item-title>
          {{ $trans('PagesNames', 'pageNameDesigners') }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item to="/ro/new" nuxt>
      <v-list-item-content>
        <v-list-item-title>
          {{ $trans('PagesNames', 'pageNameNewTitle') }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item to="/ro/outlet" nuxt>
      <v-list-item-content>
        <v-list-item-title>
          {{ $trans('PagesNames', 'pageNameOutletTitle') }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item to="/ro/about" nuxt>
      <v-list-item-content>
        <v-list-item-title>
          {{ $trans('PagesNames', 'pageAbout') }}
        </v-list-item-title>
      </v-list-item-content>
    </v-list-item>
    <v-list-item>

      <v-list-item-content>
        <NearAuth :title="'Sign In'"/>
      </v-list-item-content>

    </v-list-item>
    <v-list-group :value="false">
      <template v-slot:activator>
        <v-list-item-title>
          {{ $trans('General', 'helpInformation') }}
        </v-list-item-title>
      </template>
      <v-list-item dense class="pl-8" nuxt :to="`/${language.lang}/about`">
        <v-list-item-content>
          <v-list-item-title>
            {{ $trans('PagesNames', 'pageAbout') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item dense class="pl-8" nuxt :to="`/${language.lang}/livrare-achitare-retur`">
        <v-list-item-content>
          <v-list-item-title>
            {{ $trans('PagesNames', 'pageDelivery') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
      <v-list-item dense class="pl-8" nuxt :to="`/${language.lang}/contacts`">
        <v-list-item-content>
          <v-list-item-title>
            {{ $trans('PagesNames', 'pageNameContacts') }}
          </v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list-group>
    <v-list-item>
      <v-list-item-content>
        <v-list-item-title>
          {{ $trans('HeaderFooter', 'followUs') }}
        </v-list-item-title>
      </v-list-item-content>
      <v-list-item-action class="d-flex flex-row">
        <v-btn :href="`${$trans('ContactsAndForms', 'companyInstagram')}`" target="_blank" icon color="title">
          <v-icon>mdi-instagram</v-icon>
        </v-btn>
      </v-list-item-action>
    </v-list-item>
  </v-list>
</template>

<script>

import {mapGetters} from 'vuex'
import LanguageModal from '@/components/front/forms/LanguageModal'
import AuthModal from '@/components/front/forms/AuthenticationForm'
import NearAuth from "@/components/front/near/NearAuth";

export default {
  components: {
    LanguageModal,
    AuthModal,
    NearAuth
  },
  data() {
    return {
      clipped: false,
      fixed: false,
      changeLanguage: false,
      authModal: false,
    }
  },
  computed: mapGetters({
    language: 'getLanguage',
    currency: 'getCurrency',
    country: 'getCountry',
    trans: 'getTranslations',
  }),
  methods: {
    closeDrawer() {
      this.$emit('closeDrawer')
    },
    openDrawerTwoCatalog() {
      this.$emit('openDrawerTwoCatalog')
    },
    openDrawerTwoCollections() {
      this.$emit('openDrawerTwoCollections')
    }
  }
}
</script>

<style lang="scss" scoped>
.v-list-item {
  &__title {
    text-transform: uppercase;
  }
}

.userSettings {
  max-width: 250px;
}
</style>
