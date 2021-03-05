<template>

    <v-container grid-list-xl fluid>
        <v-flex lg3>
            <v-card>
                <name-card v-bind="user"></name-card>
                <v-card-actions>
                    <v-switch :label="userStatus ? 'Online': 'Offline'" v-model="userStatus"></v-switch>
                </v-card-actions>
            </v-card>
        </v-flex>

        <v-layout row wrap>
            <v-flex lg12 sm12 xs12>
                <message-list></message-list>
            </v-flex>
        </v-layout>


    <v-layout row wrap>
        <v-flex sm12>
          <h3 class="text-sm-center font-weight-medium">Clients</h3>
        </v-flex>
        <v-flex lg12>
          <v-card>
            <v-toolbar color="white">
              <v-text-field
                text
                solo
                prepend-icon="mdi-magnify"
                placeholder="Type something"
                v-model="search"
                hide-details
                class="hidden-sm-and-down"
              ></v-text-field>
              <v-btn icon>
                <v-icon>mdi-filter</v-icon>
              </v-btn>
            </v-toolbar>
            <v-divider></v-divider>
            <v-card-text class="pa-0">
              <v-data-table
                :headers="tableData.headers"
                :search="search"
                :items="clients"

                class="elevation-1"
                item-key="name"
                v-model="tableData.selected"
              >
                <template v-slot:[`item`]="{ item }">
                  <tr>
                  <td>
                    <v-avatar size="32">
                      <img :src="item.avatar" alt="">
                    </v-avatar>
                  </td>
                  <td>
                    <span>{{ item.name }}</span>
                  </td>
                  <td>
                    <span>{{ item.email }}</span>
                  </td>
                  <td>
                    <v-btn  outlined  fab dark color="primary" small :to="'/back/history/client/' + item._id">
                      <v-icon>mdi-mail</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn depressed outlined icon fab dark color="primary" small :to="'/back/clients/edit/' + item._id">
                      <v-icon>mdi-pencil</v-icon>
                    </v-btn>
                  </td>
                  <td>
                    <v-btn depressed outlined icon fab dark color="pink" small @click="remove(item)">
                      <v-icon>mdi-delete</v-icon>
                    </v-btn>
                  </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card-text>
          </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import { Items as Users } from '@/util/user'
import { mapGetters, mapActions } from 'vuex'

export default {
    layout: "dashboard",
    middleware: ['admin'],
    data() {
        return {
            picker: null,
            picker2: null,
            arrayEvents: null,
            date1: null,
            date2: null,
            date: null,
            menu: false,
            modal: false,
            tableData: {
                selected: [],
                headers: [
                    { text: 'Avatar', value: 'avatar' },
                    { text: 'Name', value: 'name' },
                    { text: 'Email', value: 'email' },
                    { text: 'History', value: 'history' },
                    { text: 'Edit', value: 'edit' },
                    { text: 'Delete', value: 'delete' }
                ],
                items: Users
            },
            search: '',
        };
    },
    mounted() {
        this.arrayEvents = [...Array(6)].map(() => {
            const day = Math.floor(Math.random() * 30);
            const d = new Date();
            d.setDate(day);
            return d.toISOString().substr(0, 10);
        });
        this.getClientsList()
        // console.log(this.clients, 'mlcmsd');
    },
    computed: {
        user: {
            get() {
                return this.authUser()
            }
        },
        userStatus: {
            get(){
                return this.status()
            },
            set(status){
                this.setUserStatus({status, emploeeId: this.user._id}).then(() => {
                    this.$socket.emit('shareEmployeeStatus', this.user)
                })
            }
        },
        clients: {
            get(){
                return this.clientList()
            }
        }
    },
    methods: {
        ...mapActions({
            'setUserStatus': 'admin/setUserStatus',
            'getClientsList': 'admin/getClientsList',
            'removeClient' : 'admin/removeClient'
        }),
        ...mapGetters({
            authUser: 'admin/getAuthUser',
            status: 'admin/getStatus',
            clientList: 'admin/getClients'
        }),
        remove(item){
            this.removeClient(item._id)
        },
        functionEvents(date) {
            const [, , day] = date.split('-');
            return parseInt(day, 10) % 3 === 0;
        },
        handleClick: (e) => {
            console.log(e);
        }
    }
};
</script>

<style scoped>
  .subheading {
    font-weight: 500;
    font-size: 18px !important;
  }
  .caption {
    font-weight: 400;
    font-size: 16px !important;
  }
  td, th {
    font-size: 14px !important;
  }
    .v-input--selection-controls {
    margin-top: 0 !important;
    padding-top: 0 !important;
  }
</style>
