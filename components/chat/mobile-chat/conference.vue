<template>
  <div class="d-flex">
    <div class="video-mobile">
      <div  class="video-mobile__top d-flex justify-space-between">
        <v-sheet dark>
          <v-btn small dark>
            <v-icon>
              mdi-volume-high
            </v-icon>
          </v-btn>
          <v-btn dark small>
            <v-icon>
              mdi-camera-flip
            </v-icon>
          </v-btn>
        </v-sheet>
        <v-btn
          @click.stop="drawerInfo = !drawerInfo"
          small
          dark
        >
          VideoChat
          <v-icon>
            mdi-chevron-down
          </v-icon>
        </v-btn>
        <v-sheet dark class="but-end">
          <v-btn height="30" width="40" small dark  color="secondary" @click="end">
            End
          </v-btn>
        </v-sheet>
      </div>
      <div class="video-mobile-container" v-touch:swipe.left="swipeHandler">
          <VideocallMobile :prevUrl="prevRoute"/>
      </div>
      <video-bottom-mobile></video-bottom-mobile>
    </div>
    <v-navigation-drawer class="infoChat" v-model="drawerInfo"
      absolute
      bottom
      temporary
      dark
      >
      <v-card dark class="elevation-6">
        <v-card-title>

            {{ roomId }}
          Andrei Tintari's meeting
        </v-card-title>
        <v-card-text>
          <v-sheet>
            <div class="menuItem">
              <span>Meeting Id</span>
              <span>893 341 324 234</span>
            </div>
            <div class="menuItem">
              <span>Host</span>
              <span>Andrei Tintari</span>
            </div>
            <div class="menuItem">
              <span>Invite Link</span>
              <span>http://videochat/r/1232343221QW23</span>
            </div>
            <div class="menuItem">
              <span>Participant Id</span>
              <span>45671</span>
            </div>
            <div class="menuItem">
              <span>Encription</span>
              <span>Enabled</span>
            </div>
            <p>You are connected to videochat via data centers in the Romania </p>
          </v-sheet>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
    <v-navigation-drawer class="infoChat" v-model="drawerMenu"
      absolute
      bottom
      temporary
      light
      >
      <v-card light>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-btn color="secondary" text>
                Disconnect Audio
              </v-btn>

            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn text class="d-flex justify-space-between" @click.stop="drawerSettings = true">
                  Security
                  <v-icon>
                    mdi-security
                  </v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title>
                <v-btn text class="d-flex justify-space-between" @click="$nuxt.$emit('openChat')">
                  Chat
                  <v-icon>
                    mdi-chat
                  </v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title  >

                <v-btn text class="d-flex justify-space-between" @click.stop="drawerMeeting= !drawerMeeting">
                  Meeting Settings
                  <v-icon>
                    mdi-cog
                  </v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
            <v-list-item>
              <v-list-item-title  >
                <v-btn text class="d-flex justify-space-between" @click.stop="drawerShare= !drawerShare">
                  Share Screen
                  <v-icon>
                    mdi-monitor-share
                  </v-icon>
                </v-btn>
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-card-text class="py-0">
          <div class="emoticons pa-4">
            <span class="emoticon">&#x1f600</span>
            <span class="emoticon">&#x2764</span>
            <span class="emoticon">&#x2620</span>
            <span class="emoticon">&#x1f608</span>
            <span class="emoticon">&#x1f917</span>
          </div>
        </v-card-text>
        <v-divider class="mb-2 mt-6"></v-divider>
        <v-card-text class="text-center" >
          <v-btn @click.stop="drawerMenu = false" outlined color="primary">
            Cancel
          </v-btn>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
    <v-navigation-drawer  class="settingsMenu" v-model="drawerSettings"
      absolute
      bottom
      temporary
      light>
      <v-card ligith>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-subtitle>
                Settings
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-switch
                  v-model="blockMeeting"
                  label="Block Meeting"
                  inset
                ></v-switch>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                  <v-switch
                  v-model="waitingRoom"
                  label="Waiting Room"
                  inset
                ></v-switch>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                  <v-switch
                  v-model="hidePictures"
                  label="Hide all Pictures"
                  inset
                ></v-switch>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-subtitle>
                Allow Participants To:
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                  <v-switch
                  v-model="shareScreen"
                  label="Share Screen"
                  inset
                ></v-switch>
              </v-list-item-content>
            </v-list-item>

            <v-list-item>
              <v-list-item-content class="justify-space-between">
                  <span class="v-label">Chat with</span>
                  <v-select
                    v-model="e2"
                    :items="participants"
                    menu-props="auto"
                    hide-details
                    label="Everyone"
                    single-line
                  ></v-select>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                  <v-switch
                  v-model="startVideo"
                  label="Start Video"
                  inset
                ></v-switch>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                  <v-switch
                  v-model="rename"
                  label="Rename"
                  inset
                ></v-switch>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                  <v-switch
                  v-model="unmute"
                  label="Unmute"
                  inset
                ></v-switch>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-btn text small color="secondary">
                  Delete Participant
                </v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mb-4"></v-divider>
            <v-card-text class="text-center" >
              <v-btn @click.stop="drawerSettings = false" outlined color="primary">
                Cancel
              </v-btn>
            </v-card-text>
          </v-list>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
    <v-navigation-drawer  class="shareScreen" v-model="drawerShare"
      absolute
      bottom
      temporary
      light>
      <v-card light>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-content>
                <v-btn text small>
                  Screen
                  <v-icon>mdi-monitor-share</v-icon>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-btn text small>
                  WebUrl
                  <v-icon>mdi-link</v-icon>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-btn text small>
                  Bookmark
                  <v-icon>mdi-bookmark</v-icon>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-btn text small>
                  Camera
                  <v-icon>mdi-camera</v-icon>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-btn text small>
                  Share whiteboard
                  <v-icon>mdi-monitor</v-icon>
                </v-btn>
              </v-list-item-content>
            </v-list-item>
          </v-list>
        </v-card-text>
        <v-divider class="mb-2"></v-divider>
        <v-card-text class="text-center" >
          <v-btn @click.stop="drawerShare = false" outlined color="primary">
            Cancel
          </v-btn>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>
        <v-navigation-drawer  class="settingsMeeting" v-model="drawerMeeting"
      absolute
      bottom
      temporary
      light>
      <v-card ligith>
        <v-card-text>
          <v-list>
            <v-list-item>
              <v-list-item-subtitle>
                Host Controls
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-content class="justify-space-between">
                  <span class="v-label">Meeting Topic</span>
                  <v-select
                    v-model="e2"
                    :items="participants"
                    menu-props="auto"
                    hide-details
                    label="Andrei Tintari's Meeting"
                    single-line
                  ></v-select>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                <v-switch
                  v-model="blockMeeting"
                  label="Mute Upon Entry"
                  inset
                ></v-switch>
              </v-list-item-content>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                  <v-switch
                  v-model="waitingRoom"
                  label="Play Join and Leave Sound"
                  inset
                ></v-switch>
              </v-list-item-content>
            </v-list-item>
            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-subtitle>
                General
              </v-list-item-subtitle>
            </v-list-item>
            <v-list-item>
              <v-list-item-content>
                  <v-switch
                  v-model="shareScreen"
                  label="Show Name when participants join"
                  inset
                ></v-switch>
              </v-list-item-content>
            </v-list-item>


            <v-list-item>
              <v-list-item-content>
                  <v-switch
                  v-model="startVideo"
                  label="Show Non-Video participants"
                  inset
                ></v-switch>
              </v-list-item-content>
            </v-list-item>
            <v-divider class="mb-4"></v-divider>
            <v-card-text class="text-center" >
              <v-btn @click.stop="drawerMeeting = false" outlined color="primary">
                Cancel
              </v-btn>
            </v-card-text>
          </v-list>
        </v-card-text>
      </v-card>
    </v-navigation-drawer>

<v-navigation-drawer  absolute
bottom
temporary
dark
v-model="chatDrawer">
    <chat/>
</v-navigation-drawer>

    <!-- <chat v-show="chatDrawer" /> -->
  </div>
</template>

<script>
import VideoBottomMobile from '@/components/chat/video/video-bottom-mobile'
import VideocallMobile from "@/components/chat/video/videocall-mobile"
import chat from '@/components/chat/video/chat'
import { mapActions, mapGetters } from 'vuex'

export default {
    props: ['prevRoute'],
    layout: "video",
  components: {
    VideoBottomMobile,
    VideocallMobile,
    chat
  },
  data: () => ({
    chatDrawer: false,
    drawerMenu: false,
    drawerInfo: false,
    drawerSettings: false,
    drawerShare: false,
    drawerMeeting: false,
    blockMeeting: false,
    waitingRoom: true,
    hidePictures: false,
    shareScreen: false,
    unmute: true,
    rename: true,
    startVideo: false,
    e2: false,
    participants: [
      "Participant 1",
      "Participant 2",
    ]
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
  methods: {
      ...mapActions({
          changeEmployeeStatus : 'chat/changeEmployeeStatus',
          switchCamera: 'chat/switchCamera',
          switchMicrophone: 'chat/switchMicrophone',
          setInterlocutor : 'dialog/setInterlocutor',
          cancelCall : 'dialog/cancelCall',
          restartStatuses: 'dialog/restartStatuses'
      }),
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
    onClick() {
        // Perform an action
        console.log("dd")
    },
    swipeHandler() {
      console.log("dd")
    }
  },
  mounted(){
      this.$nuxt.$on('openChat', () => {
        this.chatDrawer = !this.chatDrawer
        console.log(this.chatDrawer);
      })
  },
  created() {
    // this.$nuxt.$on('openChat', () => {
    //   this.chatDrawer = !this.chatDrawer
    //   console.log(this.chatDrawer);
    // })
    this.$nuxt.$on('openMenuMobile', () => {
      this.drawerMenu = !this.drawerMenu
    })
  },
  beforeDestroy(){
    this.$nuxt.$off('openChat')
  }
}
</script>

<style lang="scss" scoped>
  .video-mobile {
    width: 100%;
    height: calc(100vh - 128px) !important;
    background: rgb(34, 34, 34);
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    &__menu-bottom {
      position: static;
    }

    &__top {
      padding: 15px;
      align-items: center;

      .v-sheet {
        background: none;

        padding: 0;
      }

      .v-btn {
        padding: 0 !important;
        box-shadow: none !important;
        background: transparent;
        min-width: 25px !important;
      }
    }

    .video-mobile-container {
      height: 100%;
    }

    .but-end {
      padding-left: 15px;

      .v-btn span {
        color: #ffff
      }
    }
  }
  .settingsMenu {
    max-height: 80% !important;

    .v-input--selection-controls {
      margin-top: 0;
      padding-top: 0;
    }

    .v-sheet {
      min-height: 100%;
    }

    .v-label {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      max-width: 50%;
    }

    .v-select {
      margin: 0;
      padding: 0;
      max-width: 100px;

      .v-input__slot:before {
        display: none;
      }

      .v-input__append-inner {
        padding-left: 0;
      }

      .v-label {
        max-width: 100%;
      }
    }
    .v-message {
        min-height: 0px;
      }
    .v-input {

      &--switch,
      &__control {
        width: 100%;
      }
      &__slot {
        justify-content: space-between;

        .v-label {
          flex: none !important;
          order: 1;
          font-size: 14px;
        }
        .v-input--selection-controls__input {
          order: 2;
        }


      }


      .mdi-menu-down::before {
        content: "\F0142"
      }
    }
  }
  .settingsMeeting {
    max-height: 80% !important;

    .v-input--selection-controls {
      margin-top: 0;
      padding-top: 0;
    }

    .v-sheet {
      min-height: 100%;
    }

    .v-label {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.6);
      max-width: 50%;
    }

    .v-select {
      margin: 0;
      padding: 0;
      max-width: 100px;

      .v-input__slot:before {
        display: none;
      }

      .v-input__append-inner {
        padding-left: 0;
      }

      .v-label {
        max-width: 100%;
      }
    }
    .v-message {
        min-height: 0px;
      }
    .v-input {

      &--switch,
      &__control {
        width: 100%;
      }
      &__slot {
        justify-content: space-between;

        .v-label {
          flex: none !important;
          order: 1;
          font-size: 14px;
        }
        .v-input--selection-controls__input {
          order: 2;
        }


      }


      .mdi-menu-down::before {
        content: "\F0142"
      }
    }
  }
  .shareScreen {
    max-height: 80% !important;

    .v-sheet {
      min-height: 100%;
    }
    .v-list-item__content .v-btn {
      display: flex;
      justify-content: space-between;
    }

    .v-list-item {
      background-color: rgba(0, 0, 0,0.1);
      border-bottom: 1px solid #ffff;
      border-radius: 9px;
      padding: 0;
    }
  }
  .infoChat {
    max-height: 80% !important;

    .v-sheet {
      min-height: 100%;
    }

    .v-list-item {
      background-color: rgba(0, 0, 0,0.1);
      border-bottom: 1px solid #ffff;
      border-radius: 9px;
      padding: 0;
    }

    .v-btn {
      width: 100%;
    }

    .emoticons {
      background-color: rgba(0, 0, 0,0.1);
      border-radius: 9px;
      display: flex;
      justify-content: space-around;
      font-size: 30px;

      .emoticon {
        transition: transform .3s ease;
      }

      .emoticon:hover {
        transform: scale(1.1);
      }
    }
  }
  .chatdrawer {
    position: absolute;
  }
  .infoChat .menuItem {
      display: flex;
      margin-bottom: 15px;


      span:first-child {
        width: 40%;
        opacity: 0.6;
      }
      span:last-child {
        width: 60%;
      }
    }
    .v-navigation-drawer--bottom.v-navigation-drawer--is-mobile{
        max-height: 90%;
    }
    .full-height{
        height: calc(100vh - 151px);
    }
</style>
