<template>
    <v-list nav light class="pt-15 navCabinet">
        <v-list-item two-line v-if="$auth.user">
            <v-list-item-avatar height="80" width="80" v-if="$auth.user.avatar">
                <img :src="`/avatars/${$auth.user.avatar}`">
            </v-list-item-avatar>
            <v-list-item-avatar height="80" width="80" color="primary" v-else>
               <span class="white--text"> {{ getInitials($auth.user) }}</span>
            </v-list-item-avatar>
            <v-list-item-content>
                <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
            </v-list-item-content>
        </v-list-item>
        <v-list-item-group>
            <v-list-item color="primary" exact nuxt :to="`/${language.lang}/account`">
                <v-list-item-icon>
                    <v-icon color="primary">mdi-cog-box</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>My profile</v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                    <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
            </v-list-item>
            <v-list-item color="primary" exact nuxt :to="`/${language.lang}/account/orders`">
                <v-list-item-icon>
                    <v-icon color="primary">mdi-cash</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>My Orders</v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                    <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
            </v-list-item>
            <v-list-item color="primary" @click="logout()">
                <v-list-item-icon>
                    <v-icon color="primary">mdi-logout</v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                    <v-list-item-title>Logout</v-list-item-title>
                </v-list-item-content>
                <v-list-item-icon>
                    <v-icon>mdi-chevron-right</v-icon>
                </v-list-item-icon>
            </v-list-item>
        </v-list-item-group>
    </v-list>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    name: "nav-cabinet",
    computed: mapGetters({
        language: 'getLanguage',
    }),
    methods: {
        async logout() {
            await this.$auth.logout()
        },
        getInitials(user) {
            const name = user.name
            if (name) {
                const rgx = new RegExp(/(\p{L}{1})\p{L}+/, 'gu');
                let initials = [...name.matchAll(rgx)] || [];

                initials = (
                    (initials.shift()?.[1] || '') + (initials.pop()?.[1] || '')
                ).toUpperCase();

                return initials
            }
            return 'C'
        },
    }

}
</script>

<style lang="scss">
.navCabinet {
    display: none;
    max-width: 400px;
    padding-right: 30px;

    .pad {
        padding: 0;
    }

    .v-list-item {
        &__title,
        &__icon {
            font-size: 16px !important;
        }
    }
}

@media (min-width: 992px) {
    .navCabinet {
        display: block;

        .pad {
            padding: 0 15px;
        }
    }
}
</style>
