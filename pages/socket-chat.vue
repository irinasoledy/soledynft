<template>
    <div class="grey lighten-5">
        <v-row no-gutters>

            <v-col cols="12" sm="3">
                <v-card class="pa-2 full-height" outlined tile >
                    <div class="c-chat" ref="block">
                        <Message
                            v-for="m in messages"
                            :key="m.text"
                            :name="m.name"
                            :text="m.text"
                            :owner="m.id === user.id"
                        />
                    </div>
                    <div class="c-form">
                        <ChatForm/>
                    </div>
                </v-card>
            </v-col>

            <v-col cols="12" sm="9">
                <v-card class="pa-2 full-height" outlined tile>
                    <v-card class="features">
                        <div>
                            <v-btn class="ma-2" color="primary" dark @click="startVideConference" v-if="!videoConference">
                                Start Video Chat
                                <v-icon dark right>
                                    mdi-video
                                </v-icon>
                            </v-btn>

                            <v-btn class="ma-2" color="green" dark v-if="videoConference && (mutedVideo === false)" @click="muteVideo">
                                <v-icon dark center>
                                    mdi-video
                                </v-icon>
                            </v-btn>
                            <v-btn class="ma-2" color="red" dark v-if="videoConference && (mutedVideo === true)" @click="unmuteVideo">
                                <v-icon dark center>
                                    mdi-video-off
                                </v-icon>
                            </v-btn>


                            <v-btn class="ma-2" color="green" dark v-if="videoConference && (mutedAudio === false)" @click="muteAudio">
                                <v-icon dark center>
                                    mdi-microphone
                                </v-icon>
                            </v-btn>
                            <v-btn class="ma-2" color="red" dark v-if="videoConference && (mutedAudio === true)" @click="unmuteAudio">
                                <v-icon dark center>
                                    mdi-microphone-off
                                </v-icon>
                            </v-btn>


                            <v-btn class="ma-2" dark @click="stopChat">
                                <v-icon dark left>
                                    mdi-minus-circle
                                </v-icon>
                                Leave Conference
                            </v-btn>
                        </div>
                    </v-card>
                    <v-card class="video-area">
                        <div v-if="videoConference">
                            <v-row no-gutters class="row text-center">
                                <v-col cols="12 video-wrapper" sm="9"><hr>
                                    <v-chip class="ma-2">
                                        Remote User
                                    </v-chip>
                                    <div v-if="mutedAudioAlert">
                                        <p><v-icon dark center>mdi-microphone-off</v-icon> Mic is muted</p>
                                    </div>
                                    <div id="remote-media-div" class="remote-video"></div>
                                    <div class="muted-video" v-if="mutedVideoAlert">
                                        <v-icon dark center>mdi-video-off</v-icon>
                                    </div>
                                </v-col>
                                <v-col cols="12 video-wrapper" sm="3"><hr>
                                    <div>
                                        <v-chip class="ma-2">
                                            {{ user.name }}
                                        </v-chip>
                                        <div id="my-video-chat-window" ref="myVideo" class="local-video"></div>
                                    </div>
                                    <div v-if="mutedVideo" class="muted-video">
                                        <v-icon dark center>mdi-video-off</v-icon>
                                    </div>
                                    <div v-if="mutedAudio">
                                        <p><v-icon dark center>mdi-microphone-off</v-icon> Mic is muted</p>
                                    </div>
                                </v-col>
                            </v-row>
                        </div>
                    </v-card>
                </v-card>
            </v-col>

        </v-row>

        <div class="text-center">
            <v-dialog
            v-model="dialog"
            hide-overlay
            persistent
            width="300"
            >
                <v-card
                color="primary"
                dark
                >
                    <v-card-text class="center">
                        The conference is over. Goodbye!
                        <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                        ></v-progress-linear>
                    </v-card-text>
                </v-card>
            </v-dialog>
        </div>
    </div>
</template>

<script>
import { mapState } from "vuex";
import Message from "@/components/chat/Message";
import ChatForm from "@/components/chat/ChatForm";

export default {
  middleware: ["chat"],
  head() {
    return {
      title: `Комната ${this.user.room}`
    };
  },
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
  components: { Message, ChatForm },
  computed: mapState(["user", "messages", "connectRoom", "videoProccess", "audioProccess", "videoMute", "videoUnmute", "audioMute", "audioUnmute"]),
  watch: {
    messages() {
          setTimeout(() => {
            this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
          });
      },
      connectRoom(){
           this.dialog = true
          setTimeout(() => {
              this.dialog = false
              this.videoConference = false
              window.location.href = '/leaved'
          }, 1500)
      },
      videoProccess(){
          this.changeVideoProccess()
      },
      audioProccess(){
          this.changeAudioProccess()
      },
      videoMute(){
          if ((this.videoMute !== false) && (this.videoMute !== this.user.id)) {
              this.mutedVideoAlert = true
              document.getElementById('remote-media-div').style.display = "none";
          }
      },
      videoUnmute(){
          if ((this.videoUnmute !== false) && (this.videoUnmute !== this.user.id)) {
              this.mutedVideoAlert = false
              document.getElementById('remote-media-div').style.display = "block";
          }
      },
      audioMute(){
          if ((this.audioMute !== false) && (this.audioMute !== this.user.id)) {
              this.mutedAudioAlert = true
          }
      },
      audioUnmute(){
          if ((this.audioUnmute !== false) && (this.audioUnmute !== this.user.id)) {
              this.mutedAudioAlert = false
          }
      },
    },
    mounted : function () {
        console.log('Video chat room loading...')
        this.videoChatWindow = document.getElementById('video-chat-window');
    },
    methods : {
        muteVideo(){
            this.activeRoom.localParticipant.videoTracks.forEach(publication => {
              publication.track.disable();
            });
            document.getElementById('my-video-chat-window').style.display = "none";
            this.mutedVideo = true
            this.$socket.emit("videoMute", this.user.id);
        },
        muteAudio(){
            this.activeRoom.localParticipant.audioTracks.forEach(publication => {
              publication.track.disable();
            });
            this.mutedAudio = true
            this.$socket.emit("audioMute", this.user.id);
        },
        unmuteVideo(){
            this.mutedVideo = false
            document.getElementById('my-video-chat-window').style.display = "block";
            this.activeRoom.localParticipant.videoTracks.forEach(publication => {
              publication.track.enable();
            });
            this.$socket.emit("videoUnmute", this.user.id);
        },
        unmuteAudio(){
            this.mutedAudio = false
            this.activeRoom.localParticipant.audioTracks.forEach(publication => {
              publication.track.enable();
            });
            this.$socket.emit("audioUnmute", this.user.id);
        },
        changeVideoProccess(){
            // if (this.mutedVideo === false) {
            //     document.getElementById('remote-media-div').style.display = "none";
            // }else{
            //     document.getElementById('my-video-chat-window').style.display = "none";
            // }
            // this.mutedVideo = false
        },
        changeAudioProccess(){

        },
        stopChat(){
            this.$socket.emit("stop");
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
            axios.get(`http://localhost:3000/token?identity=${this.user.name}`)
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

            connect( this.accessToken, { name:this.user.room }).then(room => {
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
    },
};
</script>

<style>
.c-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
    max-width: 300px;
}
.c-form {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 1rem;
    height: 80px;
    background: #212121;
}
.c-chat {
    position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 80px;
    padding: 1rem;
    overflow-y: auto;
}
.chat-area{
    width: 300px;
}
.full-height{
    height: 100vh;
}
video{
    width: 90% !important;
}
.video-wrapper{
    text-align: center;
}
.muted-video {
    border: 1px solid;
    padding: 70px 0;
}
.muted-video .v-icon{
    font-size: 100px;
}
.center{
    text-align: center;
}
</style>
