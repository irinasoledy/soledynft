<template>
    <main class="experts-content">
        <div class="parallax-container">
            <v-parallax
                dark
                src="https://glassprotect.md/uploads/contact-us-inner-banner.png"
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
                            {{ trans.Team.teamPageTitle }}
                        </h1>
                        <h4 class="subheading" color="secondary">
                            {{ trans.Team.teamPageSubTitle }}
                        </h4>
                    </v-col>
                </v-row>
            </v-parallax>
        </div>
        <experts></experts>
        <map-contact></map-contact>
    </main>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import Experts from "@/components/front/widgets/expertsWidget.vue"
import MapContact from "@/components/front/widgets/mapWidget.vue"

export default {
    layout: "default",
    components: {
        MapContact, Experts
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
</style>
