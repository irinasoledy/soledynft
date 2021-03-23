<template lang="html">
    <main class="about-content">
        <div v-for="promotion in promotions" :key="promotion.id" :id="`promotion-${promotion.id}`">
            <v-img
          :src="`${envAPI}/images/promotions/${promotion.img}`"
          aspect-ratio="2"
        ></v-img>

            <!-- <v-parallax dark :src="`${envAPI}/images/promotions/${promotion.img}`">
                <v-row
                    align="center"
                    justify="center"
                    >
                    <v-col
                        class="text-center"
                        cols="12"
                        >
                        <h1 class="display-1 mb-4">
                            {{ promotion.translation.name }}
                        </h1>
                    </v-col>
                </v-row>
            </v-parallax> -->

            <section>
                <div class="container">
                    <div class="row justify-center">

                        <h1 class="display-1 mb-4">
                            {{ promotion.translation.name }}
                        </h1>

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
                    </div>
                </div>
            </section>
            <experts></experts>
            <div class="text-center contact-btns"><br>
                <p>{{ trans.ContactsAndForms.promosFormSectionTitle }} </p>
                <v-btn color="secondary">{{ trans.ContactsAndForms.promosFormSectionBtnText }}</v-btn> <br>
            </div>
        </div>
    </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import Experts from "@/components/blocs/experts.vue"

export default {
    computed: mapGetters({
        services : 'getServices',
        language : 'getLanguage',
        envAPI : 'getEnvAPI',
        promotions : 'getPromotions',
        trans: 'getTranslations'
    }),
    components: { Experts }
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
}
.contact-btns{
    background-color: $custom_blue;
    color: #FFF;
    padding-bottom: 40px;
}
.v-image__image--cover{
    background-size: 100% auto;
    background-size: contain;
}
.v-carousel__item{
    height: auto !important;
}
.v-carousel{
    height: auto !important;
}
</style>
