<template>
    <v-card class="overflow-hidden">

        <!-- Mobile bar -->
        <v-app-bar
            class="customBar mobile"
            fixed
            color="primary"
            elevate-on-scroll
            dark
        >
            <v-app-bar-nav-icon @click.stop="drawer = true"></v-app-bar-nav-icon>
            <v-navigation-drawer
                class="navdrawer"
                v-model="drawer"
                absolute
                left
                temporary
                light
                stateless
                max-height="100vh"
            >
                <v-sheet color="primary" dark>
                    <v-list-item>
                        <v-list-item-content>
                            <nuxt-link to="/">
                                <img height="40" src="@/static/logo-docrom4.png" alt="" class="logo-burgher">
                            </nuxt-link>
                        </v-list-item-content>
                        <v-list-item-icon @click="drawer = false">
                            <v-icon>mdi-close</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-sheet>
                <headerContacts></headerContacts>
                <v-list
                    nav
                    light
                >
                    <v-list-item-group>
                        <v-list-item @click="closeMenu(`/`)">
                            <v-list-item-title>{{ trans.PageNames.home }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item v-for="(item, i) in drawerItems" :key="i" nuxt :to="item.href">
                            <v-list-item-title v-if="item.action" v-text="item.title"
                                               @click.stop="openServices"></v-list-item-title>
                            <v-list-item-title v-else v-text="item.title"></v-list-item-title>
                            <v-list-item-icon>
                                <v-icon v-text="item.icon"></v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        <v-list-item @click="closeMenu(`/${language.lang}/about/`)">
                            <v-list-item-title>{{ trans.PageNames.about }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="closeMenu(`/${language.lang}/experts/`)">
                            <v-list-item-title>{{ trans.PageNames.ourTeam }}</v-list-item-title>
                        </v-list-item>
                        <v-list-item @click="closeMenu(`/${language.lang}/contacts/`)">
                            <v-list-item-title>{{ trans.PageNames.contacts }}</v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
                <template v-slot:append>
                    <div class="pa-2 mb-4">
                        <v-btn color="secondary" outlined block v-if="!$auth.loggedIn"
                               @click="$nuxt.$emit('openLoginDialog')">
                            sign in
                        </v-btn>
                        <v-btn color="secondary" outlined block v-else @click.stop="cabinetDrawer = !cabinetDrawer">
                            Profile
                        </v-btn>
                    </div>
                </template>
            </v-navigation-drawer>

            <v-navigation-drawer
                class="navdrawer"
                v-model="services"
                absolute
                left
                temporary
                light
                stateless
            >
                <v-sheet color="primary" dark>
                    <v-list-item @click="closeServices">
                        <v-list-item-icon>
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-subtitle>
                                Înapoi
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-sheet>
                <v-list nav light>
                    <v-list-item-group>
                        <v-list-item v-for="service in servicesList" :key="service.id"
                                     @click.stop="openSubservices(service)">
                            <v-list-item-title v-text="service.translation.name"></v-list-item-title>
                            <v-list-item-icon v-if="service.children.length">
                                <v-icon>
                                    mdi-arrow-right-drop-circle-outline
                                </v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>

            <v-navigation-drawer
                class="navdrawer"
                v-model="subservices"
                absolute
                left
                temporary
                light
            >
                <v-sheet color="primary" dark>
                    <v-list-item @click="closeSubservices">
                        <v-list-item-icon>
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-subtitle>
                                Înapoi
                            </v-list-item-subtitle>
                        </v-list-item-content>
                    </v-list-item>
                </v-sheet>
                <v-list nav light>
                    <v-list-item-group>
                        <v-list-item
                            v-if="serviceIdentifier"
                            @click="closeMenu(`/${language.lang}/service/${serviceIdentifier.alias}`)">
                            <v-list-item-title
                                font-weight-bold
                                class="mobile-burgher-first-element"
                                v-text="serviceIdentifier.translation.name">
                            </v-list-item-title>
                        </v-list-item>
                        <v-list-item
                            @click="closeMenu(`/${language.lang}/service/${serviceIdentifier.alias}/${service.alias}`)"
                            v-for="(service, i) in subserviceIdentifier"
                            :key="i">
                            <v-list-item-title v-text="service.translation.name"></v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>

            <v-spacer></v-spacer>

            <v-toolbar-title>
                <nuxt-link to="/">
                    <img class="logo" src="@/static/logo-docrom4.png" alt="">
                </nuxt-link>
            </v-toolbar-title>
            <v-spacer></v-spacer>

            <CartIcon v-if="$auth.loggedIn"
                      :user="$auth.user"
            ></CartIcon>

            <v-icon dark @click.stop="cabinetDrawer = !cabinetDrawer" v-if="$auth.loggedIn">
                mdi-account
            </v-icon>

            <v-btn icon @click="$nuxt.$emit('openLoginDialog')" v-else>
                <v-icon dark>mdi-account</v-icon>
            </v-btn>

            <v-navigation-drawer
                v-if="$auth.loggedIn"
                class="navdrawer"
                v-model="cabinetDrawer"
                absolute
                right
                temporary
                light
            >
                <v-app-bar
                    fixed
                    color="primary"
                    elevate-on-scroll
                    dark>
                    <v-list-item>
                        <v-list-item-icon @click="cabinetDrawer = false">
                            <v-icon>mdi-chevron-left</v-icon>
                        </v-list-item-icon>
                        <v-list-item-content>
                            <v-list-item-title>My profile</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-app-bar>

                <v-list nav light class="pt-15">
                    <v-list-item two-line>
                        <v-list-item-avatar height="80" width="80" v-if="$auth.user.avatar">
                            <img :src="`/avatars/${$auth.user.avatar}`">
                        </v-list-item-avatar>
                        <v-list-item-avatar height="80" width="80" color="primary" v-else>
                            <span class="white--text">{{ getInitials($auth.user) }}</span>
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>{{ $auth.user.name }}</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item-group>
                        <v-list-item color="primary" exact :to="`/${language.lang}/account`" nuxt>
                            <v-list-item-icon>
                                <v-icon x-large color="primary">mdi-cog-box</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>My profile</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item color="primary" nuxt exact :to="`/${language.lang}/account/orders`">
                            <v-list-item-icon>
                                <v-icon x-large color="primary">mdi-cash</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>My Orders</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                        <v-list-item color="primary" @click="logout()">
                            <v-list-item-icon>
                                <v-icon color="primary">mdi-logout</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Logout</v-list-item-title>
                            </v-list-item-content>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
        </v-app-bar>

        <!-- Desktop bar -->
        <v-app-bar class="customBar desktop"
                   fixed
                   color="primary"
                   elevate-on-scroll
                   shrink-on-scroll
                   prominent
                   dark
                   height="auto">
            <v-container>
                <v-row class="justify-space-between align-center" max-height="80">
                    <v-col class="col-auto">
                        <v-toolbar-title to="/">
                            <nuxt-link to="/">
                                <img width="180" class="logo" src="@/static/logo-docrom4.png" alt="">
                            </nuxt-link>
                        </v-toolbar-title>
                    </v-col>
                    <v-col class="col-auto">
                        <v-list dark color="primary" class="d-flex align-center" height="43">
                            <v-list-item height="43" exact nuxt to="/">
                                <v-list-item-title>
                                    {{ trans.PageNames.home }}
                                </v-list-item-title>
                            </v-list-item>
                            <v-hover v-slot="{hover}">
                                <v-list-item exact nuxt>
                                    <v-list-item-title>
                                        {{ trans.PageNames.ourServices }}
                                    </v-list-item-title>
                                    <v-icon>mdi-chevron-down</v-icon>
                                    <v-expand-transition>
                                        <v-list
                                            dark
                                            color="primary"
                                            v-if="hover"
                                            class="mandat transition-fast-in-fast-out"
                                            style="height: auto; width: auto"
                                        >
                                            <v-hover v-slot="{hover}" v-for="(item, i) in servicesList" :key="i">
                                                <v-list-item
                                                    v-if="item.subcategories.length"
                                                    :to="`/${language.lang}/service/${item.alias}`"
                                                >
                                                    <v-list-item-title>
                                                        {{ item.translation.name }}
                                                    </v-list-item-title>
                                                    <v-expand-transition>
                                                        <v-list v-if="hover && item.subcategories.length > 0" light elevation="4"
                                                                text
                                                                class="subservicesHover transition-fast-in-fast-out"
                                                                style="height: auto; width: auto">
                                                            <v-list-item v-for="(child, i) in item.subcategories"
                                                                         :key="i"
                                                                         :to="`/${language.lang}/service/${item.alias}/${child.alias}`">
                                                                <v-list-item-title>
                                                                    {{ child.translation.name }}
                                                                </v-list-item-title>
                                                            </v-list-item>
                                                        </v-list>
                                                    </v-expand-transition>
                                                </v-list-item>
                                                <v-list-item v-else
                                                             :to="`/${language.lang}/service/${item.alias}/${item.alias}`">
                                                    <v-list-item-title>
                                                        {{ item.translation.name }}
                                                    </v-list-item-title>
                                                </v-list-item>
                                            </v-hover>
                                        </v-list>
                                    </v-expand-transition>
                                </v-list-item>
                            </v-hover>
                            <v-list-item height="43" exact nuxt :to="`/${language.lang}/about/`">
                                <v-list-item-title>
                                    {{ trans.PageNames.about }}
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item height="43" nuxt exact :to="`/${language.lang}/experts/`">
                                <v-list-item-title>
                                    Portfolio
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item height="43" nuxt exact :to="`/${language.lang}/contacts/`">
                                <v-list-item-title>
                                    {{ trans.PageNames.contacts }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col class="col-auto">
                        <v-row class="align-center">
                            <v-col cols="auto" class="d-flex align-center">
                                <v-select
                                    class="selectHeader"
                                    :items="languages"
                                    :label="language.name"
                                    @change="changeLang"
                                    item-text="name"
                                    item-value="id"
                                    color="primary"
                                    background-color="primary"
                                    solo
                                    flat
                                    dark
                                ></v-select>
                            </v-col>
                            <v-col class="text-right col-md-1">
                                <CartIcon v-if="$auth.loggedIn"
                                          :user="$auth.user"
                                ></CartIcon>
                            </v-col>
                            <v-col class="account-header-area">
                                <v-hover v-slot="{hover}">
                                    <v-list-item color="primary">
                                        <!-- sign in -->
                                        <span class="sign-in-btn" v-if="!$auth.loggedIn"
                                              @click="$nuxt.$emit('openLoginDialog')">
                                            <v-icon dark>mdi-account</v-icon>
                                            Sign In
                                        </span>
                                        <span v-else>
                                        <v-icon dark>mdi-account</v-icon>
                                        {{ $auth.user.name }}
                                        <v-expand-transition>
                                            <v-list v-if="hover" width="250"
                                                    class="transition-fast-in-fast-out cabinetDesk">
                                                <v-list-item nuxt :to="`/${language.lang}/account`" exact>
                                                    <v-list-item-subtitle>
                                                        Profile
                                                    </v-list-item-subtitle>
                                                </v-list-item>
                                                <v-list-item nuxt :to="`/${language.lang}/account/orders`">
                                                    <v-list-item-subtitle>
                                                        Orders
                                                    </v-list-item-subtitle>
                                                </v-list-item>
                                                <v-list-item @click="logout()">
                                                    <v-list-item-subtitle>
                                                        Logout
                                                    </v-list-item-subtitle>
                                                </v-list-item>
                                            </v-list>
                                        </v-expand-transition>
                                    </span>
                                    </v-list-item>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>

        <!-- Policy bar -->
        <v-app-bar
            v-if="user.policy"
            dark
            fixed
            bottom
            grow
            height="auto"
            class="policy-container"
        >
            <PolicyBar v-if="!user.policy.length"/>
        </v-app-bar>

    </v-card>
</template>

<script>

import {mapGetters, mapActions} from 'vuex'
import HeaderContacts from '@/components/front/widgets/headerContactsWidget';
import PolicyBar from '@/components/front/policies/PolicyBar';
import CartIcon from '@/components/front/cart/cartIcon';

export default {
    data: () => ({
        servicesDesk: false,
        drawer: false,
        services: false,
        subservices: false,
        cabinetDrawer: false,
        serviceIdentifier: null,
        subserviceIdentifier: [],
        drawerItems: [{
            title: "Servicii",
            icon: "mdi-arrow-right-drop-circle-outline",
            action: true
        }],
    }),
    computed: mapGetters({
        servicesList: 'getServices',
        languages: 'getLanguages',
        language: 'getLanguage',
        trans: 'getTranslations',
        user: 'chat/getUser',
    }),
    methods: {
        ...mapActions(['changeLanguage']),
        openLoginDialg() {
            this.$nuxt.$emit('openLoginDialog');
        },
        async logout() {
            await this.$auth.logout()
        },
        changeLang(select) {
            this.changeLanguage(select).then(data => {
                const currentLang = '/' + this.language.lang
                const lastLang = this.$route.params.lang
                const fullPath = this.$route.fullPath
                let redirectTo = '/'

                if (lastLang) {
                    redirectTo = fullPath.replace('/' + lastLang, currentLang);
                } else {
                    redirectTo = currentLang;
                }
                this.$router.push(redirectTo)
            })
        },
        closeMenu(url) {
            this.services = false
            this.drawer = false
            this.subservices = false
            this.$router.push(url)
        },
        closeServices() {
            this.services = false
        },
        openServices() {
            this.services = true
        },
        closeSubservices() {
            this.subservices = false
        },
        openSubservices(service) {
            const findService = this.servicesList.find(x => x.id === service.id);
            this.serviceIdentifier = findService
            this.subserviceIdentifier = findService.children;
            this.subservices = true
            if (!service.children.length) {
                this.closeMenu(`/${this.language.lang}/service/${service.alias}`)
            }
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
    },
    components: {
        HeaderContacts, PolicyBar, CartIcon
    },
}
</script>

<style lang="scss">
.v-select__selections {
    min-width: 25px;
}

.mandat,
.cabinetDesk {
    background-color: #ffffff;
    top: 100%;
    left: 0;
    opacity: 1;
    position: absolute;
    width: 100%;
    z-index: 2;
}

.subservicesHover {
    background-color: #ffffff;
    top: 0;
    left: 100%;
    opacity: 1;
    position: absolute;
    width: 100%;
}

.customBar {
    .navdrawer {
        height: 100vh !important;
        width: 100vw !important;
        max-width: 400px;
        top: 0 !important;
        left: 0 !important;
    }

    .logo {
        width: 120px;
        height: 40px;
        margin-top: 10px;
    }

    .close {
        position: absolute;
        right: 20px;
        top: 20px;
        z-index: 1;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
}

.customBar.desktop {
    display: none;
}

@media (max-width: 991px) {
    .logo {
        width: auto !important;
    }
    .logo-burgher {
        flex: 0;
        margin: 0 auto;
    }
    .v-list-item__title, .v-list-item__subtitle {
        white-space: normal !important
    }
}

@media (min-width: 991px) {
    .customBar.mobile,
    .customBar .v-bottom-navigation {
        display: none !important;
    }
    .customBar.desktop {
        display: block;

        .selectHeader {
            width: 70px;
            height: 48px;
            margin-bottom: 0;
        }

        .logo {
            width: 200px;
            height: auto;
            margin-top: 0;
            margin: 10px 0;
        }

        .col {
            padding-top: 0;
            padding-bottom: 0;
        }
    }
}

.v-app-bar.v-app-bar--fixed {
    top: auto !important;
}

.v-app-bar {
    top: auto !important;
}

.policy-container {
    background-color: rgba(41, 55, 84, 0.95) !important
}

.mobile-burgher-first-element {
    font-weight: bold !important;
}

.active-link {
    color: #FFF;
}

.sign-in-btn {
    cursor: pointer;
}

.account-header-area {
    width: 271px;
}

</style>
