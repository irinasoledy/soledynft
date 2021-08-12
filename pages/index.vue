<template>
    <div class="h-content">
        <home-banner-carousel />
        <div class="h-sections">

            <section class="h-section" v-for="(item, index) in items" :key="index">
                <h3 class="h-section__title">
                    {{ item.view.translation.name }}
                </h3>

                <home-carousel-sets :sets="item.view.sets" :collection="item.view" v-if="item.type === 'collection'"/>

                <home-carousel-products :products="item.view.products" :category="item.view" v-else/>

                <div class="h-section__button">
                    <v-btn nuxt :to="`/${language.lang}/collections/${item.view.alias}`" outlined color="primary" v-if="item.type === 'collection'">
                        {{ $trans('DetailsProductSet', 'viewItemsFromSet') }}
                    </v-btn>
                    <v-btn nuxt :to="`/${language.lang}/categories/${item.view.alias}`" outlined color="primary" v-else>
                        {{ $trans('DetailsProductSet', 'viewProducts') }}
                    </v-btn>
                </div>
            </section>
        </div>
        <about />
    </div>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

import HomeCarouselSets from '@/components/front/sliders/HomeCarouselSets.vue'
import HomeCarouselProducts from '@/components/front/sliders/HomeCarouselProducts.vue'
import HomeBannerCarousel from '@/components/front/sliders/HomeBannerCarousel.vue'
import About from '@/components/front/widgets/About.vue'

export default {
    components: {HomeBannerCarousel, About, HomeCarouselSets, HomeCarouselProducts},
    computed: mapGetters({
        categories: 'getCategories',
        collections: 'getCollections',
        language: 'getLanguage'
    }),
    data() {
        return {
            items: null
        }
    },
    mounted() {
        const items = []
        this.categories.forEach((category, i) => {
            if (category.on_home === 1) {
                items.push({type: 'category', view: category})
                if (typeof this.collections[i] !== 'undefined') {
                    items.push({type: 'collection', view: this.collections[i]})
                }
            }
        })
        this.items = items
    }
}
</script>

<style lang="scss">
.h-slider {
	position: relative;
	.custom-arrow {
		position: absolute;
		z-index: 2;
		top: -30px;
	}
	.prev-slide {
		right: 45px;
	}
	.next-slide {
		right: 5px;
	}
	.slick-slide {
		width: 320px;
		margin: 0 0px;
	}
}

.h-section {
	padding-top: 40px;
	max-width: 1880px;
	margin-left: auto;
	margin-right: auto;
	&__title {
		font-family: $font-titles;
		font-weight: 300;
		font-size: 30px;
		color: #B22D00;
		letter-spacing: 0;
		line-height: 26px;
		max-width: 80%;
		padding-left: 15px;
	}
	&__button {
		text-align: center;
		margin-top: 20px;
		display: none;
	}
	&:nth-child(even) {
		.h-section {
			&__title {
				color: $olive-color;
			}
		}
	}
}

@media (min-width: 1200px) {
	.h-slider {
		.slick-slide {
			width: 400px;
		}
	}
	.h-section {
		&__title {
			font-size: 40px;
			line-height: 2;
		}
		&__button {
			display: block;
		}
	}
}
</style>
