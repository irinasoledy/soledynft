<template>
    <v-container >
    	<v-row>
    		<v-col class="col-12">
    			<h3 class="c-title title-olive my-3">
    				New in
    			</h3>
    		</v-col>
    		<v-col class="col-lg-3 col-md-4 col-6 mb-2" v-for="(product, key) in products" :key="key" v-if="products">
    			<nuxt-link :to="`/ro/categories/${product.category.alias}/${product.alias}`" class="product">
        			<v-img :src="`https://back.soledy.com/images/products/og/${product.main_image.src}`"></v-img>
        			<p class="product__name">{{ product.translation.name }}</p>
        			<div class="collectionOne__price price">
        				<span>{{ product.personal_price.price }}</span>
        				<span>{{ currency.abbr }} </span>
        			</div>
    			</nuxt-link>
    		</v-col>
    	</v-row>
    </v-container>
</template>

<script>

import contentApi from '@/api/contentApi'
import { mapActions, mapGetters } from 'vuex'

export default {
    async asyncData({ app, params, store}) {
        let prods = null
        await contentApi.getNewProducts({
            lang: store.state.lang.lang,
            currency: store.state.currency.id,
        }, data => {
            prods = data
        })
        return {
            products: prods,
        }
    },
    computed: mapGetters({
        language: 'getLanguage',
        currency: 'getCurrency',
        trans: 'getTranslations',
    }),
    data () {
        return {
            products: null,
            items: {
                image: "https://back.soledy.com/images/products/og/bracelet-anne-poppy-forest-s1.JPG?5fa2a780ed00b",
                name: "Brăţară Anné-Poppy Forest",
                price: "170.00",
                to: "/one-product"
            }
        }
    }
}
</script>
