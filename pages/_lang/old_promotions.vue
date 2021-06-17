<template lang="html">
    <main class="about-content">
        <div v-for="promotion in promotions" :key="promotion.id" :id="`promotion-${promotion.id}`">

            <div class="banner-wrapper">
                <v-img
                    v-if="!$mobileDetect.mobile()"
                    :src="`${envAPI}/images/promotions/${promotion.img}`"
                    aspect-ratio="2"
                ></v-img>

                <img width="100%" v-else :src="`${envAPI}/images/promotions/${promotion.img_mobile}`">
                <h1 class="display-1 mb-4 text-center">
                    {{ promotion.translation.name }}
                </h1>
            </div>

            <!-- <section> -->
                <v-container>
                    <v-row align="center" justify="center">

                        <!-- <v-col>

                        </v-col> -->

                        <v-expansion-panels v-if="promotion.translation.body">
                            <v-expansion-panel>

                                <v-expansion-panel-header class="text-center justify-center accordion-title">
                                    {{ trans.General.viewPromoDetails }}
                                    <template v-slot:actions>
                                        <v-icon color="primary">
                                            $expand
                                        </v-icon>
                                    </template>
                                </v-expansion-panel-header>
                                <v-expansion-panel-content>
                                    <div v-html="promotion.translation.body">

                                    </div>
                                </v-expansion-panel-content>
                            </v-expansion-panel>
                        </v-expansion-panels>


                    </v-row>


                </v-container>
            <!-- </section> -->
            <div class="text-center contact-btns"><br>
                <!-- <p>{{ trans.ContactsAndForms.promosFormSectionTitle }} </p> -->
                <v-btn class="-full-width" color="secondary" href="#experts-area">{{ trans.HP.hpDiscussLive }}</v-btn>
                <v-btn class="-full-width" color="info" @click="$nuxt.$emit('open-appointment-form')">{{ trans.ContactsAndForms.promosFormSectionBtnText }}</v-btn>
            </div>
        </div>

        <div id="experts-area">
            <experts></experts>
        </div>
        <appointment-form></appointment-form>

    </main>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import Experts from "@/components/front/widgets/expertsWidget.vue"
import appointmentForm from "@/components/front/forms/appointmentForm.vue"

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
        services : 'getServices',
        language : 'getLanguage',
        envAPI : 'getEnvAPI',
        promotions : 'getPromotions',
        trans: 'getTranslations'
    }),
    mounted(){
        this.title = this.trans.PageNames.defaultPageSeoTitle
        this.description = this.trans.PageNames.defaultPageSeoDesc
    },
    components: { Experts, appointmentForm }
}
</script>

<style lang="scss">
.v-expansion-panel::before{
    box-shadow: none !important;
}
.v-application--is-ltr .v-expansion-panel-header__icon{
    margin-left: 10px !important;
}
.accordion-title{
    font-size: 20px !important;
    margin-top: 25px;
}

.contact-btns{
    // background-color: $custom_blue;
    color: #FFF;
    padding-bottom: 40px;
}
.v-carousel__item{
    height: auto !important;
}
.v-carousel{
    height: auto !important;
}
.banner-wrapper{
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
}
.banner-wrapper h1{
    position: absolute;
    left: 0px;
    top: 45%;
    width: 100%;
    height: auto;
}
@media (max-width: 991px) {
    .-full-width{
        width: 90%;
        margin-bottom: 9px;
    }
    .banner-wrapper h1{
        top: 40%;
        font-size: 1.2rem !important
    }
}
</style>
