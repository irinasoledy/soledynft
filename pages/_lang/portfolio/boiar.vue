<template>
    <main class="ja-bg portfolio-item" style="background-image: linear-gradient(135deg, #ECD7A9 0%, #D6BF8B 100%);">
        <img src="/portfolio/boiar/bannerMain.png" alt="">
        <!-- <h4 class="section-title">Boiar</h4> -->
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
            <img src="/portfolio/boiar/shopOnline.png" alt="">
            <h4 class="section-title">Copywriting</h4>
        </div>
        <!-- <v-row align="center" justify="center">
            <v-col>
                <img src="/portfolio/ja/banner.png" alt="">
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
        </v-row> -->

        <v-row align="center" justify="center">
            <v-col>
                <img src="/portfolio/boiar/copywritingImg.png" alt="">
            </v-col>
            <v-col>
                <p class="copywriting-portfolio">Pentru Proiectul BOIAR au fost concepute textele in 3 limbi , si anume Romana, Rusa, pentru paginile statice, categorii de produse si unele produse. Textele pot fi vizualizate pe:
                    <a href="https://boiar.md" target="_blank">boiar.md</a>
                </p>
            </v-col>
        </v-row>
        <div class="text-center container-slider">
            <h4 class="section-title">Develop and integrate CRM with Online Shop</h4>
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
            {src: '/portfolio/boiar/boiarItem1.png'},
            {src: '/portfolio/boiar/boiarItem2.png'},
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
</style>
