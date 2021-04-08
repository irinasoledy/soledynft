<template>
    <v-bottom-navigation
        class="video__menu-bottom"
        :value="value"
        color="primary"
        dark
        >
        <v-sheet dark>
            <v-btn v-if="microphone === true" @click="switchMicrophone(false)">
                <span>Microphone</span>
                <v-icon>mdi-microphone</v-icon>
            </v-btn>
            <v-btn v-if="microphone === false" @click="switchMicrophone(true)">
                <span>Microphone</span>
                <v-icon>mdi-microphone-off</v-icon>
            </v-btn>
            <v-btn v-if="camera === true" @click="switchCamera(false)">
                <span>Camera</span>
                <v-icon>mdi-video</v-icon>
            </v-btn>
            <v-btn v-if="camera === false" @click="switchCamera(true)">
                <span>Camera</span>
                <v-icon>mdi-video-off</v-icon>
            </v-btn>
        </v-sheet>
        <v-sheet dark>
            <v-menu
                top
                offset-y
                dark
                >
                <template v-slot:activator="{ on, attrs }">
                    <v-btn v-bind="attrs"
                        v-on="on">
                        <span>Security</span>
                        <v-icon>mdi-security</v-icon>
                    </v-btn>
                </template>
                <v-list dense
                    class="securityMenu"
                    >
                    <v-list-item>
                        <v-list-item-title>
                            <v-checkbox
                                dark
                                v-model="blockRoom"
                                label="Block this room"
                                value="blockRoom"
                                hide-details
                                ></v-checkbox>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>
                            <v-checkbox
                                dark
                                v-model="waitingRoom"
                                label="ON waiting room"
                                value="waitingRoom"
                                hide-details
                                ></v-checkbox>
                        </v-list-item-title>
                    </v-list-item>
                    <v-divider class="my-3"></v-divider>
                    <v-list-item>
                        <v-list-item-title>
                            <v-checkbox
                                dark
                                v-model="shareScreen"
                                label="Share Screen"
                                value="shareScreen"
                                hide-details
                                ></v-checkbox>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>
                            <v-checkbox
                                dark
                                v-model="chat"
                                label="Chat"
                                value="Chat"
                                hide-details
                                ></v-checkbox>
                        </v-list-item-title>
                    </v-list-item>
                    <v-list-item>
                        <v-list-item-title>
                            <v-checkbox
                                dark
                                v-model="renameNickname"
                                label="Rename nickname"
                                value="renameNicname"
                                hide-details
                                ></v-checkbox>
                        </v-list-item-title>
                    </v-list-item>
                </v-list>
            </v-menu>
            <v-btn>
                <span>Participants</span>
                <v-icon>mdi-account-multiple</v-icon>
            </v-btn>

            <v-btn @click="toggleChat()">
                <span>Chat</span>
                <v-icon>mdi-chat</v-icon>
            </v-btn>
            <!-- <v-btn @click="$nuxt.$emit('openChat')">
                <span>Chat</span>
                <v-icon>mdi-chat</v-icon>
            </v-btn> -->
            <!-- <v-btn>
                <span>Share Screen</span>
                <v-icon>mdi-monitor-share</v-icon>
                </v-btn>
                <v-btn>
                <span>Record</span>
                <v-icon>mdi-radiobox-marked</v-icon>
                </v-btn>
                <v-btn>
                <span>Reactions</span>
                <v-icon>mdi-emoticon</v-icon>
                </v-btn> -->
        </v-sheet>
        <v-sheet dark class="but-end">
            <v-btn height="36" dark  color="secondary" @click="end">
                End
            </v-btn>
        </v-sheet>
    </v-bottom-navigation>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'

export default {
    props: ['interlocuitorUser'],
    name: "video-bottom",
    data: () => ({
        dialog: false,
        value: 1,
        blockRoom: false,
        renameNickname: false,
        waitingRoom: false,
        shareScreen: true,
        chat: true,
    }),
    computed: mapGetters({
        user: 'chat/getUser',
        roomId : 'call/getRoomId',
        camera: 'chat/getCamera',
        microphone: 'chat/getMicrophone',
        videoInterlocuitor: 'dialog/getVideoInterlocuitor',
        reject: 'dialog/getReject',
        response: 'dialog/getResponse',
    }),
    mounted(){
        console.log(this.interlocuitorUser, 'mklvndfklnvdklf');
    },
    methods: {
        ...mapActions({
            changeEmployeeStatus : 'chat/changeEmployeeStatus',
            switchCamera: 'chat/switchCamera',
            switchMicrophone: 'chat/switchMicrophone',
            setInterlocutor : 'dialog/setInterlocutor',
            cancelCall : 'dialog/cancelCall',
            restartStatuses: 'dialog/restartStatuses'
        }),
        toggleChat() {
            this.setInterlocutor(null)
            this.setInterlocutor(this.videoInterlocuitor)
        },
        end() {
            $nuxt.$emit('endVideoChat')
            this.cancelCall()
            this.restartStatuses(false)
            const data = {
                to: this.videoInterlocuitor, from: this.user
            }
            this.$socket.emit('endCall', data)
            // this.$socket.emit("stop", this.roomId);
        },
        setRoomStatus(status){
            const data = {
                id : this.employee._id,
                roomId : this.roomId,
                status : status
            }
            this.changeEmployeeStatus(data).then(() => {
                this.$socket.emit('updateActiveRooms', this.$store.state.chat.rooms)
            })
        }
    },
    beforeRouteLeave (to, from , next) {
        this.$socket.emit("stop", this.roomId);
        this.setRoomStatus(false)
        next()
    },
}
</script>

<style lang="scss">
  .video {

    &__menu-bottom {
      display: flex;
      align-items: center;
      justify-content: space-between !important;
      background-color: #1E1E1E !important;
    }

    .v-sheet {
      height: 56px;
      display: flex;
      align-items: center;
    }

    .but-end {
      padding-right: 15px;
      padding-left: 15px;

      .v-btn span {
        color: #ffff
      }
    }
  }
  .securityMenu {
    .v-input--selection-controls__input:hover {

      .v-input--selection-controls__ripple {
        display: none;
      }
    }
    .mdi-checkbox-marked::before {
      content: "\F012C" !important;
    }
    .mdi-checkbox-blank-outline::before {
      content: "" !important;
    }
  }
</style>
