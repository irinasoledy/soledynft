<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
            <tr>
                <th class="text-left">ID</th>
                <th class="text-left">Service</th>
                <th class="text-left">Qty</th>
                <th class="text-left">Price</th>
                <th class="text-left">Delete</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="(cartItem, index) in cart" :key="index">
                <td>{{ index + 1 }}</td>
                <td>{{ cartItem.service.translation.name }}</td>
                <td>1</td>
                <td>{{ cartItem.service.price }} EUR</td>
                <td>
                    <v-icon class="pointer" @click="deleteCartItem(cartItem)">
                        mdi-delete
                    </v-icon>
                </td>
            </tr>
            </tbody>
        </template>
    </v-simple-table>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    computed: mapGetters({
        cart: 'cart/getCart',
    }),
    methods: {
        ...mapActions({
            removeCart: 'cart/removeCart',
        }),
        async deleteCartItem(cartItem) {
            await this.removeCart({ cartId: cartItem.id, userId: cartItem.user._id })
        }
    }
}

</script>

<style scoped>

</style>