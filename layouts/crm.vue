<template>
    <div id="appRoot" v-cloak>
        <template>
            <v-app id="inspire" class="app">
                <app-drawer class="app--drawer"></app-drawer>
                <app-toolbar class="app--toolbar"></app-toolbar>
                <v-main>
                    <!-- Page Header -->
                    <!-- <page-header></page-header> -->
                    <div class="page-wrapper">
                        <v-scroll-y-transition>
                            <nuxt/>
                        </v-scroll-y-transition>
                        <Chat mode="client"/>
                        <Video mode="client"/>
                        
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
        <v-dialog
            v-model="dialog"
            fullscreen
            hide-overlay
            transition="dialog-bottom-transition"
            scrollable
            >
            <v-card
                color="primary"
                dark
                >
                <v-card-text>
                    Incoming call from {{ roomId }}...
                    <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                        ></v-progress-linear>
                </v-card-text>
                <v-card-text class="text-center">
                    <h3>Guest user </h3>
                    <h4>Room ID  {{ roomId }}</h4>
                </v-card-text>
                <div class="text-center">
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
                </div>
            </v-card>
        </v-dialog>
    </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import Chat from '@/components/dialog/chat';

export default {
    data: () => ({
        expanded: true,
        rightDrawer: false,
        dialog: false,
        snackbar: {
            show: false,
            text: '',
            color: '',
        }
    }),
    mounted(){
        this.boot()
    },
    watch: {
        call(){
            this.dialog = true
            var audio = new Audio('/salamisound-5580171-steam-locomotive-whistle.mp3'); // path to file
            audio.play();
            console.log('calling.....');
            this.setNullCall()
        },
        reject(){
            this.dialog = false
            this.setDefaultReject()
        },
        response(){
            this.$socket.emit("joinRoomAsClient", {roomId : this.roomId, client : this.user}, async response => {
                await this.setUser(this.user)
                this.$router.push("/conference")
            });
            this.setDefaultResponse()
        }
    },
    computed: mapGetters({
        authUser: 'admin/getAuthUser',
        call : 'call/getCall',
        roomId : 'call/getRoomId',
        user: 'chat/getUser',
        'reject' : 'call/getReject',
        'response' : 'call/getResponse',
    }),
    methods: {
        ...mapActions({
            'initApp' : 'admin/initApp',
            'setNullCall' : 'call/setNullCall',
            'setClientAsUser' : 'chat/setClientAsUser',
            'setUser' : 'chat/setUser',
            'setDefaultReject' : 'call/setDefaultReject',
            'setDefaultResponse' : 'call/setDefaultResponse',
        }),
        openThemeSettings() {
            this.$vuetify.goTo(0)
            this.rightDrawer = (!this.rightDrawer)
        },
        boot(){
            this.initApp()
        },
        rejectCall(){
            this.dialog = false
            this.$socket.emit('rejectCall', { roomId: this.roomId })
        },
        responseCall(){
            const data = {
                roomId: this.roomId
            }
            this.$socket.emit('responseCall', { roomId: this.roomId })
            this.$socket.emit("joinRoomAsEmployee", {roomId : this.roomId, employee : this.authUser}, async response => {
                await this.setUser(this.authUser)
                this.$router.push("/conference")
            });
        }
    },
    components: {
        Chat
    }
}
</script>

<style scoped>

  .page-wrapper {
    min-height: calc(100vh - 64px - 50px - 81px);
    margin-bottom: 50px;
    margin-top: 70px;
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
