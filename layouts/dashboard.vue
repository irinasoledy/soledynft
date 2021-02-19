<template>
    <div id="appRoot" v-cloak>
        <template>
            <v-app id="inspire" class="app">
                <app-drawer class="app--drawer"></app-drawer>
                <app-toolbar class="app--toolbar"></app-toolbar>
                <v-main>
                    <!-- Page Header -->
                    <page-header></page-header>
                    <div class="page-wrapper">
                        <v-scroll-y-transition mode="out" hide-on-leave="true">
                            <nuxt/>
                        </v-scroll-y-transition>
                    </div>
                    <!-- App Footer -->
                    <v-footer height="auto" class="white pa-3 app--footer">
                        <span class="caption">&copy; {{ new Date().getFullYear() }}</span>
                        <v-spacer></v-spacer>
                        <span class="caption mr-1"> Made with love </span>
                        <v-icon color="pink" small>mdi-heart</v-icon>
                    </v-footer>
                </v-main>
                <!-- Go to top -->
            </v-app>
        </template>
        <v-snackbar
            :timeout="3000"
            bottom
            right
            :color="snackbar.color"
            v-model="snackbar.show"
            >
            {{ snackbar.text }}
            <v-btn dark text @click.native="snackbar.show = false" icon>
                <v-icon>mdi-close</v-icon>
            </v-btn>
        </v-snackbar>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    data: () => ({
        expanded: true,
        rightDrawer: false,
        snackbar: {
            show: false,
            text: '',
            color: '',
        }
    }),
    mounted(){
        this.boot()
    },
    computed: mapGetters({
        authUser: 'admin/getAuthUser'
    }),
    methods: {
        ...mapActions({
            'initApp' : 'admin/initApp'
        }),
        openThemeSettings() {
            this.$vuetify.goTo(0)
            this.rightDrawer = (!this.rightDrawer)
        },
        boot(){
            this.initApp()
        }
    }
}
</script>

<style scoped>

  .page-wrapper {
    min-height: calc(100vh - 64px - 50px - 81px);
    margin-bottom: 50px;
  }

  .app--footer {
    position: absolute;
    bottom: 0;
    width: 100%;
  }

  [v-cloak] {
  display: block;
  padding: 50px 0;

  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }

  &:before {
    content: '';
    box-sizing: border-box;
    position: absolute;
    top: 50%;
    left: 50%;
    width: 20px;
    height: 20px;
    margin-top: -10px;
    margin-left: -10px;
    border-radius: 50%;
    border: 2px solid #ccc;
    border-top-color: #333;
    animation: spinner .6s linear infinite;
    text-indent: 100%;
    white-space: nowrap;
    overflow: hidden;
  }

  & > div {
    display: none;
  }
}

</style>
