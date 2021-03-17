<template lang="">
    <v-layout row wrap>
        <v-flex lg12>
            <v-card>
                <v-divider></v-divider>
                <v-card-text class="pa-0">
                    <v-data-table
                        :headers="tableData.headers"
                        :search="search"
                        :items="actions"
                        class="elevation-1"
                        item-key="name"
                        v-model="tableData.selected"
                        >
                        <template v-slot:[`item`]="{ item, index }">
                        <tr v-if="item.userId">
                            <td>{{ index + 1 }} </td>
                            <td>
                                <span>{{ item.userId.name }}</span>
                            </td>
                            <td>
                                <span>{{ item.userId.cookies }}</span>
                            </td>
                            <td>
                                <span>{{ item.status }}</span>
                            </td>
                            <td>
                                <v-badge
                                    v-if="item.online === true"
                                    value="2"
                                    color="green"
                                    >
                                </v-badge>
                                <v-badge
                                    v-else
                                    value="2"
                                    color="yellow"
                                    >
                                </v-badge>
                            </td>
                            <td>
                                <span>{{ item.logged }}</span>
                            </td>
                            <td>
                                <span>{{ item.assignedManager ? item.assignedManager : '----' }}</span>
                            </td>
                            <td>
                                <span>{{ item.visitsQty }}</span>
                            </td>
                            <td>
                                <span v-if="item.visitsMin == 0">less then 1 min</span>
                                <span v-else>{{ item.visitsMin }} min</span>
                            </td>
                            <td>
                                <span>{{ getTimeAgo(item.lastVisit) }}</span>
                            </td>
                            <td>
                                <span>{{ item.currentPage }}</span>
                            </td>
                            <td>
                                <v-btn  outlined  fab dark color="primary" small :to="'/back/history/client/' + item.userId._id">
                                    <v-icon>mdi-mail</v-icon>
                                </v-btn>
                            </td>
                            <td>
                                <v-btn depressed outlined icon fab dark color="primary" small :to="'/back/clients/edit/' + item.userId._id">
                                    <v-icon>mdi-pencil</v-icon>
                                </v-btn>
                            </td>
                            <td>
                                <v-btn depressed outlined icon fab dark color="primary" small @click="call(item.userId)">
                                    <v-icon>mdi-phone</v-icon>
                                </v-btn>
                            </td>
                            <td>
                                message
                            </td>
                            <td>
                                <v-btn depressed outlined icon fab dark color="pink" small @click="remove(item.userId)">
                                    <v-icon>mdi-delete</v-icon>
                                </v-btn>
                            </td>
                        </tr>
                        </template>
                    </v-data-table>
                </v-card-text>
            </v-card>
        </v-flex>
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
                <v-card-text>
                    Connecting to {{ roomId }}...
                    <v-progress-linear
                        indeterminate
                        color="white"
                        class="mb-0"
                    ></v-progress-linear>
                </v-card-text>
            </v-card>
        </v-dialog>
    </v-layout>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    layout: 'dashboard',
    data: () => ({
        roomId: false,
        dialog: false,
        tableData: {
            selected: [],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'Name', value: 'name' },
                { text: 'Cookie', value: 'coookie' },
                { text: 'Status', value: 'status' },
                { text: 'Online', value: 'online' },
                { text: 'Logged', value: 'logged' },
                { text: 'Assigned Manager', value: 'assigned manager' },
                { text: 'Site visits qty', value: 'visits qty' },
                { text: 'Site visits min', value: 'visits min' },
                { text: 'Last visit', value: 'last visit' },
                { text: 'Current page', value: 'current page' },
                { text: 'History', value: 'history' },
                { text: 'Edit', value: 'edit' },
                { text: 'Call', value: 'call' },
                { text: 'Message', value: 'message' },
                { text: 'Delete', value: 'delete' }
            ],
        },
        search: '',
    }),
    computed: mapGetters({
        authUser: 'admin/getAuthUser',
        clients: 'admin/getClients',
        actions: 'admin/getActions'
    }),
    mounted(){
        this.getClientsList()
    },
    methods: {
        ...mapActions({
            'getClientsList': 'admin/getClientsList',
            'removeClient' : 'admin/removeClient'
        }),
        call(client){
            this.roomId = client._id
            this.dialog = true
            this.$socket.emit('call', this.roomId)
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
    }
}
</script>
