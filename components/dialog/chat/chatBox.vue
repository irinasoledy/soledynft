<template>
    <div>
        <v-card class="pa-2 dialog--wrapp" outlined tile >
            <div class="c-chat" ref="block">
                <chatMessages
                    v-for="message in messages"
                    :key="message._id"
                    :message="message"
                    :owner="message.sendBy === user.type"
                />
            </div>
            <div class="c-form">
                <chatForm :interlocutor="interlocutor" :mode="mode"/>
            </div>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex"
import chatApi from '@/api/chatApi'
import chatForm from "@/components/dialog/chat/chatForm"
import chatMessages from "@/components/dialog/chat/chatMessages"

export default {
    props: ['interlocutor', 'mode'],
    data: () => ({
        // messages: {},
    }),
    computed: mapGetters({
           'messages': 'dialog/getMessages',
           'user': 'chat/getUser',
           'room': 'call/getRoomId',
       }),
    watch: {
        interlocutor(){
            this.getMessages()
        },
        messages(){
            setTimeout(() => {
              this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
            });
        }
    },
    mounted(){
        this.getMessages()

        if (this.user.type === "client") {
            this.getClientMessages(this.user._id).then(() => {
                this.$socket.emit("shareHistory", {roomId: this.room, messages: this.messages})
            })
        }
    },
    methods: {
        ...mapActions({
            'getClientMessages' : 'chat/getClientMessages',
            'getMessagesBySession' : 'dialog/getMessages'
        }),
        getMessages(){
            const data = {
                userId: this.user._id,
                interlocutorId: this.interlocutor._id
            }

            this.getMessagesBySession(data)
        }
    },
    components: {
        chatForm, chatMessages
    }
}
</script>

<style>
.c-wrap {
    height: 100%;
    position: relative;
    overflow: hidden;
    max-width: 300px;
}
.c-form {
    /* position: absolute;
    bottom: 0;
    left: 0;
    right: 0; */
    padding: 1rem;
    height: 80px;
}
.c-chat {
    /* position: absolute;
    top: 0;
    right: 0;
    left: 0;
    bottom: 80px; */
    height: calc(100vh - 311px);
    padding: 1rem;
    overflow-y: auto;
}
.chat-area{
    width: 300px;
}
.full-height{
    border: 1px solid red;
    height: 300px;
}
.dialog--wrapp{
    position: relative;
}
</style>
