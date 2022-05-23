<template>
    <v-container v-if="collection">
    	<v-row>
    		<v-col class="col-12">
    			<h3 class="collectionOne__title">
    				<span>{{ collection.translation.name }}</span>
    			</h3>
    		</v-col>
    		<v-col class="col-12">
    			<v-row v-for="(set, i) in collection.sets" :key="i" class="collectionsItems mb-8">
    				<v-col class="col-12">
    					<h4 class="collectionOne__subtitle" :id="set.alias">
    						{{ set.translation.name }}
    					</h4>
    				</v-col>
    				<v-col class="col-12">
    					<div class="collectionOne">
    						<v-row class="justify-space-between">
    							<v-col class="col-lg-7 col-12">
    								<slider-one-product :images="set.photos" @openZoom="openZoom" :productImages="set.photos" path="sets"/>
    							</v-col>
                                <set-products :set="set"/>
    						</v-row>
    					</div>
    				</v-col>
                    <zoom v-if="zoom" @closeZoom="zoom = false" :mainImage="mainImage" :productImages="set.photos" path="sets"/>
    			</v-row>
    		</v-col>
    	</v-row>
        <v-row class="experts">
            <v-col class="col-12">
                <h3 class="p-title-experts">{{ $trans('DetailsProductSet', 'viewLiveProducts') }}</h3>
            </v-col>
            <experts />
        </v-row>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import SliderOneProduct from '@/components/front/sliders/SliderOneProduct.vue'
import SetProducts from '@/components/front/productWidgets/SetProducts.vue'
import Sizes from '@/components/front/productWidgets/Sizes.vue'
import Colors from '@/components/front/productWidgets/Colors.vue'
import Zoom from '@/components/front/productWidgets/Zoom.vue'
import Experts from '@/components/front/widgets/expertsWidget'

import contentApi from '@/api/contentApi'

export default {
	components: {
		SliderOneProduct,
		Sizes,
		Zoom,
        SetProducts,
        Experts
	},
	async asyncData({ app, params, store}) {
		let collect = null
		await contentApi.getCollection({
            lang: store.state.lang.lang,
			currency: store.state.currency.id,
			alias: params.slugCollection
		}, data => {
			collect = data
		})
		return {
			collection: collect,
		}
	},
    watch: {
        async currency() {
            await contentApi.getCollection({
                lang: this.language.lang,
                currency: this.currency.id,
                alias: this.collection.alias
            }, data => {
                this.collection = data
            })
        },
    },
	data() {
		return {
			collection: null,
			sizesOptions: [{
					label: "XS",
					value: "xs",

				},
				{
					label: "S",
					value: "s",
					selected: true
				},
				{
					label: "M",
					value: "m"
				},
				{
					label: "L",
					value: "l"
				},
				{
					label: "XL",
					value: "xl"
				},
				{
					label: "XXL",
					value: "xxl"
				}
			],
			collectionImages: [
				"https://www.nawpic.com/media/2020/desktop-backgrounds-nawpic-1.png",
				"https://www.nawpic.com/media/2020/desktop-backgrounds-nawpic-17.jpg",
				"https://img.freepik.com/free-vector/colorful-palm-silhouettes-background_23-2148541792.jpg?size=626&ext=jpg&ga=GA1.2.1685543998.1622592000",
				"https://soledynft.shop/images/products/sm/necklace-anne-kelly-black-s4.JPG?5fa2a780ed00b",
				"https://soledynft.shop/images/products/sm/necklace-anne-kelly-black-s5.JPG?5fa2a780ed00b",
				"https://soledynft.shop/images/products/sm/necklace-anne-kelly-black-s6.JPG?5fa2a780ed00b"
			],
			zoom: false,
			mainImage: null
		}
	},
	computed: mapGetters({
		collections: 'getCollections',
        language: 'getLanguage',
		currency: 'getCurrency',
		trans: 'getTranslations',
	}),
	async mounted() {
		// this.collection = await this.collections.find((collection) => collection.alias == this.$route.params.slugCollection)
		// this.title = this.service.translation.seo_title
		// this.description = this.service.translation.seo_description
		// this.setChatBotmessage(this.trans.General.botMessageTemplate1 + " " + this.service.translation.bot_message + '? '+ this.trans.General.botMessageTemplate2)
	},
	methods: {
        getTotalSetPrice(products) {
            let price = 0
            for (var i = 0; i < products.length; i++) {
                price += parseInt(products[i].product.personal_price.price)
            }
            return parseFloat(price).toFixed( 2 )
        },
		openZoom(image) {
			this.mainImage = image
			this.zoom = true
		}
	}
}
</script>

<style lang="scss" scoped>
.collectionOne {
	&__discount {
		font-family: $font-text-bold;
		font-size: 25px;
		color: $red-color;
		padding-left: 20px;
		letter-spacing: 0.04px;
		line-height: 1.2;
		text-align: center;
		padding-top: 3px;
	}
	&__total {
		display: flex;
		align-items: center;
		justify-content: space-between;
		color: $main-color;
		font-size: 18px;
		text-transform: uppercase;
		.price {
			font-size: 22px;
		}
	}
	.v-btn.body {
		color: $main-color !important;
		margin: 20px 0;
		.cart-icon {
			width: 15px;
			margin-left: 5px;
			margin-bottom: 5px;
		}
	}
	&__title,
	&__subtitle {
		font-size: 30px;
		text-align: center;
		font-family: $font-titles;
		color: $main-color;
		text-transform: uppercase;
		line-height: 1.5;
		margin-top: 20px;
		span {
			border-bottom: 1px solid $main-color;
		}
	}
	&__subtitle {
		font-size: 20px;
		margin-bottom: 20px;
	}
	&__button-desktop,
	&__price-desktop {
		display: none;
	}
}

.colProd {
	position: relative;
	&__item {
		position: relative;
		display: block;
		text-align: left;
	}
	&__name {
		font-size: 20px;
		font-family: $font-text;
		margin-bottom: 8px;
		display: block;
		line-height: 1;
		color: $main-color;
	}
	&__price {
		text-align: left;
		margin-bottom: 3px;
	}
	&__color {
		font-size: 20px;
		font-family: $font-text;
		color: $main-color;
		margin-top: 0;
	}
	&__image {
		img {
			width: 100%;
		}
	}
}

@media (min-width: 1200px) {
	.collectionOne {
		&__mobile {
			display: none;
		}
		&__button-desktop.v-btn.body {
			display: block;
			margin-top: 50px;
		}
		&__price-desktop {
			display: block;
		}
	}
	.container {
		max-width: 900px;
	}
	.collectionsItems {
		border-bottom: 1px solid rgba(0, 0, 0, 0.1);
		padding-bottom: 40px;
	}
}
</style>


