<template>
    <main class="wrap">
        <v-container v-if="service" class="pricing-plans">
            <v-row class="ip-plan-row">

                <v-col class="col-md-12">
                    <h1 class="text-center title-plans" color="#34495e">{{ service.translation.name }}</h1>
                </v-col>

                <v-tabs class="pricing-plans-tabs" centered dark>
                    <v-tab @click="$router.back()">{{ trans.ServicePages.pricingPlans }}</v-tab>
                    <v-tab :to="`/${language.lang}/service/pricing-plans/${service.alias}`">{{ trans.ServicePages.pricingPlansExtended }}</v-tab>
                </v-tabs>

                <v-simple-table>
                    <template v-slot:default>
                        <thead>
                            <tr>
                                <th class="th-title big-col">
                                    Features:
                                </th>
                                <th v-for="(child, index) in service.children" :key="index">
                                    <p class="package-title">{{ child.translation.name }}</p>
                                    <p class="package-price">
                                        {{ child.translation.price_top_begin }}
                                        <span>{{ child.price }}</span>
                                        lei {{ child.translation.price_top_end }}
                                    </p>
                                    <p class="package-price">
                                        {{ child.translation.price_bottom_begin }}
                                        <span>{{ child.price_bottom }} </span>
                                        lei {{ child.translation.price_bottom_end }}
                                    </p>

                                </th>
                            </tr>
                        </thead>
                    </template>
                </v-simple-table>

                <v-expansion-panels v-model="panel" :readonly="readonly" multiple>
                    <v-expansion-panel v-for="(anchor, index) in service.services" :key="index">
                        <!-- <v-expansion-panel-content> -->

                        <v-expansion-panel-header>
                            <template v-slot:actions>
                                <v-icon color="primary">
                                    $expand
                                </v-icon>
                            </template>
                            {{ anchor.translation.title }}
                        </v-expansion-panel-header>

                        <v-expansion-panel-content>
                            <v-simple-table>
                                <template v-slot:default>
                                    <tbody>
                                        <tr v-for="(child, index) in anchor.children" :key="index">
                                            <td class="big-col">{{ child.translation.title }}</td>
                                            <td>
                                                <span v-if="child.translation.package_1 === 'Yes'"><v-icon color="info">mdi-check</v-icon></span>
                                                <span v-if="child.translation.package_1 === 'No'"><v-icon>mdi-close</v-icon></span>
                                                <span v-if="child.translation.package_1 === 'AddPrice'"><img src="/check-dollar-icon.svg"> </span>
                                                <span v-if="child.translation.package_1 !== 'AddPrice' && child.translation.package_1 !== 'No' && child.translation.package_1 !== 'Yes'">
                                                    {{ child.translation.package_1 }}
                                                </span>
                                            </td>
                                            <td>
                                                <span v-if="child.translation.package_2 === 'Yes'"><v-icon color="info">mdi-check</v-icon></span>
                                                <span v-if="child.translation.package_2 === 'No'"><v-icon>mdi-close</v-icon></span>
                                                <span v-if="child.translation.package_2 === 'AddPrice'"><img src="/check-dollar-icon.svg"> </span>
                                                <span v-if="child.translation.package_2 !== 'AddPrice' && child.translation.package_2 !== 'No' && child.translation.package_2 !== 'Yes'">
                                                    {{ child.translation.package_2 }}
                                                </span>
                                            </td>
                                            <td>
                                                <span v-if="child.translation.package_3 === 'Yes'"><v-icon color="info">mdi-check</v-icon></span>
                                                <span v-if="child.translation.package_3 === 'No'"><v-icon>mdi-close</v-icon></span>
                                                <span v-if="child.translation.package_3 === 'AddPrice'"><img src="/check-dollar-icon.svg"> </span>
                                                <span v-if="child.translation.package_3 !== 'AddPrice' && child.translation.package_3 !== 'No' && child.translation.package_3 !== 'Yes'">
                                                    {{ child.translation.package_3 }}
                                                </span>
                                            </td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table>
                        </v-expansion-panel-content>

                    </v-expansion-panel>
                </v-expansion-panels>
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
            readonly: false,
            panel: [0],
            service: null,
            prevUrl: null,
            title: '',
            description: '',
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
        trans: 'getTranslations',
    }),
    async mounted() {
        this.service = await this.allServices.find((serv) => serv.alias == this.$route.params.subservice)
        this.title = this.service.translation.seo_title
        this.description = this.service.translation.seo_description
        this.setChatBotmessage(this.trans.General.botMessageTemplate1 + " " + this.service.translation.bot_message + '? '+ this.trans.General.botMessageTemplate2)
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
            setChatBotmessage: 'chat/setChatBotmessage'
        }),
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
    margin-bottom: 20px;
}
.theme--dark.v-tabs > .v-tabs-bar{
    background-color: transparent
}
.pricing-plans {
    .v-data-table {
        margin-top: 0 !important;
    }
    .v-expansion-panel-header {
        font-size: 20px;
        font-weight: bold;
        padding-left: 35px;
    }
    table{
        th {
            width: 20% !important;
            text-align: center !important;
            .package-title {
                font-size: 20px;
                text-transform: uppercase;
                border-bottom: 1px solid $custom_blue;
                padding-top: 20px;
            }
            .package-price {
                text-align: center;
                span {
                    color: $custom_blue;
                    display: block;
                    font-size: 20px;
                }
            }
        }
        td {
            width: 20% !important;
            text-align: center;
        }
        .big-col{
            width: 35% !important;
            text-align: left !important;
        }
    }
    .v-expansion-panel{
        margin-top: 10px;
    }
}

@media (max-width: 991px) {
    .pricing-plans {
        table {
            td, th {
                max-width: 70px;
                padding: 5px !important;
                overflow: hidden;
                span {
                    font-size: 12px;
                    font-weight: bold;
                    line-height: 1;
                }
            }
        }
        .big-col {
            font-size: 13px !important;
        }
        .v-expansion-panel {
            margin-top: 3px;
        }
        .v-expansion-panel-content__wrap {
            padding: 0;
        }
        .th-title {
            text-align: center !important;
        }
    }
    .pricing-plans table th .package-title{
        font-size: 14px !important;
    }
    .pricing-plans table th .package-price span {
        font-size: 16px !important;
    }
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
</style>


',
            phone: '',
            password: '',
            confirmPassword: '',
            role: 'employee'
        },
        rules: {
            loginRules: [
                v => !!v || 'Login is required',
                v => (v && v.length <= 10) || 'Login must be less than 10 characters',
            ],
            nameRules: [
                v => !!v || 'Name is required',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
            ],
            confirmPasswordRules: [
                (value) => !!value || 'Type confirm password',
                (value) =>
                value === this.formData.password || 'The password confirmation does not match.',
            ],
            agreementRules: [
                (value) => !!value || 'At least one item should be selected',
            ]
        }
    }},
    mounted() {
        this.formData.role = this.$route.query.type
    },
    computed: mapGetters({
        employees: 'admin/getEmployees'
    }),
    methods: {
        ...mapActions({
            createEmployee: 'admin/createEmployee'
        }),
        submit(){
            this.formData.role = 'manager'
            if (this.$refs.form.validate()) {
                this.createEmployee(this.formData).then(response => {
                    const lastEmployee = this.employees[0]
                    this.$socket.emit('refreshUsersData')
                    this.$router.push(`/crm/employees`)
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.display-1 {
   color: $custom_blue !important;
   font-weight: 700 !important;
}

.about-content {
   p {
       color: $custom_red !important
   }
   .banner {
       height: 70vh;
       position: relative;
       &__content {
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           z-index: 3;
           display: flex;
           justify-content: flex-start;
           flex-direction: column;
           padding: 0 30px;
           padding-top: 50px;
       }
       .v-card__title {
           text-align: left;
       }
       .v-card__text {
           text-align: left !important;
       }
       .v-btn {
           margin-left: 16px;
           max-width: 150px;
       }
       .v-image {
           width: 100%;
           height: 100%;
           object-fit: cover;
           object-position: center;
           position: absolute;
           z-index: 1;
           top: 0;
           left: 0;
       }
       &:after {
           content: "";
           position: absolute;
           left: 0;
           right: 0;
           width: 100%;
           height: 100%;
           background-color: rgba($color: $custom_blue, $alpha: 0.7);
           z-index: 2;
       }
   }
   .avatar-relative {
       position: relative;
       top: -80px;
       z-index: 4;
       max-width: 400px;
       min-width: 350px;
       margin-left: auto;
       margin-right: auto;
   }
}

.avatar-image {
   padding-top: 80px;
   .heading {
       font-size: 25px;
       color: $custom_blue;
       font-weight: bold;
   }
   .description button {
       text-decoration: underline;
   }
   .infoCust {
       .description {
           margin-top: 10px;
       }
       button {
           font-weight: normal;
           color: inherit;
       }
   }
}

.avatar-image .v-image {
   position: absolute;
   width: 160px;
   height: 160px;
   top: -79px;
   left: calc(50% - 80px);
   border-radius: 50% !important;
}

.avatar-image .edit {
   position: absolute;
   top: 30px;
   left: 200px
}

@media (min-width: 991px) {
   .grid-desk {
       display: flex;
   }
   .profile-edit {
       order: 1;
       margin-right: 20px;
       position: relative;
       z-index: 2;
   }
   .avatar-relative {
       order: 2;
   }
}
</style>
