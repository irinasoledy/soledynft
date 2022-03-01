<template>
    <v-simple-table>
        <template v-slot:default>
            <thead>
            <tr>
                <th class="text-left">ID</th>
                <th class="text-left"></th>
                <th class="text-left">Product</th>
                <th class="text-center">Qty</th>
                <th class="text-left">Unit Price</th>
                <th class="text-left">Price</th>
                <th class="text-left">Delete</th>
            </tr>
            </thead>
            <tbody>
                <tr v-for="(cartsProduct, index) in cartsProducts" :key="cartsProduct.id">
                    <td>{{ index + 1 }}</td>
                    <td class="cart-image">
                        <nuxt-link :to="`/${language.lang}/categories/${cartsProduct.product.category.alias}/${cartsProduct.product.alias}`">
                            <img :src="`https://back.soledynft.shop/images/products/sm/${cartsProduct.product.main_image.src}`" alt="">
                        </nuxt-link>
                    </td>
                    <td class="str-col" v-if="cartsProduct.product.translation">
                        <nuxt-link :to="`/${language.lang}/categories/${cartsProduct.product.category.alias}/${cartsProduct.product.alias}`">
                            {{ cartsProduct.product.translation.name }}
                        </nuxt-link>
                    </td>
                    <td class="text-center qty-area str-col">
                        <v-icon class="qty-control" @click="changeQty(cartsProduct, 'minus')">mdi-minus</v-icon>
                        <span>{{ cartsProduct.qty }}</span>
                        <v-icon class="qty-control" @click="changeQty(cartsProduct, 'plus')">mdi-plus</v-icon>
                    </td>
                    <td class="str-col">{{ cartsProduct.product.personal_price.price }} EUR</td>
                    <td class="str-col">{{ cartsProduct.product.personal_price.price * cartsProduct.qty }} EUR</td>
                    <td>
                        <v-icon class="pointer" @click="deleteCartItem(cartsProduct)">
                            mdi-delete
                        </v-icon>
                    </td>
                </tr>

                <tr v-for="(cartsSubproduct, index) in cartsSubproducts" :key="cartsSubproduct.id">
                    <td>{{ cartsProducts.length + index + 1 }}</td>
                    <td class="cart-image">
                        <nuxt-link :to="`/${language.lang}/categories/${cartsSubproduct.subproduct.product.category.alias}/${cartsSubproduct.subproduct.product.alias}`">
                            <img :src="`https://back.soledynft.shop/images/products/sm/${cartsSubproduct.subproduct.product.main_image.src}`" alt="">
                        </nuxt-link>
                    </td>
                    <td class="str-col" v-if="cartsSubproduct.subproduct.product.translation">
                        <nuxt-link :to="`/${language.lang}/categories/${cartsSubproduct.subproduct.product.category.alias}/${cartsSubproduct.subproduct.product.alias}`">
                            {{ cartsSubproduct.subproduct.product.translation.name }}
                            <p><small><b>Size: {{ cartsSubproduct.subproduct.parameter_value.translation.name }}</b></small> </p>
                        </nuxt-link>
                    </td>
                    <td class="text-center qty-area str-col">
                        <v-icon class="qty-control" @click="changeQty(cartsSubproduct, 'minus')">mdi-minus</v-icon>
                        <span>{{ cartsSubproduct.qty }}</span>
                        <v-icon class="qty-control" @click="changeQty(cartsSubproduct, 'plus')">mdi-plus</v-icon>
                    </td>
                    <td class="str-col">{{ cartsSubproduct.subproduct.product.personal_price.price }} EUR</td>
                    <td class="str-col">{{ cartsSubproduct.subproduct.product.personal_price.price * cartsSubproduct.qty }} EUR</td>
                    <td>
                        <v-icon class="pointer" @click="deleteCartItem(cartsSubproduct)">
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
        cartsProducts: 'cart/getCartsProducts',
        cartsSubproducts: 'cart/getCartsSubproducts',
        userCartId: 'cart/getUserCartId',
        language: 'getLanguage',
        currency: 'getCurrency',
    }),
    methods: {
        ...mapActions({
            removeCart: 'cart/removeCart',
            updateQty: 'cart/updateQty',
        }),
        async deleteCartItem(cartItem) {
            await this.removeCart({
                cartId: cartItem.id,
                userId: this.userCartId,
                lang: this.language.lang,
                currency: this.currency.id,
            })
        },
        async changeQty(cartItem, direction) {
            if (direction === 'plus') {
                this.qty = parseInt(cartItem.qty) + 1
            }
            if (direction === 'minus') {
                this.qty = parseInt(cartItem.qty) - 1
            }

            if (this.qty > 0) {
                await this.updateQty({
                    cartId: cartItem.id,
                    qty: this.qty,
                    userId: this.userCartId,
                    lang: this.language.lang,
                    currency: this.currency.id
                })
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
.cart-image img {
    max-width: 50px;
}
</style>
