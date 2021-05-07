<template>
    <v-app id="root">
        <NavComponent />
        <nuxt />

        <div v-if="$auth.loggedIn">
<!--            <Chat mode="employee" :user="$auth.user"/>-->
<!--            <Video mode="employee" :user="$auth.user"/>-->
        </div>

        <div v-else>
            <Chat mode="employee" :user="user"/>
            <Video mode="employee" :user="user"/>
            <AuthenticationForm :user="user"/>
        </div>

        <Footer />
    </v-app>
</template>

<script>

import { mapActions, mapGetters } from "vuex"
import NavComponent from '@/components/front/partials/header';
import Footer from '@/components/front/partials/footer';
import Chat from '@/components/chat-module/chat';
import Video from '@/components/chat-module/video';
import AuthenticationForm from '@/components/front/forms/AuthenticationForm.vue';

export default {
    data: () => ({
        userJoined: false,
        counter: 0,
        dialog: false,
    }),
    computed: mapGetters({
        user: 'chat/getUser',
        call : 'call/getCall',
        roomId : 'call/getRoomId',
    }),
    components: {
        NavComponent,
        Footer,
        Chat,
        Video
    }
};
</script>
