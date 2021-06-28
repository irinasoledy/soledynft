<template>
    <main class="wrap">
        <v-container>
            <v-row class="ip-plan-row">
                <v-col class="col-md-12">
                    <h1 class="text-center title-plans" color="#34495e">Pricing plans</h1>
                </v-col>
                <v-tabs class="pricing-plans-tabs" centered dark>
                    <v-tab @click="$router.back()">Pricing plans</v-tab>
                    <v-tab :to="`/${language.lang}/pricing-plans`">Extended</v-tab>
                </v-tabs>
                <v-simple-table>
                <template v-slot:default>
                    <thead>
                        <tr>
                            <th class="th-title">
                                Features:
                            </th>
                            <th class="text-center">
                                Bussines
                            </th>
                            <th class="text-center">
                                Enterprise
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="feature-title">Video Chat</td>
                            <td class="text-center">Nu</td>
                            <td class="text-center">Da</td>
                        </tr>
                        <tr>
                            <td class="feature-title">Web Chat</td>
                            <td class="text-center">Da</td>
                            <td class="text-center">Da</td>
                        </tr>
                        <tr>
                            <td class="feature-title">Cobrowsing</td>
                            <td class="text-center">Nu</td>
                            <td class="text-center">Da</td>
                        </tr>
                        <tr>
                            <td class="feature-title">Screensharing</td>
                            <td class="text-center">---</td>
                            <td class="text-center">Basic configuration</td>
                        </tr>
                        <tr>
                            <td class="feature-title">Web Call Backs</td>
                            <td class="text-center">Nu</td>
                            <td class="text-center">Da</td>
                        </tr>
                        <tr>
                            <td class="feature-title">WhatsApp</td>
                            <td class="text-center">Da</td>
                            <td class="text-center">Da</td>
                        </tr>
                        <tr>
                            <td class="feature-title">Virtual Agent</td>
                            <td class="text-center">12 months</td>
                            <td class="text-center">24 months</td>
                        </tr>
                    </tbody>
                    <thead>
                        <tr>
                            <th class="th-title">
                                Integrations:
                            </th>
                            <th class="text-center"></th>
                            <th class="text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="feature-title">Google Analytics</td>
                            <td class="text-center">Nu</td>
                            <td class="text-center">Da</td>
                        </tr>
                        <tr>
                            <td class="feature-title">Salesforce Integration</td>
                            <td class="text-center">Da</td>
                            <td class="text-center">Da</td>
                        </tr>
                        <tr>
                            <td class="feature-title">Other CRM Integration</td>
                            <td class="text-center">Nu</td>
                            <td class="text-center">Da</td>
                        </tr>
                        <tr>
                            <td class="feature-title">Contact Centre Integration</td>
                            <td class="text-center">Da</td>
                            <td class="text-center">Da</td>
                        </tr>
                        <tr>
                            <td class="feature-title">Native App Integration</td>
                            <td class="text-center">Nu</td>
                            <td class="text-center">Da</td>
                        </tr>
                        <tr>
                            <td class="feature-title">Salesforce Integration</td>
                            <td class="text-center">Da</td>
                            <td class="text-center">Da</td>
                        </tr>
                    </tbody>
                    </template>
                </v-simple-table>
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
            prevUrl: null,
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
        // this.title = this.service.translation.seo_title
        // this.description = this.service.translation.seo_description
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
        async getEmployees() {
            await contentApi.getEmployeesByService(this.service.id, response => {
                this.employeeList = response
            })
        }
    },
}
</script>

<style lang="scss">

.v-data-table {
    width: 100%;
    margin-top: 30px;
}

.feature-title {
    font-size: 15px !important;
    color: $custom_blue;
}

th{
    border-top: thin solid rgba(0, 0, 0, 0.12) !important;

}
.th-title {
    font-size: 22px !important;
    color: $custom_blue !important;
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
    padding-top: 120px;
    background-color: $custom_blue;
}

.title-plans {
    color: #FFF;
}

.disabled{
    color: rgba(0, 0, 0, 0.54);
}
.v-btn-costum{
    color: $custom_blue !important;
}
.btns-row{
    padding: 30px;
}
.pricing-plans-tabs{
    text-align: center !important;
    background-color: transparent;
}
.theme--dark.v-tabs > .v-tabs-bar{
    background-color: transparent
}
</style>
