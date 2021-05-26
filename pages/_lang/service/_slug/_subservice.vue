<template>
    <main class="wrap">
        <v-container>
            <v-row class="ip-plan-row" v-if="service">
                <v-col class="col-md-12">
                    <h1 class="text-center title-plans" color="#34495e">{{ service.translation.name }}</h1>
                </v-col>
                <v-col v-for="(plan, planIndex) in service.children" v-if="service.children" :key="planIndex">
                    <v-card flat class="xs12 sm12 md4 mb-3 flex ip-plan"
                            :style="`order:${order(plan)}; z-index:${planIndex == 1 ? 3 : 1}`"
                            :class="{'elevation-10': planIndex == 1}">
                        <v-layout row v-if="planIndex == 1" ma-0 pa-0 align-center justify-center
                                  class="primary ip-highligh-plan">
                            <v-icon color="white" small class="mr-2">mdi-star</v-icon>
                            <v-flex shrink text-xs-center class="white--text body-2 text-capitalized ">
                                Most popular
                            </v-flex>
                        </v-layout>
                        <v-card-text class="pa-4 grey lighten-4">
                            <v-flex pa-0><h2 class="headline">{{ plan.translation.name }}</h2></v-flex>
                            <v-flex pa-0 style="min-height:66px">Short description {{ plan.translation.name }}</v-flex>
                            <v-flex pa-0 class="ip-plan-price info--text">
                                <v-icon>mdi-currency-eur</v-icon>
                                {{ plan.price }}
                            </v-flex>
                            <v-flex pa-0 class="grey--text">EUR/month</v-flex>
                            <v-flex pa-0 mt-4>
                                <v-btn :outline="!plan.highlight" depressed large color="primary"
                                       class="ma-0 white--text">
                                    Get Started
                                </v-btn>
                            </v-flex>
                        </v-card-text>

                        <v-list class="pa-3 mb-3">
                            <template>
                                <v-subheader>Standard</v-subheader>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <v-icon class="mr-2" color="yellow darken-3">mdi-check</v-icon>
                                            Periodic upgrading of the site platform
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <v-icon class="mr-2" color="yellow darken-3">mdi-check</v-icon>
                                            Monitoring site performance
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <v-icon class="mr-2" color="yellow darken-3">mdi-check</v-icon>
                                            Restoring the site in the event of a fall
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-subheader>Advanced</v-subheader>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <v-icon class="mr-2" color="yellow darken-3">mdi-check</v-icon>
                                            Content update in news / blog: 1
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <v-icon class="mr-2" color="yellow darken-3">mdi-check</v-icon>
                                            Products upload: 10
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                                <v-list-item>
                                    <v-list-item-content>
                                        <v-list-item-title class="disabled">
                                            <v-icon class="mr-2">mdi-close</v-icon>
                                            Creating new pages: 5
                                        </v-list-item-title>
                                    </v-list-item-content>
                                </v-list-item>
                            </template>
                        </v-list>
                        <cart-btn v-if="$auth.loggedIn" :user="$auth.user" :service="service"/>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </main>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import contentApi from '@/api/contentApi.js'
import cartBtn from "@/components/front/cart/cartBtn"

export default {
    layout: "default",
    components: {cartBtn},
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
            mobileExpertsDisplay: false,
        }
    },
    computed: mapGetters({
        refreshUserData: 'dialog/getRefreshUserData',
        services: 'getServices',
        allServices: 'getAllServices',
        language: 'getLanguage',
        changedEmployee: 'getChangedEmployee',
        reject: 'call/getReject',
        response: 'call/getResponse',
        roomId: 'call/getRoomId',
        user: 'chat/getUser',
        trans: 'getTranslations'
    }),
    async mounted() {
        this.service = await this.allServices.find((serv) => serv.alias == this.$route.params.subservice)
        this.getEmployees()
        window.addEventListener('scroll', this.handleScroll);
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
        ...mapActions({
            setDefaultChangedEmployee: 'setDefaultChangedEmployee',
            setDefaultReject: 'call/setDefaultReject',
            setDefaultResponse: 'call/setDefaultResponse',
            setClientAsUser: 'chat/setClientAsUser',
            setUser: 'chat/setUser',
            setInterlocutor: 'dialog/setInterlocutor',
            initCall: 'dialog/initCall',
        }),
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
        openVideoCall(user) {
            this.initCall(user)
        },
        openDialog(user) {
            this.setInterlocutor(null)
            this.setInterlocutor(user)
        },
        handleScroll() {
            const sidebar = document.getElementById('sidebar')
            const experts = document.getElementById('experts')
            const serviceBtn = document.getElementById('serviceBtn')

            if (sidebar) {
                if (!this.$mobileDetect.mobile()) {
                    if (window.scrollY > 85) {
                        sidebar.classList.add("fixed")
                        experts.classList.add("fixed")
                    } else {
                        sidebar.classList.remove("fixed")
                        experts.classList.remove("fixed")
                    }
                }

                if (window.scrollY > 35) {
                    serviceBtn.classList.add("fixed-btn")
                } else {
                    serviceBtn.classList.remove("fixed-btn")
                }
            }
        },
        scrollTo(id) {
            const element = document.getElementById('section' + id)
            const offsetTop = element.offsetTop - 150
            window.scrollTo(0, offsetTop)
        },
        scrollExpertsBlock() {
            const element = document.getElementById('experts')
            const offsetTop = element.offsetTop - 175
            window.scrollTo(0, offsetTop)
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
.title-plans {
    //color: #;
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

.section-block {
    margin-bottom: 20px;
}

.section-block:last-child {
    margin-bottom: 0;
}

.side-block {
    border-left: 3px solid $custom_blue;
    min-width: 200px;
}

.fixed-btn {
    position: fixed;
    width: 100%;
    margin-top: -6px;
    z-index: 4;
    left: .5%;
}

.fixed {
    position: fixed;
    margin-top: -80px;
    background-color: #FFF;
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


.ip-plan {
    border: solid 1px #e0e0e0;
    margin-top: 40px;
}

.ip-plan-row .ip-plan {
    max-width: 400px !important;
    border: solid 1px #e0e0e0;
}

.ip-plan-row .ip-plan:nth-child(2) {
    border-right: 0;
    border-left: 0;
}

.ip-plan-price {
    display: block;
    font-size: 38px;
    font-weight: 400;
    line-height: 1;
    margin-bottom: 5px;
    margin-top: 20px;
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
    margin-top: 130px;
}

.title-plans {
    color: #34495e;
}

.disabled{
    color: rgba(0, 0, 0, 0.54);
}
</style>
