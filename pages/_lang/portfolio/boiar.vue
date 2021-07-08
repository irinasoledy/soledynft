<template>
    <main class="ja-bg portfolio-item" style="background-image: linear-gradient(135deg, #ECD7A9 0%, #D6BF8B 100%);">
        <img src="/portfolio/boiar/bannerMain.png" width="100%">
        <div class="text-center">
            <h4 class="section-title">Branding</h4>
            <v-carousel hide-delimiters>
                <v-carousel-item
                    v-for="(item,i) in branding"
                    :key="i"
                    :src="item.src"
                    ></v-carousel-item>
            </v-carousel>
        </div>
        <div class="text-center">
            <h4 class="section-title">Shop Online</h4>
            <img src="/portfolio/boiar/shopOnline.png">
            <h4 class="section-title">Copywriting</h4>
        </div>
        <v-row align="center" justify="center">
            <v-col cols="12" md="6">
                <img src="/portfolio/boiar/copywritingImg.png">
            </v-col>
            <v-col cols="12" md="6">
                <p class="copywriting-portfolio">
                    {{ trans.Portfolio.insidePageFotoCopywritingText }}
                </p>
            </v-col>
        </v-row>
        <div class="text-center container-slider">
            <h4 class="section-title">{{ trans.Portfolio.insidePageCRMTitle }}</h4>
            <v-carousel hide-delimiters>
                <v-carousel-item
                    v-for="(item,i) in CRMImages"
                    :key="i"
                    :src="item.src"
                    ></v-carousel-item>
            </v-carousel>
        </div>
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
        branding: [
            {src: '/portfolio/boiar/boiarItem2.png'},
            {src: '/portfolio/boiar/boiarItem1.png'},
        ],
        photoVideoImages: [
            {src: '/portfolio/ja/juliaItem1.png'},
            {src: '/portfolio/ja/juliaItem2.png'},
            {src: '/portfolio/ja/juliaItem3.png'},
            {src: '/portfolio/ja/juliaItem4.png'},
        ],
        CRMImages: [
            {src: '/portfolio/boiar/crmSlide1.png'},
            {src: '/portfolio/boiar/crmSlide2.png'},
            {src: '/portfolio/boiar/crmSlide3.png'},
        ],
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
.portfolio-item img {
    max-width: 100%;
}
.section-title {
    font-size: 30pt;
    background: #FFFFFF;
    box-shadow: 0 16px 40px 0 rgb(0 0 0 / 18%);
    max-width: 650px;
    padding: 20px;
    margin: 20px auto;
    top: -30%;
    text-align: center;
}
.ja-bg {
    background-repeat: repeat;
}
.list-title {
    font-weight: bold;
    font-size: 35px;
    color: #23232F;
    margin-bottom: 30px;
}
.potfolio-list {
    li {
        margin-left: 30px;
        font-size: 20px;
        color: #23232F;
        line-height: 30px;
        padding-top: 5px;
        padding-bottom: 5px;
    }
}
.copywriting-portfolio {
    font-size: 30px;
    color: #262626;
    letter-spacing: 0;
    text-align: justify;
    padding: 30px;
}
.container-slider{
    max-width: 80%;
    margin: 30px auto;
}
@media (max-width: 991px) {
    .portfolio-item{
        margin-top: 50px;
    }
    .list-title{
        text-align: center;
    }
    .copywriting-portfolio{
        font-size: 20px;
    }
    .section-title{
        font-size: 25px;
    }
    .v-image__image--cover{
        background-size: 100% !important
    }
    .container-slider{
        max-width: 100% !important;
    }
    .section-title {
        background-color: transparent;
        font-size: 25px;
    }
}
</style>
