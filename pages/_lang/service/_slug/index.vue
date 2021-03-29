<template>
    <main>
        <section class="services" v-if="service">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <div class="display-1 text-center c-title">
                            {{ this.service.translation.name }}
                        </div>
                    </v-col>
                    <v-col
                        v-for="(item, i) in this.service.children"
                        :key="i"
                        class="col-lg-4 col-md-6 col-12 d-flex child-flex"
                        >
                        <v-card exact nuxt :to="`/${language.lang}/services/list/${item.id}`">
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
    </main>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        service : null,
    }),
    computed: mapGetters({
        services : 'getServices',
        language : 'getLanguage',
        envAPI : 'getEnvAPI',
    }),
    async mounted(){
        this.service = await this.services.find((serv) => serv.alias == this.$route.params.slug)
        if (Object.keys(this.service).length === 0) {
            this.$router.push("/")
        }
    },
}
</script>
