<template lang="html">
    <div class="video-wrapp">
        <div class="video-wrapp-inside">
            <div id="remote-media-div" ref="remote-video" class="remote-video"></div>
            <div id="my-video-chat-window" ref="local-video" class="local-video"></div>
        </div>
    </div>
</template>

<script>

import { mapGetters } from 'vuex'
import { connect, createLocalVideoTrack } from 'twilio-video'
import chatApi from '@/api/chatApi'

export default {
    props: ['user'],
    data: () => ({
        videoConference: false,
        activeRoom: null,
    }),
    watch: {
        activeRoom() {
            this.activeRoom.localParticipant.videoTracks.forEach(publication => {
                if (!this.camera) {
                    publication.track.disable()
                    document.getElementById('my-video-chat-window').style.display = "none";
                } else {
                    publication.track.enable()
                    document.getElementById('my-video-chat-window').style.display = "block";
                }
            })
        },
        camera() {
            this.activeRoom.localParticipant.videoTracks.forEach(publication => {
                if(!this.camera){
                    document.getElementById('my-video-chat-window').style.display = "none";
                    publication.track.disable()
                }else{
                    publication.track.enable()
                    document.getElementById('my-video-chat-window').style.display = "block";
                }
            })
        },
        microphone() {
            this.activeRoom.localParticipant.audioTracks.forEach(publication => {
                if(!this.microphone){
                    publication.track.disable()
                }else{
                    publication.track.enable()
                }
            })
        },
        endChat() {
            this.activeRoom.disconnect()
        }
    },
    computed: mapGetters({
        room: 'call/getRoomId',
        camera: 'chat/getCamera',
        microphone: 'chat/getMicrophone',
        endChat: 'chat/getEndChat',
    }),
    mounted() {
        $nuxt.$on('endVideoChat', () => {
            this.activeRoom.disconnect()
        })

        $nuxt.$on('switchSpeaker', () => {
            console.log(this.activeRoom);
            // this.activeRoom.trackAdded()
        })

        this.startVideConference()
        document.getElementById('my-video-chat-window').style.display = "none";
    },
    methods: {
        cancelVideConference() {
            this.activeRoom.disconnect()
            this.videoConference = false
        },
        startVideConference() {
            this.videoConference = true
            this.getAccessToken()
        },
        async getAccessToken() {
            await chatApi.getTwillioToken(this.user.name, response => {
                this.accessToken = response.token
                this.connectToRoom()
            })
        },
        async connectToRoom() {
            let audioOutputDevice;

            await navigator.mediaDevices.enumerateDevices().then(devices => {
                audioOutputDevice = devices.find(device => device.kind === 'audiooutput');
                // return connect(this.accessToken, { name: this.room });
            })

            await connect(this.accessToken, { name: this.room, audio: true,
                    video: { width: 640 },
                    dominantSpeaker: true }).then(room => {
                const localVideo = this.$refs["local-video"];
                const remoteVideo = this.$refs["remote-video"];

                this.activeRoom = room;

                // if (this.activeRoom.participants.size < 2) {
                    createLocalVideoTrack().then(track => {
                        localVideo.appendChild(track.attach())
                    })

                    room.on('trackSubscribed', track => {
                        if (track.kind === 'audio') {
                            console.log('vldfml');
                            const audioElement = track.attach();
                            audioElement.setSinkId(audioOutputDevice.deviceId).then(() => {
                                document.body.appendChild(audioElement);
                            });
                        }
                    });

                    // room.on('trackAdded', track => {
                    //     if (track.kind === 'audio') {
                    //         console.log('track kind');
                    //         const audioElement = track.attach();
                    //         audioElement.setSinkId(audioOutputDevice.deviceId).then(() => {
                    //             document.body.appendChild(audioElement);
                    //         });
                    //     }
                    // })

                    room.participants.forEach(participant => {
                        participant.on('trackSubscribed', track => {
                            remoteVideo.appendChild(track.attach())

                        })
                    })

                    room.on('participantConnected', participant => {
                        participant.tracks.forEach(publication => {
                            if (publication.isSubscribed) {
                                const track = publication.track
                                remoteVideo.appendChild(track.attach())
                            }
                        })
                        participant.on('trackSubscribed', track => {
                            remoteVideo.appendChild(track.attach())
                        })
                    })

                    room.on('trackAdded', track => {
                        if (track.kind === 'audio') {
                            console.log('track kind');
                            const audioElement = track.attach();
                            audioElement.setSinkId(audioOutputDevice.deviceId).then(() => {
                                console.log(audioElement);
                                document.body.appendChild(audioElement);
                            });
                        }
                    })
                // }
                room.on('disconnected', room => {
                    room.localParticipant.videoTracks.forEach(publication => {
                        publication.track.disable()
                        publication.track.stop()
                        publication.unpublish()
                    })
                })
            }, error => {
                console.error(`Unable to connect to Room: ${error.message}`)
            })
        },
    }
}
</script>

<style lang="css">
.video-wrapp{
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%
}
.video-wrapp-inside{
    position: relative;
}
.remote-video{
    text-align: center;
    margin-top: -100px;
}
.remote-video video{
    width: 100%;
    max-height: calc(100vh - 173px);
}
@media (max-width: 400px) {
    /*.remote-video video{*/
    /*    !*max-width: 100%;*!*/
    /*    max-height: calc(100vh - 188px);*/
    /*}*/
}
.local-video {
    position: absolute;
    right: 0;
    bottom: 7px;
}
.local-video video{
    width: 100px;
}
#my-video-chat-window {
    width: 100px !important;
}
</style>
