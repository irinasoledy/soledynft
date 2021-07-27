<template>
    <v-app>
        <Header />
        <v-main class="py-13">
            <nuxt />
        </v-main>
        <div v-if="$auth.loggedIn">
            <Chat mode="employee" :user="$auth.user"/>
            <Video mode="employee" :user="$auth.user"/>
            <Analytics type="client" :user="$auth.user"/>
        </div>

        <div v-else>
            <!-- <Chat mode="employee" :user="user"/>
            <Video mode="employee" :user="user"/> -->
            <AuthenticationForm :user="user"/>
            <Analytics type="client" :user="user"/>
        </div>
        <Footer />

    </v-app>
    <!-- <v-app id="root">
        <NavComponent/>
        <nuxt/>
        <Footer/>
    </v-app> -->
</template>

<script>

import {mapActions, mapGetters} from "vuex"
// import NavComponent from '@/components/front/partials/header';
import Header from '@/components/front/partials/header';
import Footer from '@/components/front/partials/footer';
import Chat from '@/components/chat-module/chat';
import Video from '@/components/chat-module/video';
import Analytics from '@/components/analytics';

export default {
    data: () => ({
        userJoined: false,
        counter: 0,
        dialog: false,
    }),
    computed: mapGetters({
        user: 'chat/getUser',
        call: 'call/getCall',
        roomId: 'call/getRoomId',
    }),
    components: {
        Header,
        Footer,
        Chat,
        Video,
        Analytics
    }
};
</script>

<style lang="scss">
  a {
    text-decoration: none;
  }
  .v-application .v-btn.body {
    border: 1px solid $main-color !important;
    color: $red-color !important;
    border-radius: 0 !important;
  }
  .v-btn {
    border-radius: 0 !important;
  }
  body,
  .theme--light.v-application {
    background: $bcg-body !important;
  }
</style>
