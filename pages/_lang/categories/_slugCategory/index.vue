<template>
    <v-container v-if="category">
    	<v-row>
    		<v-col cols="12">
    			<h3 class="c-title title-olive mt-3">
    				{{ category.translation.name }}
    			</h3>
    		</v-col>
    		<v-col class="col-12">
    			<div class="category-container">
    				<div class="filter">
    					<v-btn large @click="openFilterModal" >
    						<v-icon color="title" class="mr-2">mdi-filter</v-icon>
    						Filter
    					</v-btn>
    					<v-btn large @click="openSortModal">
    						<v-icon color="title" class="mr-2">mdi-sort</v-icon>
    						Sort
    					</v-btn>
    				</div>
    				<v-row>
    					<v-col class="col-lg-3 col-6 mb-2" v-for="(product, key) in category.products" :key="key">
    						<nuxt-link :to="`/ro/categories/${category.alias}/${product.alias}`" class="product">
    							<v-img :src="`https://back.soledy.com/images/products/sm/${product.main_image.src}`"></v-img>
    							<p class="product__name">{{ product.translation.name }}</p>
    							<div class="collectionOne__price price">
    								<span>{{ product.personal_price.price }}</span>
    								<!-- <span>/</span>
    								<span class="price__discount">320</span> -->
    								<span>{{ currency.abbr }} </span>
    							</div>
    						</nuxt-link>
    					</v-col>
    				</v-row>
    			</div>
    		</v-col>
    	</v-row>
    </v-container>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import contentApi from '@/api/contentApi'

export default {
	async asyncData({ app, params, store }) {
		let categ = null
		await contentApi.getCategory({lang: store.state.lang.lang, alias: params.slugCategory, currency: store.state.currency.id}, data => {
		    categ = data
		})
		return {
		    category: categ
		}
	},
	data() {
		return {
			category: null,
			filterModal: false,
			sortModal: false,
			items: [{
				image: "https://back.soledy.com/images/products/og/bracelet-anne-poppy-forest-s1.JPG?5fa2a780ed00b",
				name: "Brăţară Anné-Poppy Forest",
				price: "170.00",
				to: "/one-product"
			}]
		}
	},
	computed: mapGetters({
		categories: 'getCategories',
        language: 'getLanguage',
		currency: 'getCurrency',
		trans: 'getTranslations',
	}),
	async mounted() {
		// this.category = await this.categories.find((category) => category.alias == this.$route.params.slugCategory)
		// this.title = this.service.translation.seo_title
		// this.description = this.service.translation.seo_description
		// this.setChatBotmessage(this.trans.General.botMessageTemplate1 + " " + this.service.translation.bot_message + '? '+ this.trans.General.botMessageTemplate2)
	},
	methods: {
		openFilterModal() {
			this.filterModal = true
		},
		closeFilterModal() {
			this.filterModal = false
		},
		openSortModal() {
			this.sortModal = true
		},
		closeSortModal() {
			this.sortModal = false
		}
	}
}
</script>

<style lang="scss" scoped>
.v-navigation-drawer {
   width: 100vw !important;
   max-width: 450px !important;
}

.category-container {
   position: relative;
}

.filter {
   display: flex;
   justify-content: space-around;
   padding: 20px 0;
   margin-bottom: 20px;
   background: $bcg-body;
   position: sticky;
   top: 56px;
   margin-left: -15px;
   margin-right: -15px;
   z-index: 4;
}

.product {
   &__name,
   &__price {
       display: block;
       font-family: $font-text;
       font-size: 14px;
       color: $olive-color;
       letter-spacing: 0;
       text-align: center;
       line-height: 1.2;
       margin-top: 10px;
       margin-bottom: 0;
   }
}

@media (min-width: 1200px) {
   .filter {
       top: 63px;
       justify-content: center;
       .v-btn {
           margin: 0 20px;
       }
   }
}
</style>