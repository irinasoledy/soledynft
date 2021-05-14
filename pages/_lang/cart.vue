<template>
    <main class="content" v-if="$auth.loggedIn">

        <v-stepper v-model="e1">
            <v-container>
                <v-stepper-header>
                    <template>
                        <v-stepper-step
                            key="1-step"
                            :complete="e1 > 1"
                            step="1"
                            editable
                        >
                            Shopping cart
                        </v-stepper-step>
                        <v-divider></v-divider>
                    </template>
                    <template>
                        <v-stepper-step
                            key="2-step"
                            :complete="e1 > 2"
                            step="2"
                            editable
                        >
                            Customer information
                        </v-stepper-step>
                        <v-divider></v-divider>
                    </template>

                    <template v-if="order">
                        <v-stepper-step
                            key="3-step"
                            :complete="e1 > 3"
                            :step="3"
                            editable
                        >
                            Complete order
                        </v-stepper-step>
                    </template>
                    <template v-else>
                        <v-stepper-step
                            key="3-step"
                            :complete="e1 > 3"
                            :step="3"
                        >
                            Complete order
                        </v-stepper-step>

                    </template>
                </v-stepper-header>
            </v-container>

            <v-stepper-items>
                <v-stepper-content step="1">
                    <v-container>
                        <v-row>
                            <v-col class="col-md-8 cart-box">
                                <cartBox/>
                            </v-col>
                            <v-col class="col-md-4 cart-summary">
                                <cartSummary step="1" btnTitle="Continue to checkout"/>
                            </v-col>
                            <v-col>
                                <p><b>We accept:</b></p>
                                <img class="cards-img" src="/cards-img.png" alt="">
                            </v-col>
                        </v-row>

                    </v-container>
                </v-stepper-content>

                <v-stepper-content step="2">
                    <v-container>
                        <v-row>
                            <v-col class="col-md-8 cart-box">
                                <checkOutBox/>
                            </v-col>
                            <v-col class="col-md-4 cart-summary">
                                <cartSummary step="2" btnTitle="Continue to payment"/>
                            </v-col>
                            <v-col>
                                <p><b>We accept:</b></p>
                                <img class="cards-img" src="/cards-img.png" alt="">
                            </v-col>
                        </v-row>
                    </v-container>
                </v-stepper-content>

                <v-stepper-content step="3">
                    <v-container>
                        <v-row>
                            <v-col class="col-md-8 cart-box">
                                <paymentBox />
                                <p><b>We accept:</b></p>
                                <img class="cards-img" src="/cards-img.png" alt="">
                            </v-col>
                            <v-col class="col-md-4 cart-summary">
                                <cartSummary step="3" btnTitle="Pay"/>
                            </v-col>
                        </v-row>
                    </v-container>
                </v-stepper-content>
            </v-stepper-items>
        </v-stepper>
    </main>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

import cartBox from '@/components/front/cart/cartBox'
import cartSummary from '@/components/front/cart/cartSummary'
import checkOutBox from '@/components/front/cart/checkOutBox'
import paymentBox from "~/components/front/cart/paymentBox";

export default {
    data() {
        return {
            e1: 1,
            steps: [
                {id: 1, title: 'Shopping Cart'},
                {id: 2, title: 'Checkout'},
                {id: 3, title: 'Payment'},
            ],
        }
    },
    computed: mapGetters({
        cart: 'cart/getCart',
        order: 'cart/getOrder',
    }),
    watch: {
        steps(val) {
            if (this.e1 > val) {
                this.e1 = val
            }
        },
    },
    mounted() {
        this.$nuxt.$on('nextStep', step => {
            this.nextStep(step)
        })
    },
    methods: {
        ...mapActions({
            removeCart: 'cart/removeCart',
        }),
        nextStep(n) {
            n = parseInt(n)
            if (n === 3) {
                this.e1 = 1
            } else {
                this.e1 = n + 1
            }
        },
    },
    components: {
        cartBox, cartSummary, checkOutBox, paymentBox
    }
}
</script>

<style scoped>
.content {
    margin-top: 130px;
}

.cart-box, .cart-summary {
    /*margin-top: 50px;*/
}

.cart-summary {

}

.v-stepper__header {
    box-shadow: none;
    margin-left: -15px;
}

.pointer {
    cursor: pointer;
}

.cards-img {
    max-width: 300px;

}
</style>