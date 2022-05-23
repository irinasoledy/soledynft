<template>
    <v-list>
        <v-list-item @click="closeDrawer">
            <v-list-item-icon class="mr-2">
                <v-icon color="primary">mdi-keyboard-backspace</v-icon>
            </v-list-item-icon>
            <v-list-item-content>
                <v-list-item-title>back</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item v-if="items && type === 'category'" nuxt :to="`/ro/categories/all`" :class="'pl-8'">
            <v-list-item-content>
                <v-list-item-title>
                    {{ $trans('PagesNames', 'pageNameAllProducts') }}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="items && type === 'category'" v-for="item in items" :key="item.id" nuxt :to="`/ro/categories/${item.alias}`" :class="'pl-8'">
            <v-list-item-content>
                <v-list-item-title>
                    {{item.translation.name}}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>

        <v-list-item v-if="items && type === 'collection'" v-for="item in items" :key="item.id" nuxt :to="`/ro/collections/${item.alias}`" :class="'pl-8'">
            <v-list-item-content>
                <v-list-item-title>
                    {{item.translation.name}}
                </v-list-item-title>
            </v-list-item-content>
        </v-list-item>
    </v-list>
</template>

<script>
export default {
    name: "NavLevelTwo",
    	props: ['items', 'type'],
    	data() {
    		return {
    			clipped: false,
    			fixed: false
    		}
    	},
    	methods: {
    		closeDrawer() {
    			this.$emit('closeDrawerTwo')
    		}
    	}
    }
</script>

<style lang="scss" scoped>
    .v-list-item {
        &__title {
            text-transform: uppercase;
        }
    }
</style>

