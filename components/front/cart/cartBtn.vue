<template>
    <v-btn color="secondary" small class="add-to-cart-btn" @click="addToCart()">
        <v-icon>mdi-cart</v-icon>
        add service to cart
    </v-btn>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    props: ['user', 'service'],
    mounted() {
        console.log(this.user)
    },
    computed: mapGetters({
        cart: 'cart/getCart'
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
