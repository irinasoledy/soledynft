<template lang="html">
    <v-row
        no-gutters
        style="height: 150px;"
    >
        <v-col cols="12" sm="6" md="3">
            <v-card
                max-width="100%"
                class="history-area"
                >
                <v-toolbar
                    color="#2c3e50"
                    dark
                    >
                    <div class="grey--text">
                        <b>{{ employee.name }}'s </b> clients list:
                    </div>
                </v-toolbar>
                <v-list two-line>
                    <v-list-item-group
                        v-model="selected"

                        >
                        <template v-for="(item, index) in users">
                            <v-list-item :key="item._id" @click="showMessages(item)">
                                <template v-slot:default="{ active }">
                                    <v-list-item-content>
                                        <v-list-item-title v-text="item.name"></v-list-item-title>
                                        <v-list-item-subtitle
                                            class="text--primary"
                                            v-text="item.headline"
                                            ></v-list-item-subtitle>
                                    </v-list-item-content>
                                    <v-list-item-action>
                                        <v-icon
                                            v-if="!active"
                                            color="grey lighten-1"
                                            >
                                            mdi-star-outline
                                        </v-icon>
                                        <v-icon
                                            v-else
                                            color="yellow darken-3"
                                            >
                                            mdi-star
                                        </v-icon>
                                    </v-list-item-action>
                                </template>
                            </v-list-item>
                            <v-divider
                                v-if="index < users.length - 1"
                                :key="index"
                                ></v-divider>
                        </template>
                    </v-list-item-group>
                </v-list>
            </v-card>
        </v-col>
        <v-col cols="12" sm="6" md="9">
            <AreaChat v-if="messages.length" :messages="messages" :client="client" :employee="employee"></AreaChat>
        </v-col>
    </v-row>
</template>

<script>

import AreaChat from "@/components/crm/widgets/chat/AreaChat"
import { mapActions, mapGetters } from "vuex"
import axios from "axios"
import crmApi from '@/api/crmApi'

export default {
    props: [
        'users',
        'employee'
    ],
    data: () => ({
        selected: [],
        messages: [],
        client: {},
    }),
    methods: {
        async showMessages(client){
            const id = client._id
            crmApi.getMessages(id, (response) => {
                this.messages = response.data
                this.client = client
            })
        }
    },
    components: {
        AreaChat
    },
}
</script>

<style media="screen">
.history-area{
    margin-top: -60px;
    height: calc(100vh - 100px);
    overflow-x: hidden;
}
</style>

