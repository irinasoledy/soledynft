<template>
<v-footer dark color="primary footer-block" align="center" justify="center">
    <v-container>
        <v-row align="center" justify="center">
            <nuxt-link to="/" class="footer-logo">
                <img height="40" src="@/static/logo-docrom4.png" alt="">
            </nuxt-link>
        </v-row>

        <v-row align="center" justify="center">
            <v-card
                flat
                tile
                class="primary white--text text-center"
                >
                <v-card-text>
                    <a :href="trans.ContactsAndForms.companyFacebook">
                        <v-btn
                            class="mx-4 white--text"
                            icon
                            >
                            <v-icon size="24px">
                                mdi-facebook
                            </v-icon>
                        </v-btn>
                    </a>

                    <a :href="trans.ContactsAndForms.companyInstagram">
                        <v-btn
                            class="mx-4 white--text"
                            icon
                            >
                            <v-icon size="24px">
                                mdi-instagram
                            </v-icon>
                        </v-btn>
                    </a>
                </v-card-text>
            </v-card>
        </v-row>

        <v-row class="footer-links">
            <v-col lg="3">
                <h3>{{ trans.PageNames.aboutCompany }}</h3>
                <ul>
                    <li><nuxt-link :to="`/${language.lang}/about`">{{ trans.PageNames.about }}</nuxt-link></li>
                    <li><nuxt-link :to="`/${language.lang}/contacts`">{{ trans.PageNames.contacts }}</nuxt-link></li>
                    <li><nuxt-link :to="`/${language.lang}/experts`">{{ trans.PageNames.ourTeam }}</nuxt-link></li>
                    <li><nuxt-link :to="`/`">{{ trans.PageNames.faq }}</nuxt-link></li>
                </ul>
            </v-col>

            <v-col cols="12" lg="3">
                <h3>{{ trans.PageNames.ourServices }}</h3>
                <ul>
                    <li v-for="service in serviceArray[0]" :key="service.id">
                        <nuxt-link :to="`/${language.lang}/service/${service.alias}`">{{ service.translation.name }}</nuxt-link>
                    </li>
                </ul>
            </v-col>
            <v-col cols="12" lg="3">
                <h3>{{ trans.PageNames.ourServices }}</h3>
                <ul>
                    <li v-for="service in serviceArray[1]" :key="service.id">
                        <nuxt-link :to="`/${language.lang}/service/${service.alias}`">{{ service.translation.name }}</nuxt-link>
                    </li>
                </ul>
            </v-col>

            <v-col cols="12" lg="3">
                <h3>{{ trans.PageNames.policiesCompany }}</h3>
                <ul>
                    <li v-for="page in pages" :key="page.id">
                        <nuxt-link  :to="`/${language.lang}/${page.alias}`">
                            {{ page.translation.name }}
                        </nuxt-link>
                    </li>
                </ul>
            </v-col>
        </v-row>
        <v-card
            flat
            tile
            class="primary white--text text-center"
            align="center" justify="center"
            >
            <v-card-title class="justify-center">
                {{ trans.PageNames.contacts }}
            </v-card-title>
            <v-card-text class="white--text pt-0">
                {{ trans.ContactsAndForms.companyMainName }} |
                {{ trans.ContactsAndForms.companyMainAdres }} |
                {{ trans.ContactsAndForms.companyMainPhone1 }} |
                {{ trans.ContactsAndForms.companyMainEmail1 }}
            </v-card-text>

            <v-divider></v-divider>
            <v-card-text class="white--text">
                <strong>{{ trans.HeaderFooter.copyright }}</strong>
                {{ trans.HeaderFooter.madeBy }} {{ trans.HeaderFooter.madeByName }}
            </v-card-text>
        </v-card>
    </v-container>
</v-footer>
</template>

<script>

import { mapActions, mapGetters } from 'vuex';

export default {
    data: () => ({
        icons: [
            'mdi-facebook',
            'mdi-instagram',
        ],
        serviceArray: [],
    }),
    computed: mapGetters({
        pages : 'getPages',
        language: 'getLanguage',
        trans: 'getTranslations',
        services: 'getServices',
    }),
    mounted(){
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

<style lang="scss">
    .footer-block{
        padding-top: 50px;
        .footer-logo{
            width: 200px;
            img{
                width: 100%;
                height: auto;
            }
        }
        h3{
            text-transform: uppercase;
        }
        .footer-links{
            ul{
                margin-top: 15px;
                padding-left: 0;
                li{
                    list-style: none;
                    a{
                        color: #FFF;
                        text-decoration: none;
                    }
                    a:hover{
                        text-decoration: underline;
                    }
                }
            }
        }
    }
    .footer-link{
        color: #FFF !important;
    }
</style>
