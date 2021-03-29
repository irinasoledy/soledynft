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
                        <span slot="badge">3</span>
                        <v-icon medium>mdi-bell</v-icon>
                    </v-badge>
                </v-btn>
            </template>
            <notification-list></notification-list>
        </v-menu>
        <v-menu offset-y origin="center center" :nudge-right="140" :nudge-bottom="10" transition="scale-transition">
            <template v-slot:activator="{on}">
                <v-btn icon large text v-on="on">
                    <v-avatar size="30px">
                        <img src="@/static/avatar/man_4.jpg" alt="Michael Wang"/>
                    </v-avatar>
                </v-btn>
            </template>
            <v-list class="pa-0">
                <v-list-item v-for="(item,index) in items" :to="!item.href ? { name: item.name } : null" :href="item.href"
                    @click="item.click" ripple="ripple" :disabled="item.disabled" :target="item.target" rel="noopener"
                    :key="index">
                    <v-list-item-action v-if="item.icon">
                        <v-icon>{{ item.icon }}</v-icon>
                    </v-list-item-action>
                    <v-list-item-content>
                        <v-list-item-title>{{ item.title }}</v-list-item-title>
                    </v-list-item-content>
                </v-list-item>
            </v-list>
        </v-menu>
    </v-app-bar>
</template>
<script>
  import NotificationList from '@/components/dashboard/widgets/list/NotificationList';
  import Util from '@/util';
  export default {
    name: 'app-toolbar',
    components: {
      NotificationList
    },
    data:  function () {
      return {
        items: [
          {
            icon: 'mdi-account-circle',
            href: '#',
            title: 'Profile',
            click: (e) => {
              console.log(e);
            }
          },
          {
            icon: 'mdi-cog',
            href: '#',
            title: 'Settings',
            click: (e) => {
              console.log(e);
            }
          },
          {
            icon: 'mdi-logout',
            href: '/back',
            title: 'Logout',
          }
        ],
      }
    },
    computed: {
      toolbarColor() {
        return this.$vuetify.options.extra.mainNav;
      }
    },
    methods: {
      toggleDrawer() {
        this.$store.commit('toggleDrawer')
      },
      handleFullScreen() {
        Util.toggleFullScreen();
      },
      handleLogout() {
        this.$router.push('/back');
      }
    }
  };
</script>

<style scoped>
  .v-app-bar {
    width: calc(100vw - 260px) !important;
    right: 0 !important;
    left: auto !important;
  }
</style>
