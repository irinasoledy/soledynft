<template lang="html">
    <div id="app" class="wrapp">
        <v-card
            max-width="100%"
            class="area-card"
            >
            <v-toolbar
                color="#2c3e50"
                dark
                class="fixed"
                >
                <v-col cols="12" md="6">
                    <div class="grey--text">
                        communication with <b>{{ client.name }}</b>
                    </div>
                </v-col>
                <v-col cols="12" md="6">
                    <div class="grey--text">
                        <v-chip class="ma-2" color="green" label text-color="white">
                            <v-icon left>mdi-email</v-icon>
                            {{ clientMessages }}
                        </v-chip>
                        <v-chip class="ma-2" color="#3f51b5" label text-color="white">
                            <v-icon left>mdi-email</v-icon>
                            {{ employeeMessages }}
                        </v-chip>
                        <v-chip class="ma-2" color="#8e44ad" label text-color="white">
                            <v-icon left>mdi-phone</v-icon>
                            {{ calls }}
                        </v-chip>
                    </div>
                </v-col>
            </v-toolbar>
            <v-container class="fill-height">
                <v-row class="fill-height pb-14" align="end">
                    <v-col>
                        <div v-for="(item, index) in messages" :key="index"
                            :class="['d-flex flex-row align-center my-2', item.sendBy == 'client' ? 'justify-end': null]">
                            <span v-if="item.sendBy == 'client'" class="mess message-client mr-3">
                            {{ item.message }}
                            <small>{{ getTimeAgo(item.date) }}</small>
                            </span>
                            <v-tooltip top>
                                <template v-slot:activator="{ on, attrs }">
                                    <v-avatar :color="item.sendBy == 'client' ? 'indigo': '#27ae60'" size="36" v-bind="attrs"
                                        v-on="on">
                                        <span v-if="item.sendBy == 'client'" class="white--text">{{ item.employee.name[0] }}</span>
                                        <span v-else class="white--text">{{ item.client.name[0] }}</span>
                                    </v-avatar>
                                </template>
                                <span v-if="item.sendBy != 'client'">{{ item.client.name }}</span>
                                <span v-else>{{ item.employee.name }}</span>
                            </v-tooltip>
                            <span v-if="item.sendBy != 'client'" class="mess message-employee ml-3">
                            {{ item.message }}
                            <small>{{ getTimeAgo(item.date) }}</small>
                            </span>
                        </div>
                    </v-col>
                </v-row>
            </v-container>
            <!-- <div fixed>
                <v-container class="ma-0 pa-0">
                  <v-row no-gutters>
                    <v-col>
                      <div class="d-flex flex-row align-center">
                        <v-text-field v-model="msg" placeholder="Type Something" @keypress.enter="send"></v-text-field>
                        <v-btn icon class="ml-4" @click="send"><v-icon>mdi-send</v-icon></v-btn>
                      </div>
                    </v-col>
                  </v-row>
                </v-container>
                </div> -->
        </v-card>
    </div>
</template>

<script>
export default {
  props: ['messages', 'client', 'employee'],
  data(){
    return {
        clientMessages: 0,
        employeeMessages: 0,
        calls: 0,
    }
  },
  watch: {
      messages(){
          this.clientMessages = 0
          this.employeeMessages = 0
          this.messagesCount()
      }
  },
  mounted(){
      this.messagesCount()
  },
  methods: {
      messagesCount(){
          this.messages.forEach((message) => {
              if (message.sendBy == "client") {
                  this.clientMessages++
              }else{
                  this.employeeMessages++
              }
          })
      },
      dateToYMD(date) {
          let strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
          let mins = date.getMinutes();
          let h = date.getHours();
          let d = date.getDate();
          let m = strArray[date.getMonth()];
          let y = date.getFullYear();

          return h + ':' + mins + ' ' + (d <= 9 ? '0' + d : d) + '/' + m + '/' + y;
      },
      getTimeAgo(date){
          return this.dateToYMD(new Date(date))
      },
    send: function(){
      this.chat.push(
      {
        from: "user",
        msg: this.msg
      })
      this.msg = null
      this.addReply()
    },
    addReply(){
      this.chat.push({
        from: "sushant",
        msg: "Hmm"
      })
    }
  }
}
</script>

<style lang="css" scoped>
.wrapp{
    position: relative !important;
}
.area-card{
    margin-top: -60px;
    height: calc(100vh - 100px);
    overflow-x: hidden;
}
.message-client{
    padding: 15px;
    background-color: #3f51b5;
    color: #FFF;
    border-radius: 7px;
    font-size: 14px;
    margin-bottom: 10px;

}
.message-employee{
    padding: 15px;
    background-color: #27ae60;
    color: #FFF;
    border-radius: 7px;
    font-size: 14px;
    margin-bottom: 10px;
}
.mess{
    position: relative;
}
.mess small{
    position: absolute;
    display: block;
    bottom: -15px;
    color: #AAA;
    min-width: 105px;
}
.message-client small{
    right: 0 !important;
}
.message-employee small{
    left: 0 !important;
}
.fixed{
    position: fixed;
    width: 100%;
    z-index: 9;
}
.v-toolbar{
    position: relative;
}
</style>
