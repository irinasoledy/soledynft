<template lang="html">
    <v-col class="col-lg-4 col-12">
        <v-row>
            <v-col class="col-12 mt-6" v-for="(product, i) in set.set_products" :key="i" v-if="product">
                <div class="colProd__item">
                    <v-row>
                        <nuxt-link :to="`/ro/categories/${product.product.category.alias}/${product.product.alias}`" class="h-slider__item-inner">
                            <v-row class="justify-space-around">
                            <v-col class="col-4 pb-0">
                                <div class="colProd__image">
                                    <img :src="`https://back.soledynft.shop/images/products/sm/${product.product.main_image.src}`" alt="">
                                </div>
                            </v-col>
                            <v-col class="col-xl-8 col-lg-8 col-md-6 col-6 pb-0">
                                <div class="colProd__descr">
                                    <div class="colProd__name">
                                        {{ product.product.translation.name }}
                                    </div>
                                    <div class="colProd__price price">
                                        <span>{{ product.product.personal_price.price }}</span>
                                        <span v-if="product.product.personal_price.old_price > product.product.personal_price.price">/</span>
        								<span class="price__discount" v-if="product.product.personal_price.old_price > product.product.personal_price.price">
                                            {{ product.product.personal_price.old_price }}
                                        </span>
                                        <span>{{ currency.abbr }} </span>
                                    </div>
                                </div>
                            </v-col>
                        </v-row>
                        </nuxt-link>
                        <v-col class="col-12 pb-0">
                            <div class="size__items">
                                <div class="size__item" v-for="subproduct in product.product.subproducts" :key="subproduct.id">
                                    <label class="size__radio">
                                        <input type="radio" name="size" :value="subproduct.parameter_value.id" @change="setSubproduct(product.product.id, subproduct.id)"/>
                                        <span class="size__mark">{{ subproduct.parameter_value.translation.name }}</span>
                                    </label>
                                </div>
                            </div>
                        </v-col>
                    </v-row>
                </div>
            </v-col>
            <v-col class="col-12">
                <div class="collectionOne__total">
                    <span>items selected: {{ set.set_products.length }}</span>
                    <div class="price ma-0">
                        <span>{{ getTotalSetPrice(set.set_products) }} {{ currency.abbr }}</span>
                    </div>
                </div>
            </v-col>
            <v-col class="col-12">
                <p v-if="sizeAllert" class="alert-danger">
                    {{ $trans('DetailsProductSet', 'selectSizeProdsSet') }}
                </p>
                <v-btn color="primary" @click="addToCart()">
                    Add items to bag
                </v-btn>
            </v-col>
        </v-row>
    </v-col>
</template>

<script>
import { mapActions, mapGetters} from 'vuex'
import contentApi from '@/api/contentApi'
import Sizes from '@/components/front/productWidgets/Sizes.vue'

export default {
    props: ['set'],
    components: { Sizes },
	data() {
		return {
            checkedSizes: [],
            sizeAllert: null,
		}
	},
	computed: mapGetters({
        language: 'getLanguage',
		currency: 'getCurrency',
		trans: 'getTranslations',
        userCartId: 'cart/getUserCartId',
	}),
	methods: {
        ...mapActions({
            appendToCart: 'cart/appendToCart',
        }),
        setSubproduct(product, subproduct) {
            this.sizeAllert = null
            this.checkedSizes = this.checkedSizes.filter(item => item.productId != product)
            this.checkedSizes.push({productId: product, subproductId: subproduct})
        },
        addToCart() {
            this.sizeAllert = null
            const checkSubproducts = this.set.set_products.find(item => {
                if (item.product.subproducts.length) {
                    return true
                }
            })

            if (checkSubproducts) {
                if (this.checkedSizes.length === this.set.set_products.length) {
                    this.checkedSizes.forEach(async item => {
                        await this.appendToCart({
                            userId: this.userCartId,
                            productId: item.productId,
                            subproductId: item.subproductId,
                            setId: this.set.id,
                            lang: this.language.lang,
                            currency: this.currency.id
                        })
                    })
                } else {
                    this.sizeAllert = "Alege marimea!"
                }
            } else {
                this.set.set_products.forEach(async item => {
                    await this.appendToCart({
                        userId: this.userCartId,
                        productId: item.product.id,
                        setId: this.set.id,
                        lang: this.language.lang,
                        currency: this.currency.id
                    })
                })
            }
        },
        getTotalSetPrice(products) {
            let price = 0
            for (var i = 0; i < products.length; i++) {
                price += parseInt(products[i].product.personal_price.price)
            }
            return parseFloat(price).toFixed( 2 )
        },
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
.size {
  &__header {
    font-size: 12px;
    color: $main-color;
    display: flex;
    justify-content: space-between;

    span:nth-child(2) {
      opacity: 0.5;
      text-decoration: underline;

      &:hover {
        opacity: 1;
      }
    }
  }
  &__items {
    display: flex;
    width: 100%;
    margin-top: 5px;
  }
  &__item {
    margin-right: 5px;
  }
  &__radio {
    min-width: 50px;
    height: 50px;
    position: relative;
    display: block;

    input {
      position: absolute;
      z-index: -1;
      opacity: 0;
    }
  }
  &__mark {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    font-size: 9px;
    line-height: 50px;
    text-align: center;
    text-transform: uppercase;
    color: rgba(0, 0, 0, 0.6);
    border: 1px solid rgba(0, 0, 0, 0.6);
    z-index: 1;
  }
  input:checked ~ &__mark {
    color: $main-color;
    border-color: $main-color;
    border-width: 2px;
  }
}
.alert-danger {
    color: #C0392B;
    padding-top: 20px;
}
</style>
