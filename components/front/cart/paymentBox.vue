<template>
    <v-row class="payment-area">
        <v-col class="col-md-12" v-if="validateErrors">
            <v-alert
                dense
                outlined
                type="error"
            >
                {{ validateErrors }}
            </v-alert>
        </v-col>
        <v-col>
            <v-card
                :class="[(methods.cod) ? 'selected-method' : '', 'mx-auto', 'payment-card']"
                @click="changePayment('cod')"
                max-width="300"
            >
                <v-card-text class="text-center">
                    <h3 class="payment-title">Cash on Delivery</h3>
                    <img src="/cod.png" class="payment-img"/>
                </v-card-text>
            </v-card>
        </v-col>

        <v-col>
            <v-card
                :class="[(methods.card) ? 'selected-method' : '', 'mx-auto', 'payment-card']"
                @click="changePayment('card')"
                max-width="300"
            >
                <v-card-text class="text-center">
                    <h3 class="payment-title">Credit Card</h3>
                    <img src="/card.jpeg" class="payment-img"/>

                </v-card-text>
            </v-card>
        </v-col>
        <!-- <v-col>
            <v-card
                :class="[(methods.paypal) ? 'selected-method' : '', 'mx-auto', 'payment-card']"
                @click="changePayment('paypal')"
                max-width="300"
            >
                <v-card-text class="text-center">
                    <h3 class="payment-title">Paypal</h3>
                    <img src="/paypal.png" class="payment-img"/>
                </v-card-text>
            </v-card>
        </v-col> -->
        <v-col>
            <stripe-checkout
                ref="checkoutRef"
                mode="payment"
                :pk="publishableKey"
                :line-items="lineItems"
                :success-url="successURL"
                :cancel-url="cancelURL"
                @loading="v => loading = v"
            />
            <!-- <v-btn @click="submit">test stripe</v-btn> -->
        </v-col>
    </v-row>
</template>

<script>

import { StripeCheckout } from '@vue-stripe/vue-stripe';
import {mapGetters, mapActions} from 'vuex'
import cartApi from '@/api/cartApi'

export default {
    data() {
        return {
            ready: true,
            publishableKey: 'pk_live_51JABrOCSan7VcJr1xwgbeRFBq02Un3XXf4EyFn77Dc0YwONmGgr6Yzo5y1m8wPuEHpymXTArIEuJ7ZJI2nFlUUgJ0033JmqWom',
            loading: false,
            lineItems: [
                {
                    price: 'price_1J3jPzFqQHaOvZ90TZBI6HZg', // The id of the recurring price you created in your Stripe dashboard
                    quantity: 1,
                },
            ],
            successURL: 'https://docrom.info/redirect/payment/success',
            cancelURL: 'https://docrom.info/redirect/payment/cancel',
            validateErrors: null,
            payment: null,
            methods: {
                cod: false,
                card: false,
                paypal: false,
            }
        }
    },
    computed: mapGetters({
        order: 'cart/getOrder',
        total: 'cart/getTotal',
        language: 'getLanguage',
        cart: 'cart/getCart',
    }),
    mounted() {
        this.$nuxt.$on('valiadatePayment', cb => {
            if (this.payment === 'card' && this.ready) {
                this.ready = false
                cartApi.createStripeProducts({userId: this.$auth.user._id, cart: this.cart}, response => {
                    this.lineItems = response
                    if (this.lineItems) {
                        this.redirectToCheckout()
                    }
                })
            }else{
                this.validatePayments(cb)
            }
        })
    },
    components: { StripeCheckout},
    methods: {
        ...mapActions({
            updatePaymentInfo: 'cart/updatePaymentInfo',
            pay: 'cart/pay',
            resetOrder: 'cart/resetOrder'
        }),
        changePayment(payment) {
            this.resetMethods()
            this.methods[payment] = !this.methods[payment]
            this.payment = payment
        },
        resetMethods() {
            this.methods.cod = false
            this.methods.card = false
            this.methods.paypal = false
            this.payment = null
            this.validateErrors = null
        },
        redirectToCheckout() {
            this.updatePaymentInfo({
                paymentMethod: this.payment,
                orderId: this.order._id
            }).then(res => {
                this.$refs.checkoutRef.redirectToCheckout()
                this.ready = true
            })
        },
        validatePayments(cb) {
            if (!this.payment) {
                this.validateErrors = 'Change payment method'
                return false
            } else {
                this.updatePaymentInfo({
                    paymentMethod: this.payment,
                    orderId: this.order._id
                }).then(res => {
                    this.handleBilling()
                })
            }
        },
        handleBilling() {
            const order =  this.order
            if (!this.order.paymentMethod) {
                this.validateErrors = 'Change payment method'
                return false
            }
            this.pay({
                userId: this.$auth.user._id,
                orderId: this.order._id,
                amount: this.total
            }).then(res => {
                this.resetMethods()
                this.resetOrder()
                this.$router.push(`/${this.language.lang}/thank-you?order=${order._id}`)
            })
        }
    }
}
</script>

<style>
.payment-area {
    margin-bottom: 30px;
}

.payment-img {
    max-height: 70px;
}

.payment-card {
    cursor: pointer;
}

.selected-method {
    background-color: #CCC !important;
}

.payment-title{
    min-height: 48px;
}
</style>
