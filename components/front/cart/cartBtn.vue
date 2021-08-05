<template>
    <!-- <v-btn  depressed large color="primary" class="ma-0 ip-plan-btn" @click="addToCart()">
        <v-icon>mdi-cart</v-icon>
        add to cart
    </v-btn> -->

    <v-btn color="body" class="mt-4" block @click="addToCart()">
        <v-icon>mdi-cart</v-icon>
        Add to cart
    </v-btn>

</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    props: ['product', 'subproduct', 'type'],
    computed: mapGetters({
        cart: 'cart/getCart',
        total: 'cart/getTotal',
        userCartId: 'cart/getUserCartId',
    }),
    methods: {
        ...mapActions({
            appendToCart: 'cart/appendToCart',
        }),
        addToCart() {
            if (this.type === 'prod') {
                this.appendToCart({userId: this.userCartId, productId: this.product.id})
                // console.log(this.product);
            }
            // console.log('mvkdm');
            // this.appendToCart({userId: this.user._id, serviceId: this.service.id})
        }
    }
}
</script>
