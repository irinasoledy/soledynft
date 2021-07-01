<template>
    <main class="about-content">
        <v-parallax dark src="https://back.terradigital.ro/images/promotions/1624011382-IMG_2447.PNG" v-if="!$mobileDetect.mobile()">
            <v-row align="center" justify="center">
                <v-col class="text-center" cols="12">
                    <h1 class="display-1 mb-4">
                        Automatizare Digitală Vânzari prin CRM
                    </h1>
                </v-col>
            </v-row>
        </v-parallax>

        <v-parallax dark src="https://back.terradigital.ro/images/promotions/1624013700-IMG_2453.PNG" v-else>
            <v-row align="center" justify="center">
                <v-col class="text-center" cols="12">
                    <h1 class="display-1 mb-4">
                        Automatizare Digitală Vânzari prin CRM
                    </h1>
                </v-col>
            </v-row>
        </v-parallax>

        <v-container>
            <section>
                <div>
                    <v-row  align="center" justify="center" class="promo-section">
                        <v-col cols="12" md="5" sm="12" xs="12">
                            <img class="section-image" src="https://back.terradigital.ro/images/promotions/1624016264-IMG_2479.PNG">
                        </v-col>
                        <v-col cols="12" md="2" sm="12" xs="12"></v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" class="container-section">
                            <p>Purpose-built video chat software</p>
                            <ul>
                                <li>No plugins, downloads, popups or separate applications required</li>
                                <li>Works on all devices/browsers including smartphones</li>
                                <li>Go fullscreen, 1 or 2 way video, flip cameras</li>
                                <li>Global low-latency architecture, HD-quality video</li>
                                <li>Use from agents’ mobile and tablet devices for a heightened virtual in-store experience</li>
                            </ul>
                        </v-col>
                    </v-row>
                    <v-row  align="center" justify="center" class="promo-section">
                        <v-col cols="12" md="5" sm="12" xs="12" v-if="$mobileDetect.mobile()">
                            <img class="section-image" src="https://back.terradigital.ro/images/promotions/1624016264-IMG_2478.PNG" alt="">
                        </v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" v-if="$mobileDetect.mobile()"></v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" class="container-section">
                            <p>Purpose-built video chat software</p>
                            <ul>
                                <li>No plugins, downloads, popups or separate applications required</li>
                                <li>Works on all devices/browsers including smartphones</li>
                                <li>Go fullscreen, 1 or 2 way video, flip cameras</li>
                                <li>Global low-latency architecture, HD-quality video</li>
                                <li>Use from agents’ mobile and tablet devices for a heightened virtual in-store experience</li>
                            </ul>
                        </v-col>
                        <v-col cols="12" md="2" sm="12" xs="12" v-if="!$mobileDetect.mobile()"></v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" v-if="!$mobileDetect.mobile()">
                            <img class="section-image" src="https://back.terradigital.ro/images/promotions/1624016264-IMG_2478.PNG" alt="">
                        </v-col>
                    </v-row>
                    <v-row  align="center" justify="center" class="promo-section">
                        <v-col cols="12" md="5" sm="12" xs="12">
                            <img class="section-image" src="https://back.terradigital.ro/images/promotions/1624016264-IMG_2478.PNG">
                        </v-col>
                        <v-col cols="12" md="2" sm="12" xs="12"></v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" class="container-section">
                            <p>Purpose-built video chat software</p>
                            <ul>
                                <li>No plugins, downloads, popups or separate applications required</li>
                                <li>Works on all devices/browsers including smartphones</li>
                                <li>Go fullscreen, 1 or 2 way video, flip cameras</li>
                                <li>Global low-latency architecture, HD-quality video</li>
                                <li>Use from agents’ mobile and tablet devices for a heightened virtual in-store experience</li>
                            </ul>
                        </v-col>
                    </v-row>
                    <v-row  align="center" justify="center" class="promo-section">
                        <v-col cols="12" md="5" sm="12" xs="12" v-if="$mobileDetect.mobile()">
                            <img class="section-image" src="https://back.terradigital.ro/images/promotions/1624016264-IMG_2480.PNG" alt="">
                        </v-col>
                        <v-col cols="12" md="2" sm="12" xs="12" v-if="$mobileDetect.mobile()"></v-col>

                        <v-col cols="12" md="5" sm="12" xs="12" class="container-section">
                            <p>Purpose-built video chat software</p>
                            <ul>
                                <li>No plugins, downloads, popups or separate applications required</li>
                                <li>Works on all devices/browsers including smartphones</li>
                                <li>Go fullscreen, 1 or 2 way video, flip cameras</li>
                                <li>Global low-latency architecture, HD-quality video</li>
                                <li>Use from agents’ mobile and tablet devices for a heightened virtual in-store experience</li>
                            </ul>
                        </v-col>
                        <v-col cols="12" md="2" sm="12" xs="12" v-if="!$mobileDetect.mobile()"></v-col>
                        <v-col cols="12" md="5" sm="12" xs="12" v-if="!$mobileDetect.mobile()">
                            <img class="section-image" src="https://back.terradigital.ro/images/promotions/1624016264-IMG_2480.PNG" alt="">
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
