<template>
    <v-btn  depressed large color="primary" class="ma-0 ip-plan-btn" @click="addToCart()">
        <v-icon>mdi-cart</v-icon>
        add to cart
    </v-btn>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    props: ['user', 'service'],
    computed: mapGetters({
        cart: 'cart/getCart',
        total: 'cart/getTotal'
    }),
    methods: {
        ...mapActions({
            appendToCart: 'cart/appendToCart',
        }),
        addToCart() {
            this.appendToCart({userId: this.user._id, serviceId: this.service.id})
        }
    }
}
</script>
