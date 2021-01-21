<template>
    <div class="row text-center">
        <div v-if="deactivateChat == false">
            <div class="col-md-6">
                <h3>Local</h3>
                <div id="my-video-chat-window" ref="myVideo" class="local-video"></div>
            </div>
            <div class="col-md-6">
                <h3>Remote</h3>
                <div id="remote-media-div" class="remote-video"></div>
            </div>
        </div>
        <div v-if="deactivateChat == true"> <hr><hr>
            <p class="text-center">This room was closed!</p> <hr><hr>
        </div>
    </div>
</template>

<script>
import axios from 'axios'

export default {
    props: ['username', 'room'],
    name: 'VideoChat',
    data: function () {
        return {
            accessToken: '',
            videoChatWindow: '',
            activeRoom: '',
            deactivateChat: false,
        }
    },
    methods : {
        muteRoom : function(){
            this.activeRoom.disconnect();
            document.getElementById('my-video-chat-window').remove();
        },
        leaveRoom : function(){
            this.activeRoom.disconnect();
            document.getElementById('remote-media-div').remove();
            document.getElementById('my-video-chat-window').remove();
            this.deactivateChat = true;
            console.log(this.activeRoom);
        },
        // async getAccessToken() {
        //   return await axios.get(`http://localhost:8000/token?identity=${this.username}`);
        // },
        getAccessToken : function () {
            const _this = this
            const axios = require('axios')

            // Request a new token
            axios.get(`http://localhost:3000/token?identity=${this.username}`)
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

            connect( this.accessToken, { name:this.room }).then(room => {

                console.log(`Successfully joined a Room: ${room}`);

                _this.activeRoom = room;

                // const videoChatWindow = document.getElementById('video-chat-window');
                const videoChatWindow = this.$refs["myVideo"];

                createLocalVideoTrack().then(track => {
                    videoChatWindow.appendChild(track.attach());
                });

                room.participants.forEach(participant => {
                  // participant.tracks.forEach(publication => {
                  //   if (publication.track) {
                  //     document.getElementById('remote-media-div').appendChild(publication.track.attach());
                  //   }
                  // });

                 participant.on('trackSubscribed', track => {
                    document.getElementById('remote-media-div').appendChild(track.attach());
                  });
                });

                room.on('participantConnected', participant => {
                    console.log(`Participant "${participant.identity}" connected`);

                    participant.tracks.forEach(publication => {
                        console.log( publication.track, 'foreach');
                        if (publication.isSubscribed) {
                            const track = publication.track;
                            // videoChatWindow.appendChild(track.attach());
                            document.getElementById('remote-media-div').appendChild(track.attach());

                        }
                    });

                    participant.on('trackSubscribed', track => {
                        document.getElementById('remote-media-div').appendChild(track.attach());
                    });
                });

                // console.log(room.participants);

                // room.participants.forEach(participant => {
                //     participant.tracks.forEach(publication => {
                //         if (publication.track) {
                //             console.log('mlml');
                //             videoChatWindow.appendChild(publication.track.attach());
                //             // document.getElementById('remote-media-div').appendChild(publication.track.attach());
                //         }
                //     });
                //
                //     participant.on('trackSubscribed', track => {
                //         videoChatWindow.appendChild(track.attach());
                //         // document.getElementById('remote-media-div').appendChild(track.attach());
                //     });
                // });
            }, error => {
                console.error(`Unable to connect to Room: ${error.message}`);
            });
        },
    },
    mounted : function () {
        console.log('Video chat room loading...')

        this.getAccessToken()
        this.videoChatWindow = document.getElementById('video-chat-window');
        // this.connectToRoom();
        // console.log(this.videoChatWindow, this.$refs["myVideo"]);
    }
}
</script>

<style media="screen">
    .col-md-6{
        width: 48%;
        float: left;
        margin-right: 20px;
    }
    .video-options{
        padding: 10px;
        margin: 15px;
        border: 1px solid #2980b9;
        border-radius: 5px;
        color: #2980b9;
    }
    .video-options a{
        font-size: 20px;
        margin-right: 20px;
    }
</style>
