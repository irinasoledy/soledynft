<template>
    <nuxt-link :to="`/ro/cart`">

        <v-badge
            v-if="cart.length"
            bordered
            color="secondary"
            icon="mdi-lock"
            overlap
            :content="cart.length"
        >
            <v-icon>
                mdi-cart
            </v-icon>
        </v-badge>

        <v-icon v-else>
            mdi-cart
        </v-icon>

    </nuxt-link>

</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    computed: mapGetters({
        cart: 'cart/getCart'
    }),
    async mounted() {
        await this.getCart(this.$auth.user._id)
        console.log(this.cart)
    },
    methods: {
        ...mapActions({
            appendToCart: 'cart/appendToCart',
            getCart: 'cart/getCart'
        })
    },

}
</script>

<style scoped>

</style>