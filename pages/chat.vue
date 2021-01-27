<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm12>
      <!-- <v-btn @click="message">NEW MESSAGE</v-btn> -->

      <!-- <input type="text" name="" v-model="mess"> -->
      <!-- <v-text-field
        label="Main input"
        hide-details="auto"
        v-model="mess"
      ></v-text-field> -->

      <v-text-field label="enter message" v-model="mess"></v-text-field>
      <v-btn @click="message">Send MESSAGE</v-btn>

    </v-flex>
  </v-layout>
</template>

<script>
export default {
  sockets: {
    connect: function() {
      console.log("socket connected");
    }
  },
  // computed: {
  //     shareMessage(){
  //         this.$socket.on("newMessage", data => {
  //             console.log(data);
  //         });
  //     },
  // },
  data() {
      return {
          mess : ''
      }
  },
  mounted(){
      this.$socket.on("newMessage", data => {
          console.log(data, 'mlmml');
      });
  },
  methods: {
    message() {
      this.$socket.emit("createMessage", {
        text: this.mess
      });
    }
  }
};
</script>
