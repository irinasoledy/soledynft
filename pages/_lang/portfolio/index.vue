<template>
    <main class="portfolio-content">
        <v-parallax
            dark
            src="/banner-about.jpg"
            class="profolio-banner"
            >
            <v-row align="center" justify="center">
                <v-col
                    class="text-center"
                    cols="12"
                    >
                    <h1 class="display-1 mb-4">
                        {{ trans.PageNames.portfolio }}
                    </h1>
                    <h4 class="subheading" color="secondary">
                        {{ trans.About.aboutPageSubTitle }}
                    </h4>
                </v-col>
            </v-row>
        </v-parallax>
    <v-container>
        <v-row>
            <v-col cols="12" md="4" sm="12" xs="12">
                <v-card
                    :to="`/${language.lang}/portfolio/ja`"
                    :loading="loading"
                    class="mx-auto my-4 profolio-item"
                    >
                    <img src="/portfolio/TD-JA-banner-main.png" width="100%">
                    <div class="portfolio-descr text-center">
                        <h3>{{ trans.Portfolio.cli1Title }}</h3>
                        <p>{{ trans.Portfolio.cli1SubTitle }}</p>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="12" xs="12">
                <v-card
                    :to="`/${language.lang}/portfolio/apj`"
                    :loading="loading"
                    class="mx-auto my-4 profolio-item"
                    >
                    <img src="/portfolio/TD-AP-Bijoux-banner-main.png" width="100%">
                    <div class="portfolio-descr text-center">
                        <h3>{{ trans.Portfolio.cli2Title }}</h3>
                        <p>{{ trans.Portfolio.cli2SubTitle }}</p>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="12" xs="12">
                <v-card
                    :to="`/${language.lang}/portfolio/apl`"
                    :loading="loading"
                    class="mx-auto my-4 profolio-item"
                    >
                    <img src="/portfolio/TD-AP-Homewear-banner-main.png" width="100%">
                    <div class="portfolio-descr text-center">
                        <h3>{{ trans.Portfolio.cli3Title }}</h3>
                        <p>{{ trans.Portfolio.cli3SubTitle }}</p>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="12" xs="12">
                <v-card
                    :to="`/${language.lang}/portfolio/stone-decorum`"
                    :loading="loading"
                    class="mx-auto my-4 profolio-item"
                    >
                    <img src="/portfolio/TD-Stonedecorum-banner-main.png" width="100%">
                    <div class="portfolio-descr text-center">
                        <h3>{{ trans.Portfolio.cli4Title }}</h3>
                        <p>{{ trans.Portfolio.cli4SubTitle }}</p>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="12" xs="12">
                <v-card
                    :to="`/${language.lang}/portfolio/sandic`"
                    :loading="loading"
                    class="mx-auto my-4 profolio-item"
                    >
                    <img src="/portfolio/TD-Sandic-banner-main.png" width="100%">
                    <div class="portfolio-descr text-center">
                        <h3>{{ trans.Portfolio.cli5Title }}</h3>
                        <p>{{ trans.Portfolio.cli5SubTitle }}</p>
                    </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="12" xs="12">
                <v-card
                    :to="`/${language.lang}/portfolio/seminee`"
                    :loading="loading"
                    class="mx-auto my-4 profolio-item"
                    >
                    <img src="/portfolio/TD-Seminee-banner-main.png" width="100%">
                    <div class="portfolio-descr text-center">
                        <h3>{{ trans.Portfolio.cli6Title }}</h3>
                        <p>{{ trans.Portfolio.cli6SubTitle }}</p>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" md="4" sm="12" xs="12">
                <v-card
                    :to="`/${language.lang}/portfolio/trenwood`"
                    :loading="loading"
                    class="mx-auto my-4 profolio-item"
                    >
                    <img src="/portfolio/Portfolio-Trenwood-bannerMain.png" width="100%">
                        <div class="portfolio-descr text-center">
                            <h3>{{ trans.Portfolio.cli8Title }}</h3>
                            <p>{{ trans.Portfolio.cli8SubTitle }}</p>
                        </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="12" xs="12">
                <v-card
                    :to="`/${language.lang}/portfolio/boiar`"
                    :loading="loading"
                    class="mx-auto my-4 profolio-item"
                    >
                    <img src="/portfolio/Portfolio-Boiar-main-image.jpg" width="100%">
                        <div class="portfolio-descr text-center">
                            <h3>{{ trans.Portfolio.cli9Title }}</h3>
                            <p>{{ trans.Portfolio.cli9SubTitle }}</p>
                        </div>
                </v-card>
            </v-col>
            <v-col cols="12" md="4" sm="12" xs="12">
                <v-card
                    :to="`/${language.lang}/portfolio/soledy`"
                    :loading="loading"
                    class="mx-auto my-4 profolio-item"
                    >
                    <img src="/portfolio/Portfolio-Soledy-bannerMain.png" width="100%">
                        <div class="portfolio-descr text-center">
                            <h3>{{ trans.Portfolio.cli10Title }}</h3>
                            <p>{{ trans.Portfolio.cli10SubTitle }}</p>
                        </div>
                </v-card>
            </v-col>

            <v-col cols="12" md="4" sm="12" xs="12">
                <v-card
                    :to="`/${language.lang}/portfolio/bh`"
                    :loading="loading"
                    class="mx-auto my-4 profolio-item"
                    >
                    <img src="/portfolio/Portfolio-Hasdeu-bannerMain.png" width="100%">
                        <div class="portfolio-descr text-center">
                            <h3>{{ trans.Portfolio.cli11Title }}</h3>
                            <p>{{ trans.Portfolio.cli11SubTitle }}</p>
                        </div>
                </v-card>
            </v-col>

            <v-col cols="12" md="4" sm="12" xs="12">
                <v-card
                    :to="`/${language.lang}/portfolio/docrom`"
                    :loading="loading"
                    class="mx-auto my-4 profolio-item"
                    >
                    <img src="/portfolio/Portfolio-docrom-bannerMain.png" width="100%">
                        <div class="portfolio-descr text-center">
                            <h3>{{ trans.Portfolio.cli12Title }}</h3>
                            <p>{{ trans.Portfolio.cli12SubTitle }}</p>
                        </div>
                </v-card>
            </v-col>

            <v-col cols="12" md="4" sm="12" xs="12">
                <v-card
                    :to="`/${language.lang}/portfolio/gt`"
                    :loading="loading"
                    class="mx-auto my-4 profolio-item"
                    >
                    <img src="/portfolio/Portfolio-GT-bannerMain.png" width="100%">
                        <div class="portfolio-descr text-center">
                            <h3>{{ trans.Portfolio.cli13Title }}</h3>
                            <p>{{ trans.Portfolio.cli13SubTitle }}</p>
                        </div>
                </v-card>
            </v-col>

        </v-row>
    </v-container>
</main>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import Experts from "@/components/front/widgets/expertsWidget.vue"
import MapContact from "@/components/front/widgets/mapWidget.vue"

export default {
    layout: "default",
    head() {
        return {
            title: this.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.description
                }
            ]
        }
    },
    data: () => ({
        title: '',
        description: '',
    }),
    computed: mapGetters({
        trans: 'getTranslations',
        language: 'getLanguage',
    }),
    mounted() {
        this.setChatBotmessage(this.trans.General.botMessageTemplateAboutExperts)
        this.title = this.trans.PageNames.defaultPageSeoTitle
        this.description = this.trans.PageNames.defaultPageSeoDesc
    },
    methods: {
        ...mapActions({
            setChatBotmessage: 'chat/setChatBotmessage'
        }),
    },
    components: {
        MapContact, Experts
    }
}
</script>

<style lang="scss">
.display-1 {
    color: $custom_blue !important;
    font-weight: 700 !important;
}
.portfolio-content {
    margin-top: 100px;
    background-color: $primary_dark !important;
    .profolio-item {
        background-color: $custom_blue !important;
        color: #FFF;
        .text-subtitle-1 {
            color: #FFF;
        }
        .portfolio-desc {
            color: #FFF;
        }
        .portfolio-descr {
            padding: 15px;
            p{
                font-size: 14px;
                padding-top: 10px;
                min-height: 50px;
            }
        }
        .btn-area {
            padding: 20px;
            .btn-custom{
                color: $custom_blue !important;
            }
        }
    }
    .text-subtitle-1 {
        padding: 6px 15px !important;
    }
    .text-subtitle-1:nth-child(odd) {
        background-color: $primary_dark;
    }
}
.subheading {
    color: $custom_blue !important;
}
.experts-content {
    .subheading {
        color: $custom_red !important
    }
    .v-parallax {
        height: 60vh !important;
        position: relative;
        h1,
        h4 {
            position: relative;
            z-index: 2;
            max-width: 400px;
            margin: auto;
        }
        h4 {
            padding: 10px 0;
            border-top: 3px solid $custom_yellow;
            border-bottom: 3px solid $custom_yellow;
        }
    }
    .parallax-container {
        position: relative;
    }
    .v-parallax:before {
        content: "";
        position: absolute;
        left: 0;
        top: 0;
        height: 100%;
        width: 100%;
        background-color: hsla(0, 0%, 100%, .7);
        z-index: 2;
    }
    .contactForm {
        max-width: 360px;
        margin: auto;
    }
}

section {
    padding: 50px 0;
}
.profolio-banner{
    margin-top: -100px !important;
}
</style>
