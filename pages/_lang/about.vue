<template>
    <main class="about-content">
        <v-parallax
            dark
            src="/banner-about.jpg"
            >
            <v-row
                align="center"
                justify="center"
                >
                <v-col
                    class="text-center"
                    cols="12"
                    >
                    <h1 class="display-1 mb-4">
                        {{ trans.About.aboutPageTitle }}
                    </h1>
                    <h4 class="subheading" color="secondary">
                        {{ trans.About.aboutPageSubTitle }}
                    </h4>
                </v-col>
            </v-row>
        </v-parallax>
        <section>
            <div class="container">
                <div class="row justify-center">
                    <div class="col-lg-8 col-md-10 col-12">
                        <p class="text-center">
                            {{ trans.About.aboutPageText }}
                        </p>
                    </div>
                </div>
            </div>
        </section>
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
                        <testimonial></testimonial>
                    </v-col>
                </v-row>
            </v-container>
        </section>
        <map-contact></map-contact>
    </main>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Testimonial from "@/components/sliders/testimonial"
import MapContact from "@/components/mapContact.vue"
import Experts from "@/components/blocs/experts.vue"

export default {
    layout: "default",
    components: {
        Testimonial,
        MapContact,
        Experts,
    },
    computed: mapGetters({
        trans: 'getTranslations'
    })
}
</script>

<style lang="scss">
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
</style>
