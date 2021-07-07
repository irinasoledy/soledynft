<template>
    <section class="services services-area">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <div class="display-1 text-center c-title white--text">
                        {{ trans.PageNames.ourServices }}
                    </div>
                </v-col>
                <v-col
                    v-for="(item, i) in services"
                    :key="i"
                    class="col-lg-4 col-md-6 col-12 d-flex child-flex"
                    >
                    <v-card v-if="item.subcategories.length" :to="`/${language.lang}/service/${item.alias}`">
                        <v-img
                            v-if="item.banner"
                            :src="`${envAPI}/images/blogCategories/og/${item.banner}`"
                            aspect-ratio="1"
                            class="grey lighten-2"
                            >
                        </v-img>
                        <v-img v-else src="" aspect-ratio="1" class="grey lighten-2"></v-img>
                        <v-card-title class="title">
                            {{item.translation.name}}
                        </v-card-title>
                    </v-card>
                    <v-card v-else :to="`/${language.lang}/service/plans/${item.alias}`">
                        <v-img
                            v-if="item.banner"
                            :src="`${envAPI}/images/blogCategories/og/${item.banner}`"
                            aspect-ratio="1"
                            class="grey lighten-2"
                            >
                        </v-img>
                        <v-img v-else src="" aspect-ratio="1" class="grey lighten-2"></v-img>
                        <v-card-title class="title">
                            {{item.translation.name}}
                        </v-card-title>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    computed: mapGetters({
        services : 'getServices',
        language : 'getLanguage',
        envAPI : 'getEnvAPI',
        trans: 'getTranslations'
    })
}
</script>

<style lang="scss">
.services-area{
    background-color: $primary_dark;
}
</style>
