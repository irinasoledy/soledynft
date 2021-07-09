<template>
    <main>
        <banner/>
        <div class="callNow">
            <v-parallax height="200" :src="$banner('callNowBGBanner', $mobileDetect.mobile())">
                <v-container>
                    <v-row>
                        <v-col>
                            <v-sheet
                                class="c-sheet text-center"
                                elevation="0"
                                height="auto"
                                width="auto"
                            >
                                <v-btn
                                    class="ma-2 btn-yell"
                                    medium
                                    max-width="330"
                                    color="primary"
                                    @click="$nuxt.$emit('open-appointment-form')"
                                >
                                    <v-icon left>mdi-comment-bookmark</v-icon>
                                    OBTINE UN DEMO
                                </v-btn>
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-container>
            </v-parallax>
        </div>
        <services></services>
        <recommended></recommended>
        <experts></experts>
        <div class="callNow">
            <v-parallax height="200" :src="$banner('callNowBGBanner', $mobileDetect.mobile())">
                <v-container>
                    <v-row>
                        <v-col>
                            <v-sheet
                                class="c-sheet text-center"
                                elevation="0"
                                height="auto"
                                width="auto"
                            >
                                <v-btn
                                    class="ma-2 btn-yell"
                                    medium
                                    color="primary"
                                    @click="$nuxt.$emit('open-appointment-form')"
                                >
                                    <v-icon left>mdi-comment-bookmark</v-icon>
                                   obtine un demo
                                </v-btn>
                            </v-sheet>
                        </v-col>
                    </v-row>
                </v-container>
            </v-parallax>
        </div>
        <section class="testimonials">
            <v-container>
                <v-row>
                    <v-col cols="12">
                        <div class="display-1 text-center white--text">
                            {{ trans.General.testemonialsServicesPageTitle1 }}
                            {{ trans.General.testemonialsServicesPageTitle2 }}
                        </div>
                    </v-col>
                    <v-col cols="12">
                        <testimonials></testimonials>
                    </v-col>
                </v-row>
            </v-container>
        </section>
        <map-contact></map-contact>
    </main>
</template>

<script>
import Slick from 'vue-slick'
import 'slick-carousel/slick/slick.css';
import {mapActions, mapGetters} from 'vuex'
import Testimonials from '@/components/front/sliders/testimonialsSlider'
import Banner from '@/components/front/sliders/homeSlider'
import Experts from '@/components/front/widgets/expertsWidget.vue'
import Services from '@/components/front/widgets/servicesWidget.vue'
import MapContact from "@/components/front/widgets/mapWidget.vue"
import Recommended from "~/components/front/widgets/recommended";

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
        language: 'getLanguage',
        trans: 'getTranslations',
        banners: 'getBanners',
        chatBotMessage: 'chat/getChatBotMessage',
    }),
    mounted() {
        this.setChatBotmessage(this.trans.General.botMessageTemplateHP)
        this.title = this.trans.PageNames.homeSeoTitle
        this.description = this.trans.PageNames.homeSeoDesc
    },
    methods: {
        ...mapActions({
            banner: 'banner',
            setChatBotmessage: 'chat/setChatBotmessage'
        })
    },
    components: {
        Recommended,
        Testimonials,
        MapContact,
        Experts,
        Services,
        Banner,

    },
}
</script>

<style lang="scss" scoped>

.testimonials {
    background-color: $custom_blue;
}

.display-1 {
    font-weight: 700 !important;
}

.banner {

    .c-title {
        color: $custom_blue;
        font-weight: 900 !important;
        margin-bottom: 5rem;
    }

    .c-sheet {
        padding: 20px;
        text-align: center;
        display: inline;
        background: rgba($color: $custom_red, $alpha: 1);
    }

    .v-responsive__content {
        background-color: rgba($color: #ffff, $alpha: 0.8);
    }
}

.callNow {
    .c-sheet {
        background: transparent;
    }

    .btn-yell {
        //background: $custom_yellow !important;
        color: $custom_yellow !important;
    }
}

.experts {
    background-color: $custom_blue;

    .display-1 {
        color: #ffff !important;
    }

    .text {
        color: #ffff;
        max-width: 500px;
        margin: 20px auto;
    }
}

section {
    padding: 50px 0;
}

main {
    // padding-bottom: 50px;
    padding-top: 56px;
}

@media (min-width: 767px) {
    .banner {

        .v-window,
        .v-carousel__item {
            // min-height: 80vh;
            // min-height: 558px;
        }
    }
}


@media (min-width: 992px) {
    main {
        padding-top: 118px;
    }
}

.v-image__image--cover {
    background-size: 100% auto;
    background-size: contain;
}

.v-carousel__item {
    height: auto !important;
}

.v-carousel {
    height: auto !important;
}

.v-image__image--cover {
    background-size: 100% 100%;
}

.v-carousel__item {
    height: 558px !important;
}
</style>
