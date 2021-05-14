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
                    <h3>Cash on Delivery</h3>
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
                    <h3>Credit Card</h3>
                    <img src="/card.jpeg" class="payment-img"/>

                </v-card-text>
            </v-card>
        </v-col>


        <v-col>
            <v-card
                :class="[(methods.paypal) ? 'selected-method' : '', 'mx-auto', 'payment-card']"
                @click="changePayment('paypal')"
                max-width="300"
            >
                <v-card-text class="text-center">
                    <h3>Paypal</h3>
                    <img src="/paypal.png" class="payment-img"/>
                </v-card-text>
            </v-card>
        </v-col>
    </v-row>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    data() {
        return {
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
    }),
    mounted() {
        this.$nuxt.$on('valiadatePayment', cb => {
            this.validatePayments(cb)
        })
    },
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
        validatePayments(cb) {
            if (!this.payment) {
                this.validateErrors = 'Change payment method'
                return false
            }else{
                this.updatePaymentInfo({
                    paymentMethod: this.payment,
                    orderId: this.order._id
                }).then(res => {
                    this.handleBilling()
                })
            }
        },
        handleBilling() {
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
                this.$router.push(`/${this.language.lang}/thank-you`)
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
</style>