<template>
    <div class="filterModal-container">
        <v-sheet color="body" class="filterModal-container__header d-flex align-center" elevation="2">
            <v-btn icon color="primary" @click="closeFilterModal">
                <v-icon>mdi-close</v-icon>
            </v-btn>
            <v-spacer></v-spacer>
            <v-card-subtitle>Set Filters</v-card-subtitle>
            <v-spacer></v-spacer>
            <v-btn text color="primary" @click="resetFilter">
                Sterge
            </v-btn>
        </v-sheet>
        <v-sheet class="filterModal-container__scroll pt-3" >
            <div class="filter__group">
                <div class="filter__title">Budget</div>
                <div class="d-flex align-center">
                    <div class="input-group">
                        <span>{{ currency.abbr }}</span>
                        <v-text-field dense class="mb-0" outlined type="number" v-model="minPrice"></v-text-field>
                    </div>
                    <span class="ma-2">To</span>
                    <div class="input-group">
                        <span>{{ currency.abbr }}</span>
                        <v-text-field dense class="mb-0" outlined type="number" v-model="maxPrice"></v-text-field>
                    </div>
                </div>
            </div>

            <div class="filter__option" v-for="parameter in category.params" v-if="parameter.property.in_filter == 1">
                <div class="filter__group">
                    <div class="filter__title" v-if="parameter.property.multilingual == 1 ">{{ parameter.property.translation.name }}</div>
                    <v-checkbox
                        v-for="(value, index) in parameter.property.parameter_values"
                        v-if="parameter.property.multilingual == 1 && filter.includes(value.id)"
                        @change="setProperty(parameter.property.id, value.id)"
                        :key="index"
                        :label="value.translation.name"
                        color="primary"
                        hide-details
                        class="filter__check-input"
                    ></v-checkbox>
                </div>
            </div>

        </v-sheet>
        <!-- <v-sheet class="filterModal-container__footer pa-4" color="body" elevation="2">
            <v-btn block color="body">
                show results
            </v-btn>
        </v-sheet> -->
    </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import contentApi from '@/api/contentApi'

export default {
    props: ['category'],
    data () {
        return {
            filter: [],
            properties: [],
            minPrice: 0,
            maxPrice: 2000,
        }
    },
    computed: mapGetters({
        language: 'getLanguage',
        currency: 'getCurrency',
        trans: 'getTranslations',
    }),
    mounted() {
        this.setDefaultFilter()
    },
    methods: {
        setProperty(param, value) {
            const findParam = this.properties.find((obj) => obj.value == value)

            if (!findParam) {
                this.properties.push({ name: param, value: value })
            } else {
                this.properties = this.removeFromObject(this.properties, param, value)
            }

            this.properties = JSON.parse(JSON.stringify(this.properties))

            this.filterProducts(JSON.parse(JSON.stringify(this.properties)))
        },
        filterProducts(properties) {
            const data = {
                properties: JSON.stringify(properties),
                minPrice: this.minPrice,
                maxPrice: this.maxPrice,
                categoryId: this.category.id,
                lang: this.language.lang,
                currency: this.currency.id
            }

            if (properties.length === 0) {
                this.$nuxt.$emit('resetFilter')
            }else {
                contentApi.filterProducts(data, response => {
                    this.$nuxt.$emit('replaceProducts', response)
                })
            }
        },
        resetFilter() {
            this.$nuxt.$emit('resetFilter')
            this.closeFilterModal()
        },
        setDefaultFilter() {
            const data = {
                categoryId: this.category.id,
                lang: this.language.lang,
                currency: this.currency.id
            }
            contentApi.getDefaultFilter(data, response => {
                this.filter = response.parameters;
                this.minPrice = response.prices.min;
                this.maxPrice = response.prices.max;
            })
        },
        removeFromObject(object, name, value) {
            object.filter(function (element, key) {
                if (element.name == name && element.value == value) {
                    object.splice(key, 1);
                }
            });
            return object;
        },
        closeFilterModal () {
            this.$emit('closeFilterModal')
        },
        openFilterModal () {
            this.$emit('openFilterModal')
        },
        showMore (count) {
            if (count < 5) {
                this.countColor = 20
            } else {
                this.countColor = 4
            }
        }
    }
}
</script>

<style lang="scss" scoped>
  .filter {

    &__title {
      font-weight: 700;
      padding: 10px 0 15px;
      color: #0e0e0f;
      font-size: 14px;
      line-height: 16px;
      padding: 10px 0;
    }
    &__group {
      padding-bottom: 10px;
    }
    &__check {
      background: transparent !important;
    }

  }
  .filterModal-container {
    height: 100vh;
    position: relative;

    &__scroll {
      height: 100%;
      overflow: scroll;
      padding: 20px 14px;
    }
    &__header {
      position: sticky;
      z-index: 1;
      top: 0;
    }
    &__footer {
      position: sticky;
      z-index: 1;
      bottom: 0;
    }
  }

    .v-card__text {
      background: $bcg-body !important;
    }
</style>
