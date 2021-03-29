<template>
    <v-card v-if="notifications.length">
        <v-toolbar text dense color="transparent">
            <v-toolbar-title><h4>Notifications</h4></v-toolbar-title>
        </v-toolbar>
        <v-divider></v-divider>
        <v-card-text class="pa-0">
            <v-list two-line class="pa-0" >
                <template v-for="(item, index) in notifications">
                    <v-list-item :key="item._id" @click="handleClick">
                        <v-list-item-avatar >
                            <img :src="item.avatar">
                        </v-list-item-avatar>
                        <v-list-item-content>
                            <v-list-item-title v-html="item.title"></v-list-item-title>
                            <v-list-item-subtitle v-html="item.user.type"></v-list-item-subtitle>
                        </v-list-item-content>
                        <v-list-item-content>
                            {{ getTimeAgo(item.date) }}
                        </v-list-item-content>
                    </v-list-item>
                </template>
            </v-list>
            <v-divider></v-divider>
            <v-btn block text class="ma-0" v-if="items.length">All</v-btn>
            <v-divider></v-divider>
        </v-card-text>
    </v-card>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        items: {},
    }),
    computed: mapGetters({
        'notifications' : 'admin/getNotifications'
    }),
    mounted(){
        setInterval(() => {
            this.getNotifications()
        }, 90000)
        this.getNotifications()
    },
    methods: {
        ...mapActions({
            'getNotifications' : 'admin/getNotifications'
        }),
        handleClick: (e) => {
            console.log(e);
        },
        timeSince(date) {
          let seconds = Math.floor((new Date() - date) / 1000);
          let interval = seconds / 31536000;

          if (interval > 1) {
            return Math.floor(interval) + " years ago" + " ("+this.dateToYMD(date) + ")"
          }
          interval = seconds / 2592000;
          if (interval > 1) {
            return Math.floor(interval) + " months ago" + " ("+this.dateToYMD(date) + ")"
          }
          interval = seconds / 86400;
          if (interval > 1) {
            return Math.floor(interval) + " days ago" + " ("+this.dateToYMD(date) + ")"
          }
          interval = seconds / 3600;
          if (interval > 1) {
            return Math.floor(interval) + " hours ago"
          }
          interval = seconds / 60;
          if (interval > 1) {
            return Math.floor(interval) + " minutes ago"
          }
          return "now"
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
            return this.timeSince(new Date(date))
        }
    },
};

</script>
