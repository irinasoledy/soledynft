<template>
    <nuxt-link :to="`/ro/cart`" v-if="cart.length > 0">
        <v-badge
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
    </nuxt-link>
    <v-icon v-else>
        mdi-cart
    </v-icon>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    computed: mapGetters({
        cart: 'cart/getCart',
        cartRefresh: 'cart/getRefresh'
    }),
    watch: {
        cartRefresh() {
            this.getCart(this.$auth.user._id)
        }
    },
    async mounted() {
        await this.getCart(this.$auth.user._id)
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