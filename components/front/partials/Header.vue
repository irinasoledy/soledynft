<template>
  <v-sheet>

    <v-app-bar fixed color="body">
      <v-app-bar-nav-icon color="primary" @click.stop="drawerOne = !drawerOne"/>
      <v-spacer/>
      <NuxtLink to="/">
        <v-img src="/images/logo.png" alt="logo" width="100"/>
      </NuxtLink>
      <v-spacer/>

      <NearAuth :title="'Sign In'"/>

      <!--<cart/>-->
    </v-app-bar>

    <v-navigation-drawer
        v-model="drawerOne"
        fixed
        color="body"
        temporary
        width="360">
      <nav-level-one @closeDrawer="drawerOne = false" @openDrawerTwoCatalog="openDrawerTwoCatalog"
                     @openDrawerTwoCollections="openDrawerTwoCollections"/>
    </v-navigation-drawer>

    <v-navigation-drawer width="360" v-model="drawerTwo" fixed color="body" temporary>
      <nav-level-two @closeDrawerTwo="closeDrawerTwo" v-bind:items="items" v-bind:type="type"/>
    </v-navigation-drawer>

  </v-sheet>
</template>

<script>

import {mapGetters} from 'vuex'

import NavLevelOne from '@/components/front/partials/navbars/NavLeveleOne'
import NavLevelTwo from '@/components/front/partials/navbars/NavLevelTwo'
import Cart from '~/components/front/cart/CartIcon'
import NearAuth from "~/components/front/near/NearAuth";

export default {
  name: "Header",
  components: {
    NavLevelOne,
    NavLevelTwo,
    Cart,
    NearAuth
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

