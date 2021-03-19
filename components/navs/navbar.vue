<template>
    <v-card class="overflow-hidden">
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
                        <v-list-item-content to="/">
                            <img height="40" src="@/static/logo-docrom4.png" alt="" class="logo-burgher">
                        </v-list-item-content>
                        <v-list-item-icon @click="drawer = false" >
                            <v-icon>mdi-close</v-icon>
                        </v-list-item-icon>
                    </v-list-item>
                </v-sheet>
                <contacts></contacts>



                <v-list
                    nav
                    light
                    >
                    <v-list-item-group>
                        <v-list-item @click="closeMenu(`/`)">
                            <v-list-item-title>{{ trans.PageNames.home }}</v-list-item-title>
                        </v-list-item>

                        <v-list-item v-for="(item, i) in drawerItems" :key="i" nuxt :to="item.href">
                            <v-list-item-title v-if="item.action" v-text="item.title" @click.stop="openServices"></v-list-item-title>
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
                        <v-btn color="secondary" outlined block>
                            Cabinet
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
                        <v-list-item-icon >
                            <v-icon >mdi-chevron-left</v-icon>
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
                        <v-list-item v-for="service in servicesList" :key="service.identifier" @click.stop="openSubservices(service)">
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
                        <v-list-item-icon >
                            <v-icon >mdi-chevron-left</v-icon>
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
                        <v-list-item @click="closeMenu(`/${language.lang}/services/list/${service.id}`)" v-for="(service, i) in subserviceIdentifier" :key="i">
                            <v-list-item-title v-text="service.translation.name"></v-list-item-title>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
            <v-spacer></v-spacer>
            <v-toolbar-title to="/">
                <img class="logo" src="@/static/logo-docrom4.png" alt="">
            </v-toolbar-title>



            <v-spacer></v-spacer>
            <v-btn icon @click.stop="cabinetDrawer = !cabinetDrawer">
                <v-icon dark>mdi-account</v-icon>
            </v-btn>



            <v-navigation-drawer
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
                            <v-list-item-title>
                                Profilul meu
                            </v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                </v-app-bar>



                <v-list nav light class="pt-15">
                    <v-list-item two-line>
                        <v-list-item-avatar height="80" width="80">
                            <img src="https://randomuser.me/api/portraits/women/81.jpg">
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title>Jane Smith</v-list-item-title>
                        </v-list-item-content>
                    </v-list-item>
                    <v-list-item-group>
                        <v-list-item-subtitle>
                            Setări
                        </v-list-item-subtitle>
                        <v-list-item color="primary" exact to="/cabinet/personal-info" nuxt>
                            <v-list-item-icon>
                                <v-icon x-large color="primary">mdi-cog-box</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Profilul meu și setări</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon x-large>mdi-chevron-right</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        <v-list-item color="primary" to="/cabinet/photo" exact nuxt>
                            <v-list-item-icon>
                                <v-icon x-large color="primary">mdi-camera</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Pozele mele</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon x-large>mdi-chevron-right</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        <v-list-item color="primary" nuxt exact to="/cabinet/subscribes">
                            <v-list-item-icon>
                                <v-icon x-large color="primary">mdi-format-list-bulleted</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Eu urmăresc</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon x-large>mdi-chevron-right</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        <v-list-item-subtitle>
                            Contul personal
                        </v-list-item-subtitle>
                        <v-list-item color="primary">
                            <v-list-item-icon>
                                <v-icon x-large color="primary">mdi-cash</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Comenzile mele</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon x-large>mdi-chevron-right</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        <v-list-item color="primary">
                            <v-list-item-icon>
                                <v-icon x-large color="primary">mdi-receipt</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Invoice</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon x-large>mdi-chevron-right</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        <v-list-item-subtitle>
                            Alte funcții
                        </v-list-item-subtitle>
                        <v-list-item color="primary">
                            <v-list-item-icon>
                                <v-icon x-large color="primary">mdi-help-box</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Ajutor</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon x-large>mdi-chevron-right</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                        <v-list-item color="primary">
                            <v-list-item-icon>
                                <v-icon x-large color="primary">mdi-logout</v-icon>
                            </v-list-item-icon>
                            <v-list-item-content>
                                <v-list-item-title>Ieși</v-list-item-title>
                            </v-list-item-content>
                            <v-list-item-icon>
                                <v-icon x-large>mdi-chevron-right</v-icon>
                            </v-list-item-icon>
                        </v-list-item>
                    </v-list-item-group>
                </v-list>
            </v-navigation-drawer>
        </v-app-bar>








        <v-app-bar
            v-if="user.policy"
            dark
            color="primary"
            fixed
            bottom
            grow
            height="auto"
            >

            <PolicyBar v-if="!user.policy.length"/>

            <!-- <v-btn x-small>
                <v-icon>mdi-home</v-icon>
            </v-btn>
            <v-btn x-small>
                <v-icon>mdi-email</v-icon>
            </v-btn>
            <v-btn x-small>
                <v-icon>mdi-phone</v-icon>
            </v-btn>
            <v-btn x-small>
                <v-icon>mdi-magnify</v-icon>
            </v-btn>
            <v-btn x-small>
                <v-icon>mdi-view-list</v-icon>
            </v-btn> -->
        </v-app-bar>




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
                            <img width="180" class="logo" src="@/static/logo-docrom4.png" alt="">
                        </v-toolbar-title>
                    </v-col>
                    <v-col class="col-auto">
                        <v-row class="align-center">
                            <v-col>
                                <v-list-item dark color="primary" href="tel:+37378563423">
                                    <v-icon>mdi-phone</v-icon>
                                    +37378563423
                                </v-list-item>
                            </v-col>
                            <v-col>
                                <v-hover v-slot="{hover}">
                                    <v-list-item color="primary">
                                        <v-icon dark>mdi-account</v-icon>
                                        Iov Albu
                                        <v-expand-transition>
                                            <v-list v-if="hover" width="250" class="transition-fast-in-fast-out cabinetDesk">
                                                <v-list-item nuxt to="/cabinet/personal-info" exact>
                                                    <v-list-item-subtitle>
                                                        Cabinet Personal
                                                    </v-list-item-subtitle>
                                                </v-list-item>
                                                <v-list-item nuxt to="/cabinet/orders">
                                                    <v-list-item-subtitle>
                                                        Comenzile Mele
                                                    </v-list-item-subtitle>
                                                </v-list-item>
                                                <v-list-item nuxt to="/cabinet/photo">
                                                    <v-list-item-subtitle>
                                                        Pozele mele
                                                    </v-list-item-subtitle>
                                                </v-list-item>
                                                <v-list-item nuxt to="/cabinet/subscribes">
                                                    <v-list-item-subtitle>
                                                        Eu urmăresc
                                                    </v-list-item-subtitle>
                                                </v-list-item>
                                                <v-list-item nuxt to="#">
                                                    <v-list-item-subtitle>
                                                        Mesaje
                                                    </v-list-item-subtitle>
                                                </v-list-item>
                                                <v-list-item nuxt to="#">
                                                    <v-list-item-subtitle>
                                                        Notificări
                                                    </v-list-item-subtitle>
                                                </v-list-item>
                                                <v-list-item nuxt to="#">
                                                    <v-list-item-subtitle>
                                                        Convorbiri
                                                    </v-list-item-subtitle>
                                                </v-list-item>
                                            </v-list>
                                        </v-expand-transition>
                                    </v-list-item>
                                </v-hover>
                            </v-col>
                        </v-row>
                    </v-col>
                </v-row>
                <v-row class="justify-space-between align-center" height="43">
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
                                                    v-if="item.children.length"
                                                    :to="`/${language.lang}/services/${item.id}`"
                                                    >
                                                    <v-list-item-title>
                                                        {{item.translation.name}}
                                                    </v-list-item-title>
                                                    <v-expand-transition>
                                                        <v-list v-if="hover && item.children.length" light elevation="4" text class="subservicesHover transition-fast-in-fast-out"
                                                            style="height: auto; width: auto">
                                                            <v-list-item v-for="(child, i) in item.children"
                                                                :key="i"
                                                                active-class="accent"
                                                                color="secondary"
                                                                :to="`/${language.lang}/services/list/${child.id}`">
                                                                <v-list-item-title>
                                                                    {{child.translation.name}}
                                                                </v-list-item-title>
                                                            </v-list-item>
                                                        </v-list>
                                                    </v-expand-transition>
                                                </v-list-item>
                                                <v-list-item v-else :to="`/${language.lang}/services/list/${item.id}`">
                                                    <v-list-item-title>
                                                        {{item.translation.name}}
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
                                    {{ trans.PageNames.ourTeam }}
                                </v-list-item-title>
                            </v-list-item>
                            <v-list-item height="43" nuxt exact :to="`/${language.lang}/contacts/`">
                                <v-list-item-title>
                                    {{ trans.PageNames.contacts }}
                                </v-list-item-title>
                            </v-list-item>
                        </v-list>
                    </v-col>
                    <v-col cols="auto" class="d-flex align-center">
                        <v-select
                            class="selectHeader"
                            :items="languages"
                            item-text="lang"
                            item-value="id"
                            :label="language.lang"
                            solo
                            flat
                            background-color="primary"
                            dark
                            color="primary"
                            @change="changeLang"
                            ></v-select>
                        <v-btn color="secondary" @click="$nuxt.$emit('open-appointment-form')">
                            <v-icon>
                                mdi-book
                            </v-icon>
                            {{ trans.ContactsAndForms.graficLucruButton }}
                        </v-btn>
                    </v-col>
                </v-row>
            </v-container>
        </v-app-bar>
    </v-card>
</template>

<script>
  import Contacts from './contacts';
  import PolicyBar from '../policy/PolicyBar';
  import { mapGetters, mapActions } from 'vuex'

  export default {
    components: {
        Contacts, PolicyBar
    },
    computed: mapGetters({
        servicesList: 'getServices',
        languages: 'getLanguages',
        language: 'getLanguage',
        trans: 'getTranslations',
        user: 'chat/getUser',
    }),
    data: () => ({
      servicesDesk: false,
      drawer: false,
      services: false,
      subservices: false,
      cabinetDrawer: false,
      subserviceIdentifier: [ ],
      langs: ["RO", "EN", "RU"],
      group: null,
      drawerItems: [

        {
          title: "Servicii",
          icon: "mdi-arrow-right-drop-circle-outline",
          action: true
        },
      ],
      servicesItems: [
        {

          title: "Cetățenie Română",
          identifier: "cetro",
          subservices: [
            "Depunerea actelor pentru redobândirea cetățeniei",
            "Depunerea Jurămîntului",
            "Obținerea CI",
            "Obținerea Pașaport Străin Ro",
            "Alocații pentru copiii cu cetățenie Română",
            "Transcriirea unui certificat de naștere românesc / certificat de căsătorie",
            "Aplicarea mențiunii de încetare a căsătoriei sau de deces în România.",
            "Rectificarea actelor de stare civilă românești",
            "Reîntregirea familieii",
            "Înregistrarea căsătorii în străinătate pentru cetățenii moldoveni",
            "Înregistrarea căsătorii în străinătate pentru cetățenii români",
            "Echivalarea diplomei",
          ]
        },
        {
          title: "Permis de ședere",
          identifier: "permsed",
          subservices: [
            "Obținerea Permisului de ședere Ro",
            "Prelungirea Permisului de ședere Ro",
          ]
        },
        {
          title: "Permis de muncă",
          identifier: "permmun",
          subservices: [
          ]
        },
        {
          title: "Permis de Conducere",
          identifier: "permcon",
          subservices: [
            "Schimbul Permisului de Conducere Ro",
            "Prelungirea validității Permisului de Conducere Ro",
            "Restabilirea Permisului de Conducere Ro",
          ]
        },
        {
          title: "Obținerea alte acte/ certificate Ro",
          identifier: "obtact",
          subservices: [
            "Certificat de cazier judiciar",
          ]
        },
        {
          title: "Alte Servicii",
          identifier: "other",
          subservices: [
            "Apostilare Documente",
            "Traducere Documente",
            "Transport",
          ]
        },
      ],
      cabinetItems: [
        {
          text: "",
          icon: ""
        },
        {
          text: "",
          icon: ""
        },
        {
          text: "",
          icon: ""
        },
        {
          text: "Comenzile mele",
          icon: ""
        },
        {
          text: "Invoices",
          icon: ""
        },
        {
          text: "Ajutor",
          icon: ""
        },
        {
          text: "Ieși",
          icon: ""
        },
      ]
    }),
    methods: {
        ...mapActions(['changeLanguage']),
        changeLang(select){
            this.changeLanguage(select)
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
        const arr = this.servicesList.find(x => x.id === service.id);
        this.subserviceIdentifier = arr.children;
        this.subservices = true
        if (!service.children.length) {
            this.closeMenu(`/${this.language.lang}/services/list/${service.id}`)
        }
      }
    },
  }
</script>

<style lang="scss">
.v-select__selections{
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
    .logo-burgher{
        flex: 0;
        margin: 0 auto;
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
</style>
