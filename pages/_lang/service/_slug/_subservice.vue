<template>
    <main class="wrap services-area">
        <v-container>
            <v-row class="ip-plan-row" v-if="service">
                <v-col class="col-md-12">
                    <h1 class="text-center title-plans" color="#34495e">{{ service.translation.name }}</h1>
                </v-col>
                <v-tabs class="pricing-plans-tabs" centered dark>
                    <v-tab>Pricing plans</v-tab>
                    <v-tab v-if="service.services.length" :to="`/${language.lang}/service/pricing-plans/${service.alias}`">Extended</v-tab>
                </v-tabs>
                <v-col v-for="(plan, planIndex) in service.children" v-if="service.children" :key="planIndex">
                    <v-card flat class="xs12 sm12 md4 mb-3 flex ip-plan-service"
                            :style="`order:${order(plan)}; z-index:${planIndex == 1 ? 3 : 1}`"
                            :class="{'elevation-10': planIndex == 1}">
                        <v-layout row v-if="planIndex == 1" ma-0 pa-0 align-center justify-center
                                  class="accent ip-highligh-plan">
                            <v-icon color="primary" small class="mr-2">mdi-star</v-icon>
                            <v-flex shrink text-xs-center class="primary--text body-2 text-capitalized ">
                                Most popular
                            </v-flex>
                        </v-layout>
                        <v-card-text class="pa-4 lighten-4">
                            <v-flex pa-0><h2 class="headline">{{ plan.translation.name }}</h2></v-flex>
                            <v-flex pa-0 class="ip-plan-price">
                                {{ plan.translation.price_top_begin }}
                                <span>{{ plan.price }}</span>
                                lei
                                {{ plan.translation.price_top_end }}
                            </v-flex>
                            <v-flex pa-0 mt-4>
                                <v-btn v-if="!$auth.loggedIn" :outline="!plan.highlight" depressed large color="primary"
                                       class="ma-0 ip-plan-btn" @click="openDialogLogin()">
                                    Add To Cart
                                </v-btn>
                                <cart-btn v-if="$auth.loggedIn" :user="$auth.user" :service="service"/>
                            </v-flex>
                        </v-card-text>

                        <v-list :class="{'elevation-10': planIndex == 1}">
                            <div v-for="(part, indexPart) in plan.blogs" v-html="part.translation.body"></div>
                        </v-list>
                        <v-card-text class="pa-4 lighten-4">
                            <v-flex pa-0 class="ip-plan-price">
                                {{ plan.translation.price_bottom_begin }}
                                <span>{{ plan.price_bottom }} </span>
                                lei {{ plan.translation.price_bottom_end }}
                            </v-flex>
                        </v-card-text>
                    </v-card>
                </v-col>
            </v-row>
            <v-row class="btns-row">
                <v-col class="text-center">
                    <v-btn class="v-btn-costum" color="accent" @click="$nuxt.$emit('open-appointment-form')">Solicita demo</v-btn>
                    <v-btn class="v-btn-costum" to="#experts-block" color="accent">Dicuta cu consultantul</v-btn>
                </v-col>
            </v-row>
        </v-container>
        <div id="experts-block">
            <experts></experts>
        </div>
        <appointment-form></appointment-form>
    </main>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import contentApi from '@/api/contentApi.js'
import cartBtn from "@/components/front/cart/cartBtn"
import Experts from '@/components/front/widgets/expertsWidget.vue'


export default {
    layout: "default",
    components: {cartBtn, Experts},
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
    data() {
        return {
            title: '',
            description: '',
            dialog: false,
            service: null,
            employeeList: [],
        }
    },
    computed: mapGetters({
        refreshUserData: 'dialog/getRefreshUserData',
        services: 'getServices',
        allServices: 'getAllServices',
        language: 'getLanguage',
        changedEmployee: 'getChangedEmployee',
        user: 'chat/getUser',
    }),
    async mounted() {
        this.service = await this.allServices.find((serv) => serv.alias == this.$route.params.subservice)
        this.getEmployees()
        this.title = this.service.translation.seo_title
        this.description = this.service.translation.seo_description
    },
    watch: {
        refreshUserData() {
            this.getEmployees()
        },
        changedEmployee() {
            this.getEmployees()
        },
    },
    methods: {
        openDialogLogin() {
            $nuxt.$emit('openLoginDialog')
        },
        order(plan) {
            switch (this.$vuetify.breakpoint.name) {
                case 'xs':
                    return plan.orderList
                case 'sm':
                    return plan.orderList
                default:
                    return plan.orderRow
            }
        },
        async getEmployees() {
            await contentApi.getEmployeesByService(this.service.id, response => {
                this.employeeList = response
            })
        }
    },
}
</script>

<style lang="scss">

.services-area {
    .elevation-10 {
        background-color: #1C1F6A;
        color: #FFF !important;
        .ip-plan-price{
            color: #FFF;
        }
        .theme--light.v-list-item:not(.v-list-item--active):not(.v-list-item--disabled) {
            color: #FFF !important;
        }
        .headline {
            color: #FFF;
        }
    }
    .headline {
        font-size: 28px;
        color: #919191;
        letter-spacing: 0;
        text-transform: uppercase;
        font-weight: bold;
        margin-bottom: 10px;
    }
    .theme--light.grey-item:not(.v-list-item--active):not(.v-list-item--disabled){
        color: #95A5A6 !important;
    }
    .v-subheader {
        margin: 20px 0;
        padding: 0 10px;
        background-color: #AAA;
        color: #FFF;
        padding: 0 10px;
        font-size: 18px;
        color: #FFFFFF;
        letter-spacing: 0
    }
    .v-list-item {
        line-height: 1.2 !important;
        background-image: url('/check-mark.png');
        background-repeat: no-repeat;
        background-size: 25px;
        background-position: 0 center;
        padding-left: 35px;
    }
    .grey-item {
        background-image: url('/close-icon.png');
        background-size: 20px;
        filter: grayscale(100%);
    }
}

.experts-wrapp {
    .v-badge {
        position: absolute;
        z-index: 9;
        top: 20px;
        left: 10px;
    }
}

#experts .v-card {
    margin-bottom: 30px;
}

#experts .v-btn {
    margin-bottom: 10px;
}

.v-card__actions {
    flex-wrap: wrap;
    justify-content: space-around;
}

.consultation {
    background-color: rgba(0, 0, 0, 0.3);
    color: #ffff;
    text-align: center;
}

.caption {
    line-height: 1.3;
}

.expert-one-content {
    padding-top: 130px;
}

.list-expert-one {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    border-bottom: 2px solid rgba(0, 0, 0, 0.3) !important;
    padding: 0;
}

.list-expert-one a {
    white-space: nowrap;
}

.list-expert-one--active {
    color: $custom_blue;
    font-weight: 700;
}

.buttons-expert {
    position: fixed;
    top: 56px;
    left: 0;
    right: 0;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 15px;
}

.buttons-expert .v-btn {
    padding: 5px !important;
}

@media (min-width: 991px) {
    .expert-one-content {
        padding-top: 150px;
    }
    .list-expert-one {
        display: block;
        overflow: auto;
        border-bottom: 0;
    }
    .list-expert-one a {
        white-space: normal;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .buttons-expert {
        position: static;
        display: block;

        .v-btn {
            margin-bottom: 10px;
        }
    }
    .butons-service {
        display: none;
    }
}
@media (max-width: 991px) {
    .side-block-wrap {
        display: none;
    }
    .expert-one-content {
        padding-top: 62px;
    }
    .v-application .display-1 {
        font-size: 2rem !important;
    }
    .butons-service {
        display: block;
        max-width: 99%;
        background-color: #FFF;
        padding: 20px;
        box-shadow: 0 3px 4px rgb(0 0 0 / 20%)
    }
    .costum-btn-service {
        color: $custom_blue !important;
        border: 1px solid $custom_blue;
        box-shadow: none;
        background-color: #FFF !important;
    }
    .expert-one-experts {
        width: 100% !important;
    }
}
.expert-one-experts {
    max-height: 85vh;
    overflow: scroll;
    width: 300px;
}
.v-application ul {
    padding-left: 20px !important;
}
.medium-width {
    min-width: 90% !important;
}
.operator-title {
    line-height: 1;
    margin-top: -10px;
}
.operator-position {
    line-height: 1;
    margin-top: -10px;
}
.operator-btns {
    line-height: 1;
    margin-top: -18px;
}
.add-to-cart-btn {
    margin-left: 15px;
}
.ip-plan-service {
    margin-top: 40px;
    max-width: 100% !important;
}
.ip-plan-row .ip-plan-service:nth-child(2) {
    border-right: 0;
    border-left: 0;
}
.ip-plan-price {
    display: block;
    font-size: 15px;
    font-weight: 400;
    line-height: 1;
    margin-bottom: 5px;
    margin-top: 20px;
    color: #1C1F6A;
    span {
        font-size: 35px;
        font-weight: bold;
    }
}
.ip-plan-btn {
    color: $custom_green !important;
}
.cursor-help {
    cursor: help;
}
.ip-highligh-plan {
    height: 40px;
    position: absolute;
    width: calc(100% + 2px);
    left: -1px;
    top: -40px;
}
.wrap {
    padding-top: 120px;
    background-color: $custom_blue;
}
.title-plans {
    color: #FFF;
}
.v-btn-costum {
    color: $custom_blue !important;
}
.btns-row {
    padding: 30px;
}
.pricing-plans-tabs {
    text-align: center !important;
    background-color: transparent;
}
.theme--dark.v-tabs > .v-tabs-bar {
    background-color: transparent
}

</style>
