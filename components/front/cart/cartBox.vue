<template>
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
                <td>{{ index + 1 }}</td>
                <td class="str-col">{{ cartItem.service.translation.name }}</td>
                <td class="text-center qty-area str-col">
                    <v-icon class="qty-control" @click="changeQty(cartItem, 'minus')">mdi-minus</v-icon>
                    <span>{{ cartItem.qty }}</span>
                    <v-icon class="qty-control" @click="changeQty(cartItem, 'plus')">mdi-plus</v-icon>
                </td>
                <td class="str-col">{{ cartItem.service.price }} EUR</td>
                <td class="str-col">{{ cartItem.service.price * cartItem.qty }} EUR</td>
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
    data: () => ({
        qty: 0,
    }),
    computed: mapGetters({
        cart: 'cart/getCart',
    }),
    methods: {
        ...mapActions({
            removeCart: 'cart/removeCart',
            updateQty: 'cart/updateQty',
        }),
        async deleteCartItem(cartItem) {
            await this.removeCart({ cartId: cartItem.id, userId: cartItem.user._id })
        },
        async changeQty(cartItem, direction) {
            if (direction === 'plus') {
                this.qty = parseInt(cartItem.qty) + 1
            }
            if (direction === 'minus') {
                this.qty = parseInt(cartItem.qty) - 1
            }

            if (this.qty > 0) {
                await this.updateQty({ cartId: cartItem.id, qty: this.qty, userId: cartItem.user._id  })
            }
        }
    }
}
</script>

<style>
.qty-control{
    cursor: pointer;
    font-size: 14px !important;
    margin: auto 3px;
    border-radius: 50%;
    background-color: #DDD;
    padding: 5px;
}

.qty-area{
    min-width: 160px;
}

@media (max-width: 991px) {
    tbody tr td{
        font-size: 12px !important;
    }
    .str-col{
        min-width: 114px;
    }
    .qty-area{
        min-width: 114px;
    }
    .summary{
        width: 100%;
    }
}
</style>
