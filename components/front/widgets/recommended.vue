<template>
    <section class="services recommended-area">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <div class="display-1 text-center c-title white--text">
                        Servicii Recomandate
                    </div>
                </v-col>
            </v-row>
            <v-row>
                <v-spacer></v-spacer>
                <v-col cols="12" sm="6" md="6">
                    <v-card>
                        <v-img src="/test-recom.jpeg" height="400px">
                            <span
                                class="headline white--text pl-4 pt-4 d-inline-block"
                                v-text="'Publicitate Google Apps'"
                            ></span>
                            <ul>
                                <li><v-icon> mdi-check</v-icon>Lorem Ipsum is simply dummy text of the printing</li>
                                <li><v-icon> mdi-check</v-icon>Typesetting industry. Lorem Ipsum has been the industry's</li>
                                <li><v-icon> mdi-check</v-icon>It has survived not only five centuries, but also the leap into </li>
                                <li><v-icon> mdi-check</v-icon>Letraset sheets containing Lorem Ipsum passages, and more recently with desktop</li>
                                <li><v-icon> mdi-check</v-icon>It has survived not only five centuries, but also the leap into </li>
                            </ul>
                            <v-btn class="recommended-btn" color="primary">Details</v-btn>
                        </v-img>
                    </v-card>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                    <v-card>
                        <v-img src="/test-recom2.jpeg" height="400px">
                            <span
                                class="headline white--text pl-4 pt-4 d-inline-block"
                                v-text="'Publicitate Google Apps'"
                            ></span>
                            <ul>
                                <li><v-icon> mdi-check</v-icon>Lorem Ipsum is simply dummy text of the printing</li>
                                <li><v-icon> mdi-check</v-icon>Typesetting industry. Lorem Ipsum has been the industry's</li>
                                <li><v-icon> mdi-check</v-icon>It has survived not only five centuries, but also the leap into </li>
                                <li><v-icon> mdi-check</v-icon>Letraset sheets containing Lorem Ipsum passages, and more recently with desktop</li>
                                <li><v-icon> mdi-check</v-icon>It has survived not only five centuries, but also the leap into </li>
                            </ul>
                            <v-btn class="recommended-btn" color="primary">Details</v-btn>
                        </v-img>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </section>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    data: () => ({
        types: ['Places to Be', 'Places to See'],
        cards: ['Publicitate Google Apps', 'Promovare SMM'],
        socials: [
            {
                icon: 'mdi-facebook',
                color: 'indigo',
            },
            {
                icon: 'mdi-linkedin',
                color: 'cyan darken-1',
            },
            {
                icon: 'mdi-instagram',
                color: 'red lighten-3',
            },
        ],
    }),
    computed: mapGetters({
        trans: 'getTranslations'
    }),
    methods: {
        getImage() {
            const min = 550
            const max = 560

            return Math.floor(Math.random() * (max - min + 1)) + min
        },
    },
}
</script>

<style scoped lang="scss">
.recommended-area {
    background-color: $custom_blue;
    ul{
        margin-left: 25px;
        list-style: none;
        li{
            color: #FFF;
            font-size: 1rem !important;
            font-weight: 400;
            line-height: 2rem;
            .v-icon{
                color: #FFF;
                margin-right: 10px;
                font-size: 14px;
            }
        }
    }
    .recommended-btn{
        margin-left: 30px;
        margin-top: 20px;
        color: $custom_green !important;
    }
}
</style>
