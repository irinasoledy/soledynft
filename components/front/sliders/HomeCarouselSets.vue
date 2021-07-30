<template>
    <div class="h-slider">
        <VueSlickCarousel ref="homeCarousel" :infinite="true" :variableWidth="true" :arrows="false" :settings="localSettings" >
            <div class="h-slider__item">
                <nuxt-link :to="`/ro/collections/${collection.alias}`" class="h-slider__item-inner">
                    <div class="h-slider__image">
                        <img :src="`https://back.soledy.com/images/collections/${collection.banner_mob}`" alt="">
                    </div>
                    <div class="h-slider__actions">
                        <v-btn color="primary" outlined>
                            Vezi produsele (here)
                        </v-btn>
                    </div>
                </nuxt-link>
            </div>
            <div class="h-slider__item" v-for="(set, i) in sets" :key="i" v-if="set.main_photo && i < 5">
                <nuxt-link :to="`/ro/collections/${collection.alias}#${set.alias}`" class="h-slider__item-inner">
                    <div class="h-slider__image">
                        <img :src="`https://back.soledy.com/images/sets/sm/${set.main_photo.src}`">
                    </div>
                </nuxt-link>
            </div>
        </VueSlickCarousel>
        <div class="custom-arrow next-slide" @click="nextSlide">
            <v-btn icon color="primary">
                <arrow-left />
            </v-btn>
        </div>
        <div class="custom-arrow prev-slide" @click="prevSlide">
            <v-btn icon color="primary">
                <arrow-left />
            </v-btn>
        </div>
    </div>
</template>

<script>

import VueSlickCarousel from 'vue-slick-carousel'
import 'vue-slick-carousel/dist/vue-slick-carousel.css'
import ArrowLeft from '@/components/front/sliders/ArrowLeft.vue'

export default {
	name: 'HomeCarousel',
    props: ['sets', 'collection'],
	components: {
		VueSlickCarousel,
		ArrowLeft
	},
	data() {
		return {
			localSettings: {
				dots: false,
				slidesToScroll: 1,
				slidesToShow: 1,
				arrows: false,
				infinite: true
			}
		}
	},
	methods: {
		nextSlide() {
			this.$refs.homeCarousel.next()
		},
		prevSlide() {
			this.$refs.homeCarousel.prev()
		}
	}
}
</script>

<style lang="scss" scoped>
.h-slider {
   &__item {
       position: relative;
       display: block;
       padding: 25px 16px;
       &-inner {
           -webkit-box-shadow: 0 11px 20px 0 rgba(111, 111, 111, 0.51);
           box-shadow: 0 11px 20px 0 rgba(111, 111, 111, 0.51);
           display: flex;
           align-items: flex-end;
           justify-content: center;
       }
       .v-btn {
           background: $bcg-butt;
           margin-bottom: 20%;
       }
   }
   &__actions {
       position: absolute;
       z-index: 1;
   }
   &__image {
       img {
           width: 100%;
       }
   }
   .next-slide {
       transform: rotate(180deg);
   }
}

@media (min-width: 1200px) {
   .h-slider {
       &__actions {
           display: none;
       }
   }
}
</style>
