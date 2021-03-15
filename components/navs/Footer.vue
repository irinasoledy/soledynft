<template>
    <v-footer dark color="primary">
        <v-card
            flat
            tile
            class="primary white--text text-center"
            >
            <v-card-text>
                <v-btn
                    v-for="icon in icons"
                    :key="icon"
                    class="mx-4 white--text"
                    icon
                    >
                    <v-icon size="24px">
                        {{ icon }}
                    </v-icon>
                </v-btn>
            </v-card-text>
            <v-row justify="center" no-gutters>
                <v-btn color="white" text rounded class="my-2" v-for="page in pages" :key="page.id" :to="`/${language.lang}/${page.alias}`">
                    {{ page.translation.name }}
                </v-btn>
            </v-row>
            <v-card-text class="white--text pt-0">
                {{ trans.HeaderFooter.footerText }}
            </v-card-text>
            <v-divider></v-divider>
            <v-card-text class="white--text">
                {{ new Date().getFullYear() }} — <strong>Likemedia</strong>
            </v-card-text>
        </v-card>
    </v-footer>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-twitter',
            'mdi-linkedin',
            'mdi-instagram',
        ],
    }),
    computed: mapGetters({
        pages : 'getPages',
        language: 'getLanguage',
        trans: 'getTranslations'
    })
}
</script>
