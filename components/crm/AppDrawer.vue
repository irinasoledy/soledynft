<template>
    <v-navigation-drawer
        id="appDrawer"
        :mini-variant.sync="mini"
        fixed
        :dark="$vuetify.dark"
        app
        v-model="drawer"
        width="260"
        >
        <v-toolbar color="primary darken-1" class="crm-logo-wrapper" dark>
            <img src="/logo-docrom4.png" class="crm-logo">
        </v-toolbar>
        <v-list dense expand>

            <!-- <template v-for="(item, i) in menus">
                <v-list-item :to="item.href ? item.href : null" ripple="ripple" rel="noopener">
                    <v-list-item-action v-if="item.icon">
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }} </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template> -->

            <template>
                <v-list-item to="/crm/dashboard" ripple="ripple" rel="noopener">
                    <v-list-item-action><v-icon>mdi-speedometer</v-icon></v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Dashboard </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>

            <template v-if="user.type !== 'employee'">
                <v-list-item to="/crm/employees" ripple="ripple" rel="noopener">
                    <v-list-item-action><v-icon>mdi-account-multiple</v-icon></v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Employees </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>

            <template v-if="user.type !== 'employee'">
                <v-list-item to="/crm/clients" ripple="ripple" rel="noopener">
                    <v-list-item-action><v-icon>mdi-account-multiple-outline</v-icon></v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Clients </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>

            <template v-if="user.type === 'employee'">
                <v-list-item to="/crm/clients/my-clients" ripple="ripple" rel="noopener">
                    <v-list-item-action><v-icon>mdi-account-multiple-plus</v-icon></v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>My Clients </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>

            <template v-if="user.type === 'employee'">
                <v-list-item to="/crm/clients/not-assigned" ripple="ripple" rel="noopener">
                    <v-list-item-action><v-icon>mdi-account-multiple-outline</v-icon></v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>Not Assigned Clients </v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </template>

        </v-list>
    </v-navigation-drawer>
</template>

<script>

import menu from '@/util/menu';

export default {
    name: 'app-drawer',
    props: {
        expanded: {
            type: Boolean,
            default: true
        },
        user: {
            type: Object,
        }
    },
    data: () => ({
        mini: false,
        menus: menu,
        scrollSettings: {
            maxScrollbarLength: 160
        }
    }),
    computed: {
        drawer: {
            get() {
                return this.$store.state.drawer
            },
            set(val) {
                this.$store.commit('drawer', val)
            }
        },
        computeGroupActive() {
            return true;
        },
        sideToolbarColor() {
            return this.$vuetify.options.extra.sideNav;
        }
    },
    methods: {
        genChildTarget(item, subItem) {
            if (subItem.href) return;
            if (subItem.component) {
                return {
                    name: subItem.component,
                };
            }
            return {name: `${item.group}/${(subItem.name)}`};
        },
    }
}
</script>

<style lang="scss">
    #appDrawer {
        overflow: hidden;
        .drawer-menu--scroll {
            height: calc(100vh - 48px);
            overflow: auto;
        }
    }
    .crm-logo-wrapper{
        justify-content: center;
    }
    .crm-logo {
        width: 60%;
        margin: 0 auto;
    }
    .v-application--is-ltr .v-list-item__action:first-child, .v-application--is-ltr .v-list-item__icon:first-child{
        margin-right: 12px;
    }
</style>
