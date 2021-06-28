<template>
    <main class="ja-bg portfolio-item" :style="{ backgroundImage: `url('/portfolio/ja/fonJulia.png')`}">
        <img src="/portfolio/apj/mainbanerapj.jpeg" alt="">
        <h4 class="section-title">Anne Popova Jewellry</h4>

        <div class="text-center">
            <h4 class="section-title">Branding</h4>
            <img src="/portfolio/apj/BranbookAPJ.jpeg" width="100%">
            <!-- <h4 class="section-title">Realizarea sessiunilor foto-video</h4>
            <v-carousel hide-delimiters>
                <v-carousel-item
                    v-for="(item,i) in photoVideoImages"
                    :key="i"
                    :src="item.src"
                    ></v-carousel-item>
            </v-carousel> -->
            <h4 class="section-title">Strategie de marketing</h4>
        </div>
        <v-row align="center" justify="center">
            <v-col>
                <img src="/portfolio/apj/banner.png" alt="">
            </v-col>
            <v-col>
                <h3 class="list-title">Regions analyzed - Europe and the US</h3>
                <ul class="potfolio-list">
                    <li>Over 50 countries surveyed</li>
                    <li>Analyze existing product interest, over 300 interests</li>
                    <li>Potential target audience analysis, 5 age categories, 3 revenue categories.</li>
                    <li>Logisticы Analysis - Cost Optimization</li>
                    <li>Market penetration and development strategy</li>
                    <li>Promotion. Accumulation of leads. Marketing budgets. Support and first export</li>
                    <li>* Outcome: There were identified 3 groups of countries in Europe with total number of consumers who expressed interest in the Customer's products of over 5 million (each)</li>
                </ul>
            </v-col>
        </v-row>
        <div class="text-center">
            <h4 class="section-title">Online Shop</h4>
            <img src="/portfolio/apj/MOCKUP.APJ.png" alt="">
        </div>

        <div class="text-center">
            <h4 class="section-title">Social Media Management</h4>
            <slick ref="slick" :options="slickOptions">
                <img src="/portfolio/apj/SmmAPJ.png" alt="">
                <img src="/portfolio/apj/Smm_APJ_insta.png" alt="">
            </slick>

            <slick ref="slick2" :options="slickOptions">
                <img src="/portfolio/apj/Smm APJ.Mob.png" class=="mobile-slick-view">
                <img src="/portfolio/apj/Smm_APJ_Insta_Mob.png" class=="mobile-slick-view">
            </slick>
        </div>

        <!-- <div class="text-center">
            <h4 class="section-title">Social Media Management</h4>
            <img src="/portfolio/ja/administrationRetImg.png" alt="">
        </div> -->

        <div class="text-center">
            <h4 class="section-title">Realiazarea sessiunulor foto-video</h4>
            <v-carousel hide-delimiters>
                <v-carousel-item
                    v-for="(item,i) in photoVideoImages"
                    :key="i"
                    :src="item.src"
                    ></v-carousel-item>
            </v-carousel>
        </div>

        <div class="text-center">
            <h4 class="section-title">Locating your business in the region with the highest sales potential in Europe</h4>
            <img src="/portfolio/apj/presentationLoc.png" alt="">
        </div>

        <div class="text-center">
            <h4 class="section-title">Consulting services</h4>
            <img src="/portfolio/apj/bloc7.png" alt="">
        </div>
    </main>
</template>

<script>

import 'slick-carousel/slick/slick.css';
import { mapActions, mapGetters } from 'vuex'
import Slick from 'vue-slick'
import Experts from "@/components/front/widgets/expertsWidget.vue"
import MapContact from "@/components/front/widgets/mapWidget.vue"


export default {
    layout: "default",
    head() {
        return {
            slickOptions: {
                slidesToShow: 2,
                arrows: false,
                dots: false,
            },
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
            {src: '/portfolio/apj/jwbanner1.jpeg'},
            {src: '/portfolio/apj/jwbanner2.jpeg'},
            {src: '/portfolio/apj/jwbanner3.jpeg'},
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
        MapContact, Experts, Slick
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
.slick-active {
    background-color: transparent !important;
}
.slick-arrow{
    display: none !important;
}
.mobile-slick-view {
    max-height: 500px !important;
    width: auto !important;
}
</style>
