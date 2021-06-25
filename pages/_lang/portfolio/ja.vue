<template>
    <main class="portfolio-content">
    <v-container>
        <v-row>
            <h1 class="text-center white--text">Julia Allert</h1>
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
        trans: 'getTranslations'
    }),
    mounted(){
        this.title = this.trans.PageNames.defaultPageSeoTitle
        this.description = this.trans.PageNames.defaultPageSeoDesc
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
    padding-top: 100px;
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
        .portfolio-title {
            color: #007bff;
            font-weight: bold;
            font-size: 30px;
            text-align: center !important;
            padding: 15px;
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
