<template>
    <v-app id="root">
        <NavComponent></NavComponent>
        <nuxt />

        <Chat mode="employee"/>
        <Video mode="employee"/>

        <Footer />
        <v-dialog
            v-model="dialog"
            persistent
            max-width="290"
            >
            <v-card
                color="primary"
                dark
                >
                <v-card-text>
                    Incoming call from...
                    <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                        ></v-progress-linear>
                </v-card-text>
                <v-card-text class="text-center">
                    <h3>Employee calling... </h3>
                    <h4>Room ID  {{ roomId }}</h4>
                </v-card-text>
                <!-- <div class="text-center">
                    <v-btn
                        @click="rejectCall"
                        class="mx-2"
                        fab
                        dark
                        large
                        color="red"
                        >
                        <v-icon dark>
                            mdi-phone-hangup
                        </v-icon>
                    </v-btn>
                    <v-btn
                        @click="responseCall"
                        class="mx-2"
                        fab
                        dark
                        large
                        color="green"
                        >
                        <v-icon dark>
                            mdi-phone
                        </v-icon>
                    </v-btn>
                </div> -->
            </v-card>
        </v-dialog>
    </v-app>
</template>

<script>

import { mapActions, mapGetters } from "vuex"
import NavComponent from '@/components/front/partials/header';
import Footer from '@/components/front/partials/footer';
import Chat from '@/components/dialog/chat';
import Video from '@/components/video/video';

export default {
    data: () => ({
        userJoined: false,
        // connectToGlobalSocket : false,
        // posts: [],
        counter: 0,
        dialog: false,
    }),
    watch:{
        // $route (to, from){
        //     this.addUserAction(to)
        // },
        // call(){
        //     this.dialog = true
        //     var audio = new Audio('/salamisound-5580171-steam-locomotive-whistle.mp3'); // path to file
        //     audio.play();
        //     console.log('calling.....');
        //     this.setNullCall()
        // }
    },
    computed: mapGetters({
        user: 'chat/getUser',
        call : 'call/getCall',
        roomId : 'call/getRoomId',
    }),
    mounted(){
        // if (!this.$store.state.chat.cookie) {
        //     this.setUserCookies().then(() => {
        //         if (!this.userJoined) {
        //             this.addUserAction(this.$route)
        //             this.userJoined = true
        //         }
        //     })
        // }
    },
    created(){
        // setInterval(() => {
        //     this.counter++
        //     this.addUserAction(this.$route, this.counter, 0)
        // }, 60000)
    },
    methods: {
        // ...mapActions({
        //     "setUserCookies" : "chat/setUserCookies",
        //     'setNullCall' : 'call/setNullCall',
        //     'setUser' : 'chat/setUser'
        // }),
        // addUserAction(route, counter = 0, pages = 1){
        //     const data = {
        //         userId : this.user._id,
        //         cookie:  this.user.cookies,
        //         online: 1,
        //         logged: 0,
        //         visits: pages,
        //         lastVisit: Date.now(),
        //         currentPage: route.fullPath,
        //         status: 'new',
        //         visitsMin: counter,
        //     }
        //     this.$socket.emit('shareUserAction', data)
        // },
        // rejectCall(){
        //     this.dialog = false
        //     this.$socket.emit('rejectCall', { roomId: this.roomId })
        // },
        // responseCall(){
        //     const data = {
        //         roomId: this.roomId
        //     }
        //     this.$socket.emit('responseCall', { roomId: this.roomId })
        //     this.$socket.emit("joinRoomAsEmployee", {roomId : this.roomId, employee : this.user}, async response => {
        //         await this.setUser(this.user)
        //         this.$router.push("/conference")
        //     });
        // }
    },
    components: {
        NavComponent,
        Footer,
        Chat,
        Video
    }
};
</script>
