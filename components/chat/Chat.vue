<template>
    <div>
        <v-card class="pa-2 full-height" outlined tile >
            <div class="c-chat" ref="block">
                <Message
                    v-for="m in messages"
                    :key="m.text"
                    :name="m.name"
                    :text="m.text"
                    :owner="m.id === user._id"
                />
            </div>
            <div class="c-form">
                <ChatForm/>
            </div>
        </v-card>
    </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
import Message from "@/components/chat/Message";
import ChatForm from "@/components/chat/ChatForm";

export default {
    computed: mapGetters({
           'messages': 'chat/getMessages',
           'user': 'chat/getUser',
           'messages': 'chat/getMessages',
           'room': 'call/getRoomId',
       }),
    watch: {
        messages(){
            setTimeout(() => {
              this.$refs.block.scrollTop = this.$refs.block.scrollHeight;
            });
        }
    },
    mounted(){
        if (this.user.type === "client") {
            this.getClientMessages(this.user._id).then(() => {
                this.$socket.emit("shareHistory", {roomId: this.room, messages: this.messages})
            })
        }
    },
    methods: {
        ...mapActions({
            "getClientMessages" : "chat/getClientMessages"
        })
    }
}
</script>

<style scoped>
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
    /* background: #212121; */
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
    /* height: calc(100vh - 64px); */
    height: 80vh;
}
</style>
