<template>
    <section class="services">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <div class="display-1 text-center c-title">
                        Servicii
                    </div>
                </v-col>
                <v-col
                    v-for="(item, i) in services"
                    :key="i"
                    class="col-lg-4 col-md-6 col-12 d-flex child-flex"
                    >
                    <v-card v-if="item.children.length" :to="`/${language.lang}/services/${item.id}`">
                        <v-img
                            :src="item.src"
                            aspect-ratio="1"
                            class="grey lighten-2"
                            >
                        </v-img>
                        <v-card-title class="title">
                            {{item.translation.name}}
                        </v-card-title>
                    </v-card>
                    <v-card v-else :to="`/${language.lang}/services/list/${item.id}`">
                        <v-img
                            :src="item.src"
                            aspect-ratio="1"
                            class="grey lighten-2"
                            >
                        </v-img>
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
    data: () => ({}),
    computed: mapGetters({
        'services' : 'getServices',
        'language' : 'getLanguage'
    })
}
</script>
