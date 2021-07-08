<template>
    <main class="ja-bg portfolio-item" :style="{ backgroundImage: `url('/portfolio/ja/fonJulia.png')`}">
        <img src="/portfolio/sd/md2.jpeg" width="100%">
        <h4 class="section-title">Stone Decorum</h4>
        <img src="/portfolio/sd/BranbookStoneDecorum.jpeg" width="100%">
        <h4 class="section-title">{{ trans.Portfolio.insidePageStrategyTitle }}</h4>
        <v-row align="center" justify="center">
            <v-col cols="12" md="6">
                <img src="/portfolio/ja/banner.png" width="100%">
            </v-col>
            <v-col cols="12" md="6">
                <h3 class="list-title">{{ trans.Portfolio.insidePageStrategySubTitle }}</h3>
                <ul class="potfolio-list">
                    <li>{{ trans.Portfolio.insidePageStrategyText1 }}</li>
                    <li>{{ trans.Portfolio.insidePageStrategyText2 }}</li>
                    <li>{{ trans.Portfolio.insidePageStrategyText3 }}</li>
                    <li>{{ trans.Portfolio.insidePageStrategyText4 }}</li>
                    <li>{{ trans.Portfolio.insidePageStrategyText5 }}</li>
                    <li>{{ trans.Portfolio.insidePageStrategyText6 }}</li>
                    <li>{{ trans.Portfolio.insidePageStrategyText7 }}</li>
                </ul>
            </v-col>
        </v-row>
        <div class="text-center">
            <h4 class="section-title">Shop Online</h4>
            <img src="/portfolio/sd/MOCKUP.Stonedecorum.png" alt="">
        </div>
        <div class="text-center">
            <h4 class="section-title">{{ trans.Portfolio.insidePageLocalisationTitle }}</h4>
            <img src="/portfolio/ja/bloc6Img.png">
        </div>
        <div class="text-center">
            <h4 class="section-title">{{ trans.Portfolio.insidePageConsultingTitle }}</h4>
            <img src="/portfolio/ja/bloc7.png">
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
        photoVideoImages: [
            {src: '/portfolio/ja/juliaItem1.png'},
            {src: '/portfolio/ja/juliaItem2.png'},
            {src: '/portfolio/ja/juliaItem3.png'},
            {src: '/portfolio/ja/juliaItem4.png'},
        ],
        CRMImages: [
            {src: '/portfolio/ja/crmSlide1.png'},
            {src: '/portfolio/ja/crmSlide2.png'},
            {src: '/portfolio/ja/crmSlide3.png'},
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
    .section-title {
        background-color: transparent;
        font-size: 25px;
    }
}
</style>
