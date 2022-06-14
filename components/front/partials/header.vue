<template>
    <v-sheet>
        <v-app-bar fixed color="body">
            <v-app-bar-nav-icon color="primary" @click.stop="drawerOne = !drawerOne" />
            <v-spacer />
            <NuxtLink to="/">
                <v-img src="/images/logo.png" alt="logo" width="100" />
            </NuxtLink>
            <v-spacer />
            <cart />
        </v-app-bar>
        <v-navigation-drawer
            v-model="drawerOne"
            fixed
            color="body"
            temporary
            width="360"
            >
            <nav-level-one  @closeDrawer="drawerOne = false" @openDrawerTwoCatalog="openDrawerTwoCatalog" @openDrawerTwoCollections="openDrawerTwoCollections" />
        </v-navigation-drawer>
        <v-navigation-drawer width="360" v-model="drawerTwo" fixed color="body" temporary>
            <nav-level-two @closeDrawerTwo="closeDrawerTwo" v-bind:items="items"  v-bind:type="type"/>
        </v-navigation-drawer>
    </v-sheet>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

import NavLevelOne from '@/components/front/partials/navbars/NavLeveleOne'
import NavLevelTwo from '@/components/front/partials/navbars/NavLevelTwo'
import Cart from '~/components/front/cart/CartIcon'

export default {
	name: "Header",
	components: {
		NavLevelOne,
		NavLevelTwo,
        Cart
	},
    computed: mapGetters({
        categories: 'getCategories',
        collections: 'getCollections',
    }),
	data() {
		return {
			drawerOne: false,
			drawerTwo: false,
			items: [],
            type: 'category'
		}
	},
	methods: {
		openDrawerTwoCollections() {
			this.items = [...this.collections]
            this.type = 'collection'
			this.drawerTwo = true
			this.drawerOne = false
		},
		openDrawerTwoCatalog() {
			this.items = [...this.categories]
            this.type = 'category'
			this.drawerTwo = true
			this.drawerOne = false
		},
		closeDrawerTwo() {
			this.drawerOne = true
			this.drawerTwo = false
		}
	}
}
</script>

<style lang="scss" scoped>
// @media (max-width: 1200px) {
//
//     .v-toolbar__content {
//         width: 90% !important;
//     }
// }
</style>
