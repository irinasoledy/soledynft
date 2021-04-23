<template>
    <v-app-bar
        color="primary"
        fixed
        dark
        >
        <v-app-bar-nav-icon @click.stop="toggleDrawer()"></v-app-bar-nav-icon>
        </v-text-field>
        <v-spacer></v-spacer>
        <v-btn icon @click="handleFullScreen()">
            <v-icon>mdi-fullscreen</v-icon>
        </v-btn>
        <v-menu offset-y origin="center center" class="elelvation-1" :nudge-right="140" :nudge-bottom="14" transition="scale-transition">
            <template v-slot:activator="{ on, attrs }">
                <v-btn
                    v-bind="attrs"
                    v-on="on"
                    icon
                    text
                    >
                    <v-badge color="red" overlap>
                        <span slot="badge">1</span>
                        <v-icon medium>mdi-bell</v-icon>
                    </v-badge>
                </v-btn>
            </template>
            <notification-list></notification-list>
        </v-menu>
        <v-menu offset-y origin="center center" :nudge-right="140" :nudge-bottom="10" transition="scale-transition">
            <template v-slot:activator="{on}">
                <v-btn icon large text v-on="on">
                    <v-avatar size="30px" v-if="user.avatar">
                        <img :src="`/avatars/${user.avatar}`"/>
                    </v-avatar>
                    <v-avatar size="30" v-else dark color="info">
                        {{ user.name.charAt(0) }}
                    </v-avatar>
                </v-btn>
            </template>
            <v-list class="pa-0">

                <v-list-item ripple="ripple"
                        :to="`/crm/employees/edit/profile`"
                        v-if="authUser.type !== 'employee'">
                    <v-list-item-action>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Profile</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item ripple="ripple"
                        :to="`/crm/employees/edit/operators/${authUser._id}`" 
                        v-if="authUser.type === 'employee'">
                    <v-list-item-action>
                        <v-icon>mdi-account</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Profile</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

                <v-list-item ripple="ripple" @click="logout()">
                    <v-list-item-action>
                        <v-icon>mdi-logout</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Logout</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>

            </v-list>
        </v-menu>
    </v-app-bar>
</template>

<script>

import { mapGetters, mapActions } from "vuex"
import NotificationList from '@/components/crm/widgets/list/NotificationList';
import Util from '@/util';

export default {
    name: 'app-toolbar',
    components: {
        NotificationList
    },
    props: ['authUser'],
    data: function () {
        return {}
    },
    computed: mapGetters({
        user: 'authCRM/getUser',
    }),
    methods: {
        ...mapActions({
            resetAuth: 'authCRM/reset',
        }),
        toggleDrawer() {
            this.$store.commit('toggleDrawer')
        },
        handleFullScreen() {
            Util.toggleFullScreen();
        },
        async logout() {
            await this.$cookies.remove('crm-token')
            this.$router.push('/crm')
            // this.resetAuth()
        },
    }
}
</script>

<style scoped>
    .v-app-bar {
        width: calc(100vw - 260px) !important;
        right: 0 !important;
        left: auto !important;
    }
</style>
