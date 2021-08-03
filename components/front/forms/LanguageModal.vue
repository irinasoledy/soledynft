<template>
  <v-form>
    <v-card>
      <v-card-title class="headline text-center">
        Settings
      </v-card-title>
      <v-card-text class="pt-8 pb-0">
        <v-select
            v-if="languageSelected"
          :items="languages"
          item-text="lang"
          item-value="id"
          label="Limba"
          color="primary"
          required
          outlined
          filled
          v-model="languageSelected"
        >
        </v-select>
        <v-select
            v-if="countrySelected"
          :items="countries"
          item-text="name"
          item-value="id"
          label="Livrare catre"
          required
          color="primary"
          outlined
          v-model="countrySelected"
        >
        </v-select>
        <v-select
            v-if="currencySelected"
          :items="currencies"
          item-text="abbr"
          item-value="id"
          label="Valuta"
          color="primary"
          outlined
          required
          v-model="currencySelected"
        >
        </v-select>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="py-4 px-4">
        <v-spacer></v-spacer>
        <v-btn
          color="title"
          text
          @click="closeLanguageModal"
        >
          Close
        </v-btn>
        <v-btn
          color="primary"
          outlined
          @click="saveSettings()"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import contentApi from '@/api/contentApi'

export default {
    data() {
        return {
            languageSelected: null,
            currencySelected: null,
            countrySelected: null,
        }
    },
    computed: mapGetters({
        languages: 'getLanguages',
        language: 'getLanguage',
        currencies: 'getCurrencies',
        currency: 'getCurrency',
        countries: 'getCountries',
        country: 'getCountry',
    }),
    mounted() {
        this.languageSelected = this.language.id
        this.currencySelected = this.currency.id
        this.countrySelected = this.country.id
    },
    methods: {
        ...mapActions({
            changeSettings: 'changeSettings'
        }),
        closeLanguageModal() {
            this.$emit("closeLanguageModal")
        },
        async saveSettings() {
            await this.changeSettings({
                    lang: this.languageSelected,
                    currency: this.currencySelected,
                    country: this.countrySelected
                }).then(data => {
                    const currentLang = '/' + this.language.lang
                    const lastLang = this.$route.params.lang
                    const fullPath = this.$route.fullPath
                    let redirectTo = '/'

                    if (lastLang) {
                        redirectTo = fullPath.replace('/' + lastLang, currentLang);
                    } else {
                        redirectTo = currentLang;
                    }
                    this.$router.push(redirectTo)
                    this.$emit("closeLanguageModal")
                })
            // await contentApi.setSettings({
            //         lang: this.languageSelected,
            //         currency: this.currencySelected,
            //         country: this.countrySelected
            //     }, data => {
            //
            //     })
        },
    }
}
</script>

<style>

</style>
