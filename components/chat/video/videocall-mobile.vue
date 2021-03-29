<template lang="html">
  <div class="video-wrapp">
      <div class="video-wrapp-inside">
          <!-- <img src="/bg/1.jpg" alt="" class="remote-video"> -->
          <div id="remote-media-div" class="remote-video"></div>
          <!-- <img src="/bg/2.jpg" alt="" class="local-video"> -->
          <div id="my-video-chat-window" ref="myVideo" class="local-video"></div>

      </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import axios from "axios"

export default {
    props: ['prevUrl'],
    data(){
        return {
            videoConference: false,
            activeRoom: null,
            mutedVideo: false,
            mutedAudio: false,
            dialog: false,
            mutedVideoAlert: false,
            mutedAudioAlert: false,
        }
    },
    watch: {
        camera(){
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
        microphone(){
            this.activeRoom.localParticipant.audioTracks.forEach(publication => {
                if(!this.microphone){
                    publication.track.disable()
                }else{
                    publication.track.enable()
                }
            })
        },
        endChat(){
            console.log('mlml');
            this.activeRoom.disconnect()
            this.$router.push(this.prevUrl)
        }
    },
    computed: mapGetters(
        {
            room: 'call/getRoomId',
            user: 'chat/getUser',
            camera: 'chat/getCamera',
            microphone: 'chat/getMicrophone',
            endChat: 'chat/getEndChat',

            // "client": "chat/getClient",
            // "employee": "chat/getEmployee",
            // "connectRoom": "chat/getConnectRoom",
            // "videoProccess": "chat/getVideoProccess",
            // "audioProccess": "chat/getAudioProccess",
            // "videoMute": "chat/getVideoMute",
            // "videoUnmute": "chat/getVideoUnmute",
            // "audioMute": "chat/getAudioMute",
            // "audioUnmute" : "chat/getAudioMute",
        }
    ),
    mounted : function () {
        console.log('Video chat room loading...')
        this.videoChatWindow = document.getElementById('video-chat-window');
        this.startVideConference()
    },
    methods: {
        stopChat(){
            this.$socket.emit("stop", this.room);
        },
        cancelVideConference: function(){
            this.activeRoom.disconnect()
            this.videoConference = false
        },
        startVideConference: function(){
            this.videoConference = true
            this.getAccessToken()
        },
        getAccessToken : function () {
            const _this = this
            const axios = require('axios')

            // Request a new token
            axios.get(`/api/twillio/token?identity=${this.user.name}`)
                .then(function (response) {
                    _this.accessToken = response.data.token
                })
                .catch(function (error) {
                    console.log(error);
                })
                .then(function () {
                    _this.connectToRoom()
                });
        },
        connectToRoom : function () {
            const { connect, createLocalVideoTrack } = require('twilio-video');
            const _this = this;

            connect( this.accessToken, { name: this.room }).then(room => {
                console.log(`Successfully joined a Room: ${room}`);
                _this.activeRoom = room;

                const videoChatWindow = this.$refs["myVideo"];

                createLocalVideoTrack().then(track => {
                    videoChatWindow.appendChild(track.attach());
                });

                room.participants.forEach(participant => {
                 participant.on('trackSubscribed', track => {
                    document.getElementById('remote-media-div').appendChild(track.attach());
                  });
                });

                room.on('participantConnected', participant => {
                    console.log(`Participant "${participant.identity}" connected`);
                    participant.tracks.forEach(publication => {
                        if (publication.isSubscribed) {
                            const track = publication.track;
                            document.getElementById('remote-media-div').appendChild(track.attach());
                        }
                    });
                    participant.on('trackSubscribed', track => {
                        document.getElementById('remote-media-div').appendChild(track.attach());
                    });
                });

                room.on('disconnected', room => {
                    console.log('disconnect');
                    room.localParticipant.videoTracks.forEach(publication => {
                        publication.track.disable();
                        publication.track.stop();
                        publication.unpublish();
                    });
                });

            }, error => {
                console.error(`Unable to connect to Room: ${error.message}`);
            });
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
.remote-video video{
    max-width: 100%;
}
.local-video {
    position: absolute;
    right: 0;
    bottom: 7px;
}
.local-video video{
    width: 100px;
    /* height: 50px !important; */
}
</style>
