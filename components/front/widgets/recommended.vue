<template>
    <section class="services recommended-area">
        <v-container>
            <section>
                <div>
                    <v-row>
                        <v-col cols="12">
                            <div class="display-1 text-center c-title white--text">
                                {{ trans.HP.hpRecomServices }}
                            </div>
                        </v-col>
                    </v-row>
                    <v-row  align="center" justify="center" class="promo-section">
                        <v-col cols="12" md="5" sm="12" xs="12">
                            <img class="section-image" src="https://back.terradigital.ro/images/promotions/1624016264-IMG_2479.PNG" width="100%">
                        </v-col>
                        <v-col cols="12" md="2" sm="12" xs="12"></v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" class="container-section">
                            <p>{{ trans.HP.hpsection1title }}</p>
                            <ul>
                                <li><v-icon> mdi-check</v-icon>{{ trans.HP.hpsection1text1 }}</li>
                                <li><v-icon> mdi-check</v-icon>{{ trans.HP.hpsection1text2 }}</li>
                                <li><v-icon> mdi-check</v-icon>{{ trans.HP.hpsection1text3 }}</li>
                                <li><v-icon> mdi-check</v-icon>{{ trans.HP.hpsection1text4 }}</li>
                            </ul>
                        </v-col>
                    </v-row>
                    <v-row  align="center" justify="center" class="promo-section">
                        <v-col cols="12" md="5" sm="12" xs="12" v-if="$mobileDetect.mobile()">
                            <img class="section-image" src="https://back.terradigital.ro/images/promotions/1624016264-IMG_2478.PNG" width="100%">
                        </v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" v-if="$mobileDetect.mobile()"></v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" class="container-section">
                            <p>{{ trans.HP.hpsection2title }}</p>
                            <ul>
                                <li><v-icon> mdi-check</v-icon>{{ trans.HP.hpsection2text1 }}</li>
                                <li><v-icon> mdi-check</v-icon>{{ trans.HP.hpsection2text2 }}</li>
                                <li><v-icon> mdi-check</v-icon>{{ trans.HP.hpsection2text3 }}</li>
                                <li><v-icon> mdi-check</v-icon>{{ trans.HP.hpsection2text4 }}</li>
                            </ul>
                        </v-col>
                        <v-col cols="12" md="2" sm="12" xs="12" v-if="!$mobileDetect.mobile()"></v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" v-if="!$mobileDetect.mobile()">
                            <img class="section-image" src="https://back.terradigital.ro/images/promotions/1624016264-IMG_2478.PNG" width="100%">
                        </v-col>
                    </v-row>
                </div>
            </section>
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
    .v-image__image--cover {
        background-size: 100% !important;
    }
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
.container-section{
    text-align: left;
    padding-left: 34px;
    ul {
        margin-top: 20px;
        margin-left: 20px;
        li {
            color: #FFF;
            padding-top: 5px;
            padding-bottom: 5px;
        }
    }
    p {
        font-size: 26px;
        color: #FFF;
    }
}
</style>
