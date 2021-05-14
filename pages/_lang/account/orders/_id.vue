<template>
    <main>
        <div class="container account-area">
            <div class="row">
                <div class="col-md-3 pad">
                    <sidebar></sidebar>
                </div>
                <div class="col-md-9 account-area" v-if="order">
                    <div class="row cabinet-content">
                        <div class="col-md-10 col-12 display-1 text-center">
                            Order Details
                        </div>
                    </div><br>
                    <div class="row">
                        <div class="col-md-5">
                            <v-card class="mx-auto" tile>
                                <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title>Order ID:</v-list-item-title>
                                        <v-list-item-subtitle>{{ order._id }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title>Status:</v-list-item-title>
                                        <v-list-item-subtitle>{{ order.status }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title>Date:</v-list-item-title>
                                        <v-list-item-subtitle>{{ $parseDate(order.date) }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title>Payment :</v-list-item-title>
                                        <v-list-item-subtitle>{{ order.paymentMethod }}</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>

                                <v-list-item two-line>
                                    <v-list-item-content>
                                        <v-list-item-title>Amount:</v-list-item-title>
                                        <v-list-item-subtitle>{{ order.amount }} EUR</v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card>
                        </div>

                        <div class="col-md-7">
                            <v-card class="mx-auto" tile v-if="orderServices.length">
                                <v-list-item two-line v-for="(service, index) in orderServices" :key="index">
                                    <v-list-item-content>
                                        <v-list-item-title>
                                            <strong>#{{ index + 1 }}</strong>
                                            {{ service.service.translation.name }}
                                        </v-list-item-title>
                                        <v-list-item-subtitle>
                                            <strong>Qty:</strong> {{ service.qty }} |
                                            <strong>Price:</strong> {{ service.service.price }} EUR
                                        </v-list-item-subtitle>
                                    </v-list-item-content>
                                </v-list-item>
                            </v-card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>

import {mapGetters, mapActions} from "vuex";
import sidebar from '@/components/front/partials/nav-cabinet'
import cartApi from '@/api/cartApi'

export default {
    components: {sidebar},
    data: () => ({
        orderId: '',
        order: null,
        orderServices: null
    }),
    computed: mapGetters({
        allServices: 'getAllServices'
    }),
    mounted() {
        this.orderId = this.$route.params.id
        this.getOrder()
    },
    methods: {
        getOrder() {
            cartApi.getOrder(this.orderId, response => {
                this.order = response
                this.getOrderServices()
            })
        },
        getOrderServices() {
            this.orderServices = this.order.services.map(item => {
                const arr = {
                    id: item._id,
                    qty: item.qty,
                    service: '',
                }
                arr.service = this.allServices.find(service => service.id == item.serviceId)
                return arr
            })
        }
    }
}
</script>

<style>
.account-area {
    margin-top: 80px;
    margin-bottom: 50px;
}
</style>