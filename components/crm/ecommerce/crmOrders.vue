<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <h5 class="mb-0">
                <v-badge
                    v-if="orders.length"
                    color="green"
                    :content="orders.length"
                >
                    <v-icon>mdi-view-headline</v-icon>
                </v-badge>
                <v-badge
                    v-else
                    color="green"
                    content="0"
                >
                    <v-icon>mdi-view-headline</v-icon>
                </v-badge>
                Orders:
            </h5>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
            <v-simple-table>
                <template template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">ID</th>
                        <th class="text-left">Status</th>
                        <th class="text-center">Payment</th>
                        <th class="text-left">Amount</th>
                        <th class="text-left">Date</th>
                        <th class="text-left">Details</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(order, index) in orders" :key="index">
                        <td><small>{{ order._id }}</small></td>
                        <td class="text-center">
                            <v-select
                                class="table-select"
                                :items="statuses"
                                :label="order.status"
                                v-model="orderStatuses[order._id]=order.status"
                                dense
                                solo
                                @change="changeOrderStatus(order._id)"
                            ></v-select>
                        </td>
                        <td class="text-center">
                            <v-select
                                class="table-select"
                                :items="payments"
                                :label="order.paymentMethod"
                                v-model="orderPayments[order._id]=order.paymentMethod"
                                dense
                                solo
                                @change="changeOrderPayment(order._id)"
                            ></v-select>
                        </td>
                        <td><small>{{ order.amount }}<v-icon>mdi-currency-eur</v-icon></small></td>
                        <td><small>{{ $parseDate(order.date) }}</small></td>
                        <td>
                            <v-icon @click="showOrder(order)">mdi-eye</v-icon>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>

            <v-dialog v-model="servicesDialog" scrollable max-width="700px">
                <v-card class="mx-auto" tile>
                    <v-row v-if="orderServices">
                        <v-col>
                            <v-card-title>Order Details:</v-card-title>
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title>Name:</v-list-item-title>
                                    <v-list-item-subtitle>{{ order.userDetails.name }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title>Email:</v-list-item-title>
                                    <v-list-item-subtitle>{{ order.userDetails.email }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title>Phone:</v-list-item-title>
                                    <v-list-item-subtitle>{{ order.userDetails.phone }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title>Country:</v-list-item-title>
                                    <v-list-item-subtitle>{{ order.userDetails.country }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title>City:</v-list-item-title>
                                    <v-list-item-subtitle>{{ order.userDetails.city }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title>Address:</v-list-item-title>
                                    <v-list-item-subtitle>{{ order.userDetails.address }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                            <v-list-item two-line>
                                <v-list-item-content>
                                    <v-list-item-title>Postal Code:</v-list-item-title>
                                    <v-list-item-subtitle>{{ order.userDetails.postalCode }}</v-list-item-subtitle>
                                </v-list-item-content>
                            </v-list-item>
                        </v-col>
                        <v-col v-if="order">
                            <v-card-title>Order Products:</v-card-title>
                            <v-simple-table class="full-width">
                                <template v-slot:default>
                                    <thead>
                                    <tr>
                                        <th class="text-center">ID</th>
                                        <th class="text-center">Product</th>
                                        <th class="text-center">Qty</th>
                                        <th class="text-center">Unit Price</th>
                                        <th class="text-center">Price</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                        <tr v-for="(cartsProduct, index) in order.cart.products" :key="cartsProduct.id">
                                            <td>{{ index + 1 }}</td>
                                            <td class="str-col" v-if="cartsProduct.product.translation">
                                                <nuxt-link :to="`/ro/categories/${cartsProduct.product.category.alias}/${cartsProduct.product.alias}`">
                                                    {{ cartsProduct.product.translation.name }}
                                                </nuxt-link>
                                            </td>
                                            <td class="text-center qty-area str-col">
                                                <span>{{ cartsProduct.qty }}</span>
                                            </td>
                                            <td class="str-col">{{ cartsProduct.product.main_price.price }} EUR</td>
                                            <td class="str-col">{{ cartsProduct.product.main_price.price * cartsProduct.qty }} EUR</td>
                                        </tr>

                                        <tr v-for="(cartsSubproduct, index) in order.cart.subproducts" :key="cartsSubproduct.id">
                                            <td>{{ cartsProducts.length + index + 1 }}</td>
                                            <td class="str-col" v-if="cartsSubproduct.subproduct.product.translation">
                                                <nuxt-link :to="`/ro/categories/${cartsSubproduct.subproduct.product.category.alias}/${cartsSubproduct.subproduct.product.alias}`">
                                                    {{ cartsSubproduct.subproduct.product.translation.name }}
                                                    <p><small><b>Size: {{ cartsSubproduct.subproduct.parameter_value.translation.name }}</b></small> </p>
                                                </nuxt-link>
                                            </td>
                                            <td class="text-center qty-area str-col">
                                                <span>{{ cartsSubproduct.qty }}</span>
                                            </td>
                                            <td class="str-col">{{ cartsSubproduct.subproduct.product.main_price.price }} EUR</td>
                                            <td class="str-col">{{ cartsSubproduct.subproduct.product.main_price.price * cartsSubproduct.qty }} EUR</td>
                                        </tr>
                                    </tbody>
                                </template>
                            </v-simple-table> <br> <br>
                            <h3 class="text-right">Amount: {{ order.amount }} EUR</h3>
                            <v-list-item>
                                <v-list-content>
                                    <v-text-field
                                        v-model="appointmentDate=order.appointmentDate"
                                        label="Appointment Date"
                                        hide-details="auto"
                                    ></v-text-field>

                                </v-list-content>
                                <v-icon @click="saveAppointmentDate(order)">mdi-content-save</v-icon>
                            </v-list-item>
                        </v-col>
                    <v-col></v-col>
                    </v-row>
                    <v-card-actions class="justify-end">
                        <v-btn text @click="servicesDialog = false">
                            Close
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-dialog>
        </v-expansion-panel-content>
    </v-expansion-panel>
</template>

<script>
import cartApi from "@/api/cartApi";
import {mapGetters} from "vuex";

export default {
    props: ['user'],
    data: () => ({
        appointmentDate: '',
        date: new Date().toISOString().substr(0, 10),
        servicesDialog: false,
        orders: [],
        orderStatuses: [],
        statuses: ['Scheduled', 'Payed', 'Performed', 'Shipped', 'Cancelled', 'Expired'],
        orderPayments: [],
        payments: ['card', 'cod', 'paypal'],
        chooseOrder: null,
        orderServices: null,
        order: {}
    }),
    mounted() {
        cartApi.getOrders({userId: this.user._id}, response => this.orders = response)
        this.$nuxt.$on('refresh-crm-order', () => {
            cartApi.getOrders({userId: this.user._id}, response => this.orders = response)
        })
    },
    computed: mapGetters({
        allServices: 'getAllServices'
    }),
    methods: {
        saveAppointmentDate(order) {
            cartApi.changeOrderAppointmentDate({order})
        },
        showOrder(order) {
            this.servicesDialog = true
            this.getOrderServices(order)
        },
        changeOrderStatus(orderId) {
            cartApi.changeOrderStatus(
                {
                    orderId: orderId,
                    status: this.orderStatuses[orderId].status,
                    userId: this.user._id
                },
                response => this.orders = response
            )
        },
        changeOrderPayment(orderId) {
            cartApi.changeOrderPayment(
                {
                    orderId: orderId,
                    payment: this.orderPayments[orderId].paymentMethod,
                    userId: this.user._id
                },
                response => this.orders = response
            )
        },
        getOrderServices(order) {
            this.order = order
            this.orderServices = order.services.map(item => {
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
.table-select {
    font-size: 12px !important;
    margin-top: 20px !important;
}

.table-select .v-input__control {
    min-height: 28px !important;
}
.cart-image img {
    max-width: 50px;
}
</style>
