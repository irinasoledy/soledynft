<template lang="html">
  <div class="wrap">
      <v-row>
          <v-col sm="9">
                <v-alert
                    dense
                    text
                    type="success"
                    v-if="alert"
                    >
                    {{ alert }}
                </v-alert>
                <Waiting v-if="this.waiting"></Waiting>
                <Videocalling v-if="!this.waiting"></Videocalling>
          </v-col>
          <v-col sm="3" class="chat-area">
            <v-card
                class="mx-auto"
                outlined
                >
                <v-card-title>
                    <div class="">
                        <v-chip
                            class="ma-1"
                            color="danger"
                            width="200"
                            label
                            >
                            <v-icon left>
                                mdi-account-circle-outline
                            </v-icon>
                            {{ employee.name }}
                        </v-chip>
                    </div>
                    <v-btn v-if="user.type === 'employee'" @click="disconnect()">Disconnect</v-btn>
                </v-card-title>
                <v-card-actions></v-card-actions>
            </v-card>
            <Chat></Chat>
          </v-col>
      </v-row>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex"
import Videocalling from "@/components/video/Videocalling";
import Chat from "@/components/chat/Chat";
import Waiting from "@/components/chat/Waiting";

export default {
    // middleware: ['chat'],
    head() {
        return {
            title: this.alert !== null ? this.alert : "Wellcome to room"
        };
    },
    data(){
        return {
            alert: null
        }
    },
    mounted() {
        this.setRoomStatus(true)
        // window.onbeforeunload = function(){
        //     return "Are you sure you want to close the window?";
        // }
    },
    watch:{
        waiting(){
            if (this.user.type === "client") {
                this.alert = "Wellcome to room " + this.room._id
            }else{
                this.alert = "Incoming call. Guest [" + this.client._id +  "] user joined room " + this.room._id
            }
        }
    },
    computed: mapGetters({
        rooms: 'chat/getRooms',
        room: 'chat/getRoom',
        employee: 'chat/getEmployee',
        client: 'chat/getClient',
        user: 'chat/getUser',
        waiting : 'chat/getWaiting',
    }),
    methods:{
        ...mapActions({
            changeEmployeeStatus : 'chat/changeEmployeeStatus',
        }),
        setRoomStatus(status){
            const data = {
                id : this.employee._id,
                roomId : this.room._id,
                status : status
            }
            this.changeEmployeeStatus(data).then(() => {
                this.$socket.emit('updateActiveRooms', this.$store.state.chat.rooms)
            })
        },
        disconnect(){
            this.$router.push("/")
        }
    },
    beforeRouteLeave (to, from , next) {
        this.$socket.emit("stop", this.room._id);
        this.setRoomStatus(false)
        next()
    },
    // beforeMount() {
    //     window.addEventListener("beforeunload", event => {
    //         // window.confirm('Do you really want to leave this room? Redirect')
    //       // if (!this.isEditing) return
    //       event.preventDefault()
    //       // Chrome requires returnValue to be set.
    //       event.returnValue = ""
    //     })
    // }
}
</script>

<style>
</style>
