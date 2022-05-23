<template>
    <v-expansion-panel>
        <v-expansion-panel-header>
            <h5 class="mb-0">
                <v-badge v-if="cart.length" color="green" :content="cart.length">
                    <v-icon>mdi-cart</v-icon>
                </v-badge>
                <v-badge v-else color="green" content="0">
                    <v-icon>mdi-cart</v-icon>
                </v-badge>
                Cart:
            </h5>
        </v-expansion-panel-header>

        <v-expansion-panel-content>
            <hr>
            <div class="text-right">
                <v-btn small color="primary" @click="dialog = !dialog">
                    <v-icon>mdi-plus</v-icon>
                    Add new
                </v-btn>
            </div>
            <v-simple-table>
                <template v-slot:default>
                    <thead>
                    <tr>
                        <th class="text-left">ID</th>
                        <th class="text-left">Service</th>
                        <th class="text-center">Qty</th>
                        <th class="text-left">Unit Price</th>
                        <th class="text-left">Price</th>
                        <th class="text-left">Delete</th>
                    </tr>
                    </thead>
                    <tbody>
                    <tr v-for="(cartItem, index) in cart" :key="index">
                        <td><small>{{ index + 1 }}</small></td>
                        <td>
                            <small>
                                {{ cartItem.service.translation.name }}
                            </small>
                        </td>
                        <td class="text-center qty-col">
                            <v-icon class="qty-control" @click="changeQty(cartItem, 'minus')">mdi-minus</v-icon>
                            <span>{{ cartItem.qty }}</span>
                            <v-icon class="qty-control" @click="changeQty(cartItem, 'plus')">mdi-plus</v-icon>
                        </td>
                        <td class="text-right">
                            <small>{{ cartItem.service.price }}
                                <v-icon>mdi-currency-eur</v-icon>
                            </small>
                        </td>
                        <td class="text-right">
                            <small>{{ cartItem.service.price * cartItem.qty }}
                                <v-icon>mdi-currency-eur</v-icon>
                            </small>
                        </td>
                        <td>
                            <v-icon class="pointer" @click="deleteCartItem(cartItem)">
                                mdi-delete
                            </v-icon>
                        </td>
                    </tr>
                    </tbody>
                </template>
            </v-simple-table>
            <hr>
            <p class="text-center amount-sum">Total: {{ amount }}
                <v-icon>mdi-currency-eur</v-icon>
            </p>
        </v-expansion-panel-content>

        <v-dialog v-model="dialog" scrollable max-width="700px">
            <v-card>
                <div v-if="addedAlert">
                    <v-alert type="success">
                        <small>"{{ addedAlert }}" was successfully added!</small>
                    </v-alert>
                </div>
                <v-card-title>
                    <v-text-field
                        v-model="search"
                        append-icon="mdi-magnify"
                        label="Search"
                        single-line
                        hide-details
                    ></v-text-field>
                </v-card-title>
                <v-data-table
                    :headers="headers"
                    :items="services"
                    :search="search"
                >
                    <template v-slot:[`item`]="{ item, index }">
                        <tr>
                            <td><small>{{ index + 1 }}</small></td>
                            <td><small>{{ item.translation.name }}</small></td>
                            <td class="text-right">
                                <small>
                                    {{ item.price }}
                                    <v-icon>mdi-currency-eur</v-icon>
                                </small>
                            </td>
                            <td>
                                <v-icon @click="addToCard(item)">mdi-plus</v-icon>
                            </td>
                        </tr>
                    </template>
                </v-data-table>
            </v-card>
        </v-dialog>
    </v-expansion-panel>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import cartApi from '@/api/cartApi'

export default {
    props: ['user'],
    data: () => ({
        addedAlert: false,
        search: '',
        cart: {},
        amount: 0,
        dialog: false,
        headers: [
            {text: 'ID', align: 'start', value: 'id'},
            {text: 'Service', value: 'translation.name'},
            {text: 'Price', value: 'price'},
            {text: 'Add', value: 'add'},
        ],
        services: [],
    }),
    computed: mapGetters({
        allServices: 'getAllServices',
    }),
    watch: {
        dialog() {
            this.addedAlert = false
        }
    },
    mounted() {
        this.getUserCart()
        this.parseServices()

        this.$nuxt.$on('refresh-crm-cart', () => {
            this.getUserCart()
            this.parseServices()
        })
    },
    methods: {
        ...mapActions({
            removeCart: 'cart/removeCart',
            updateQty: 'cart/updateQty',
        }),
        async addToCard(item) {
            this.addedAlert = false
            const data = {serviceId: item.id, userId: this.user._id}
            await cartApi.appendToCart(data, response => {
                this.parseCart(response)
                this.addedAlert = item.translation.name
            })
        },
        getUserCart() {
            cartApi.getCart(this.user._id, response => {
                this.parseCart(response)
            })
        },
        parseServices() {
            this.services = this.allServices.filter(service => service.parent_id > 0)
        },
        parseCart(carts) {
            this.cart = carts.map(item => {
                const arr = {
                    id: item._id,
                    qty: item.qty,
                    service: '',
                }
                arr.service = this.services.find(service => service.id == item.serviceId)
                return arr
            })

            this.countAmount()
            this.$socket.emit('refreshCart', this.user._id)
        },
        countAmount() {
            this.amount = 0
            for (let i = 0; i < this.cart.length; i++) {
                this.amount += parseFloat(this.cart[i].service.price) * this.cart[i].qty
            }
            this.amount.toFixed(2)
        },
        async deleteCartItem(cartItem) {
            const data = {cartId: cartItem.id, userId: this.user._id}
            await cartApi.removeCart(data, response => {
                this.parseCart(response)
            })
        },
        async changeQty(cartItem, direction) {
            const data = {
                userId: this.user._id,
                cartId: cartItem.id
            }
            if (direction === 'plus') {
                data.qty = parseInt(cartItem.qty) + 1
            }
            if (direction === 'minus') {
                data.qty = parseInt(cartItem.qty) - 1
            }

            if (data.qty > 0) {
                await cartApi.updateCartQty(data, response => {
                    this.parseCart(response)
                })
            }
        }
    }
}
</script>

<style>
.qty-col {
    min-width: 130px;
}

.qty-control {
    margin: auto 5px !important;
}

.amount-sum {
    margin-top: 20px;
}

small .v-icon, p .v-icon {
    font-size: 12px !important;
}
</style>
