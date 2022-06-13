<template>
    <div class="d-flex">
        <div class="video-mobile">
            <small class="chatWarning">
                {{ trans.General.chatWarning }}
                <v-sheet dark class="but-end">
                    <v-btn small dark fab color="secondary" @click="end" class="end-btn">
                        <v-icon dark>
                            mdi-phone-hangup
                        </v-icon>
                    </v-btn>
                </v-sheet>
            </small>
            <div  class="video-mobile__top d-flex justify-space-between">

                <!-- <v-btn
                    @click.stop="drawerInfo = !drawerInfo"
                    small
                    dark
                    >
                    <v-icon>mdi-cog</v-icon>
                </v-btn> -->

            </div>

            <div class="video-mobile-container">
                <callVideo :user='user'/>
            </div>
            <bottomVideo :user='user'/>
        </div>
        <v-navigation-drawer class="infoChat" v-model="drawerInfo"
            absolute
            bottom
            temporary
            dark
            >
            <!-- <drawerInfo /> -->
        </v-navigation-drawer>
        <v-navigation-drawer class="infoChat" v-model="drawerMenu"
            absolute
            bottom
            temporary
            light
            >
            <!-- <drawerMenu /> -->
        </v-navigation-drawer>
        <v-navigation-drawer
            absolute
            bottom
            temporary
            dark
            v-model="chatDrawer"
            >
            <chat :user="user" :interlocutor="videoInterlocuitor" :mode="mode"/>
        </v-navigation-drawer>
    </div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

import drawerInfo from '@/components/chat-module/video/mobile/drawer-info-mobile'
import drawerMenu from '@/components/chat-module/video/mobile/drawer-menu-mobile'
import callVideo from '@/components/chat-module/video/mobile/call-mobile'
import bottomVideo from '@/components/chat-module/video/mobile/bottom-mobile'

// import chat_old from '@/components/chat_old/video/chat_old'
import chat from '@/components/chat-module/chat/chatBox'

export default {
    props: ['user', 'interlocutor', 'mode'],
    components: {
        drawerInfo,
        drawerMenu,
        callVideo,
        bottomVideo,
        chat
    },
    computed: mapGetters({
        videoInterlocuitor: 'dialog/getVideoInterlocuitor',
        trans: 'getTranslations',
    }),
    data: () => ({
        chatDrawer: false,
        drawerMenu: false,
        drawerInfo: false,
    }),
    created() {
        this.$nuxt.$on('openMenuMobile', () => {
            this.drawerMenu = !this.drawerMenu
        })
    },
    mounted(){
        this.$nuxt.$on('openChat', () => {
            this.chatDrawer = !this.chatDrawer
        })
    },
    methods: {
        ...mapActions({
            cancelCall : 'dialog/cancelCall',
            restartStatuses: 'dialog/restartStatuses'
        }),
        end() {
            $nuxt.$emit('endVideoChat')
            this.cancelCall()
            this.restartStatuses(false)
            const data = { to: this.videoInterlocuitor, from: this.user}
            this.$socket.emit('endCall', data)
        },
    }
}
</script>

<style lang="scss" scoped>
    .video-mobile {
        width: 100%;
        height: calc(100vh - 65px) !important;
        background: rgb(34, 34, 34);
        position: relative;
        z-index: 1;
        display: flex;
        flex-direction: column;
        &__menu-bottom {
            //position: static;
            position: absolute !important;
            bottom: 48px;
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
            background-color: transparent;
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
            background-color: rgba(0, 0, 0, 0.1);
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
            background-color: rgba(0, 0, 0, 0.1);
            border-bottom: 1px solid #ffff;
            border-radius: 9px;
            padding: 0;
        }
        .v-btn {
            width: 100%;
        }
        .emoticons {
            background-color: rgba(0, 0, 0, 0.1);
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

    .v-navigation-drawer--bottom.v-navigation-drawer--is-mobile {
        max-height: 90%;
    }

    .full-height {
        height: calc(100vh - 151px);
    }
    .chatWarning {
        position: absolute;
        text-align: center;
        color: #FFF;
        width: 100%;
        font-size: 10px;
        margin-top: -10px;
        z-index: 9;
        left: 0 !important
    }
    .end-btn{
        margin-top: 5px;
    }
</style>
