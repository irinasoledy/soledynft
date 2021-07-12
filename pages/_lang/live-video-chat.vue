<template>
    <main class="about-content mt-16">
        <v-parallax dark src="/static-services/servicePage-zoom-banner-desktop.png" v-if="!$mobileDetect.mobile()">
            <v-container>
                <v-row align="center" class="slider-text-desktop">
                    <v-col class="text-center col-md-6">
                        <div class="text-center c-title">
                            {{ trans.ServicePages.zoomMainbannerTitle }}
                        </div>
                        <div class="text-center c-subtitle">
                            {{ trans.ServicePages.zoomMainbannerSubTitle }}
                        </div>
                    </v-col>
                </v-row>
            </v-container>
        </v-parallax>

        <v-parallax dark src="/static-services/servicePage-zoom-banner-mobile.png" v-else>
            <v-row align="center" justify="center" class="slider-text-mobile">
                <v-col class="text-center" cols="12">
                    <div class="text-center c-title">
                        {{ trans.ServicePages.zoomMainbannerTitle }}
                    </div>
                    <div class="text-center c-subtitle">
                        {{ trans.ServicePages.zoomMainbannerSubTitle }}
                    </div>
                </v-col>
            </v-row>
        </v-parallax>

        <v-container>
            <section>
                <div>
                    <v-row  align="center" justify="center" class="promo-section">
                        <v-col cols="12" md="5" sm="12" xs="12">
                            <img class="section-image" src="/static-services/servicePage-zoom-promo-section-1-livechat.png">
                        </v-col>
                        <v-col cols="12" md="2" sm="12" xs="12"></v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" class="container-section">
                            <p>{{ trans.ServicePages.zoomSection1Title }}</p>
                            <ul>
                                <li>{{ trans.ServicePages.zoomSection1Text1 }}</li>
                                <li>{{ trans.ServicePages.zoomSection1Text2 }}</li>
                                <li>{{ trans.ServicePages.zoomSection1Text3 }}</li>
                                <li>{{ trans.ServicePages.zoomSection1Text4 }}</li>
                            </ul>
                        </v-col>
                    </v-row>
                    <v-row  align="center" justify="center" class="promo-section">
                        <v-col cols="12" md="5" sm="12" xs="12" v-if="$mobileDetect.mobile()">
                            <img class="section-image" src="/static-services/servicePage-zoom-promo-section-2-zoomchat.png" alt="">
                        </v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" v-if="$mobileDetect.mobile()"></v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" class="container-section">
                            <p>{{ trans.ServicePages.zoomSection2Title }}</p>
                            <ul>
                                <li>{{ trans.ServicePages.zoomSection2Text1 }}</li>
                                <li>{{ trans.ServicePages.zoomSection2Text2 }}</li>
                                <li>{{ trans.ServicePages.zoomSection2Text3 }}</li>
                                <li>{{ trans.ServicePages.zoomSection2Text4 }}</li>
                            </ul>
                        </v-col>
                        <v-col cols="12" md="2" sm="12" xs="12" v-if="!$mobileDetect.mobile()"></v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" v-if="!$mobileDetect.mobile()">
                            <img class="section-image" src="/static-services/servicePage-zoom-promo-section-2-zoomchat.png" alt="">
                        </v-col>
                    </v-row>
                    <v-row  align="center" justify="center" class="promo-section">
                        <v-col cols="12" md="5" sm="12" xs="12">
                            <img class="section-image" src="/static-services/servicePage-zoom-promo-section-3-whatsapp-icons.png">
                        </v-col>
                        <v-col cols="12" md="2" sm="12" xs="12"></v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" class="container-section">
                            <p>{{ trans.ServicePages.zoomSection3Title }}</p>
                            <ul>
                                <li>{{ trans.ServicePages.zoomSection3Text1 }}</li>
                                <li>{{ trans.ServicePages.zoomSection3Text2 }}</li>
                                <li>{{ trans.ServicePages.zoomSection3Text3 }}</li>
                                <li>{{ trans.ServicePages.zoomSection3Text4 }}</li>
                            </ul>
                        </v-col>
                    </v-row>
                    <v-row  align="center" justify="center" class="promo-section">
                        <v-col cols="12" md="5" sm="12" xs="12" v-if="$mobileDetect.mobile()">
                            <img class="section-image" src="/static-services/servicePage-zoom-promo-section-4-messenger.png" alt="">
                        </v-col>
                        <v-col cols="12" md="2" sm="12" xs="12" v-if="$mobileDetect.mobile()"></v-col>

                        <v-col cols="12" md="5" sm="12" xs="12" class="container-section">
                            <p>{{ trans.ServicePages.zoomSection4Title }}</p>
                            <ul>
                                <li>{{ trans.ServicePages.zoomSection4Text1 }}</li>
                                <li>{{ trans.ServicePages.zoomSection4Text2 }}</li>
                                <li>{{ trans.ServicePages.zoomSection4Text3 }}</li>
                                <li>{{ trans.ServicePages.zoomSection4Text4 }}</li>
                            </ul>
                        </v-col>
                        <v-col cols="12" md="2" sm="12" xs="12" v-if="!$mobileDetect.mobile()"></v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" v-if="!$mobileDetect.mobile()">
                            <img class="section-image" src="/static-services/servicePage-zoom-promo-section-4-messenger.png" alt="">
                        </v-col>
                    </v-row>
                </div>
            </section>
        </v-container>

        <experts></experts>
        <section class="testimonials">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <div class="display-1 text-center">
                            {{ trans.General.testemonialsServicesPageTitle1 }} {{ trans.General.testemonialsServicesPageTitle2 }}
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <Testimonials></Testimonials>
                    </v-col>
                </v-row>
            </v-container>
        </section>
        <map-contact></map-contact>
    </main>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import Testimonials from "@/components/front/sliders/testimonialsSlider"
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
        trans: 'getTranslations'
    }),
    mounted(){
        this.title = this.trans.PageNames.aboutSeoTitle
        this.description = this.trans.PageNames.aboutSeoDesc
    },
    components: {
        Testimonials,
        MapContact,
        Experts,
    }
}
</script>

<style lang="scss">
.slider-text-mobile {
    width: 100%;
    margin-left: 0;
    .c-title {
        font-size: 1.5rem !important;
        line-height: 1.2 !important;
        color: #0a072c !important;
        margin-bottom: 20px !important;
    }
    .c-subtitle {
        font-size: 0.9rem !important;
        line-height: 1.2 !important;
        color: #0a072c !important;
    }
}
.section-image {
     max-width: 100%;
}
.about-content {
    background-color: $custom_blue !important;
    color: #FFF;
}
.display-1 {
    color: $custom_blue !important;
    font-weight: 700 !important;
}
.display-1-subtitle {
    color: $custom_blue !important;
    font-weight: 500 !important;
}

.about-content {
    .subheading {
        color: $custom_red !important
    }
    .v-parallax {
        height: 60vh !important;
    }
}

section {
    padding: 50px 0;
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
