<template>
<div class="container">
    <div class="row expert-one-content" v-if="service">
        <div class="col-12">
            <v-title class="display-1 text-center">
                {{ service.translation.name }}
            </v-title>
        </div>
        <div class="col-md row" v-html="service.translation.description" v-if="service.translation.description"></div>
        <div class="col-md row" v-else>
            No content
        </div>
        <div class="col-lg-3 col-md-4 col-sm-12">
            <div class="expert-one-experts">
                <div class="title mb-2">
                    {{ trans.Team.expertSectionTitle }}
                </div>
                <v-card v-for="(item, i) in employeeList" :key="i" v-if="employeeList.length">
                    <v-sheet class="pa-3 d-flex align-start">
                        <v-avatar>
                            <img src="/avatar/man_4.jpg" alt="jhon">
                            <span class="mark"></span>
                        </v-avatar>
                        <v-card-text class="pa-0 ml-2" v-if="item.employee">
                            {{ item.employee.name }}
                            <p class="caption">
                                {{ item.employee.type }}
                            </p>
                            <v-sheet class="consultation" color="secondary">
                                {{ trans.Services.freeConsultation }}
                            </v-sheet>
                        </v-card-text>
                    </v-sheet>
                    <v-divider class="mb-2 mt-1"></v-divider>
                    <v-card-actions>
                        <!-- <v-btn color="primary" outlined><v-icon>mdi-chat</v-icon>Message</v-btn> -->
                        <v-btn color="primary" outlined @click="call(item.employee)" v-if="item.employee.status === true">
                            <v-icon>
                                mdi-phone
                            </v-icon>
                            {{ trans.Team.specialistBtnChat }}
                        </v-btn>
                        <p v-else>{{ trans.Team.specialistNotOnline }}</p>
                        <!-- <v-btn color="primary" nuxt exact to="/calendar"><v-icon>mdi-book</v-icon>Programeaza-te</v-btn> -->
                    </v-card-actions>
                </v-card>
            </div>
        </div>
    </div>
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
</div>
</template>

<script>

import axios from "axios"
import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        dialog: false,
        service : null,
        employeeList: [],
        roomId: '',
    }),
    watch:{
        changedEmployee(){ // cerez jopu...
            if (this.changedEmployee !== null) {
                const employeeList = this.employeeList.find(service => {
                    if (service.employee._id == this.changedEmployee._id) {
                        return service.employee.status = this.changedEmployee.status
                    }
                })
            }
            this.setDefaultChangedEmployee()
        },
        reject(){
            this.dialog = false
            this.setDefaultReject()
        },
        response(){
            this.$socket.emit("joinRoomAsClient", {roomId : this.roomId, client : this.user}, async response => {
                await this.setUser(this.user)
                this.$router.push("/conference")
            });
            this.setDefaultResponse()
        }
    },
    computed: mapGetters({
        services : 'getServices',
        allServices : 'getAllServices',
        language : 'getLanguage',
        changedEmployee : 'getChangedEmployee',
        reject : 'call/getReject',
        response : 'call/getResponse',
        roomId : 'call/getRoomId',
        user: 'chat/getUser',
        trans: 'getTranslations'
    }),
    async mounted(){
        this.service = await this.allServices.find((serv) => serv.id == this.$route.params.id)
        this.getEmployees()
    },
    methods: {
        ...mapActions({
            'setDefaultChangedEmployee' : 'setDefaultChangedEmployee',
            'setDefaultReject' : 'call/setDefaultReject',
            'setDefaultResponse' : 'call/setDefaultResponse',
            'setClientAsUser' : 'chat/setClientAsUser',
            'setUser' : 'chat/setUser',
        }),
        async getEmployees(){
            await axios.post(`/employees-by-service`, {service: this.service.id}).then((response) => {
                this.employeeList = response.data
            })
        },
        call(employee){
            this.roomId = employee._id
            this.dialog = true
            this.$socket.emit('call', this.roomId)
        }
    }
}
</script>

<style lang="scss" scoped>
.expert-one-experts .v-card {
    margin-bottom: 30px;
}

.expert-one-experts .v-btn {
    margin-bottom: 10px;
}

.v-card__actions {
    flex-wrap: wrap;
    justify-content: space-around;
}

.consultation {
    background-color: rgba(0, 0, 0, 0.3);
    color: #ffff;
    text-align: center;
}

.caption {
    line-height: 1.3;
}

.expert-one-content {
    padding-top: 130px;
}

.list-expert-one {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: scroll;
    border-bottom: 2px solid rgba(0, 0, 0, 0.3) !important;
    padding: 0;
}

.list-expert-one a {
    white-space: nowrap;
}

.list-expert-one--active {
    color: $custom_blue;
    font-weight: 700;
}

.buttons-expert {
    position: fixed;
    top: 56px;
    left: 0;
    right: 0;
    z-index: 2;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 15px;
}

.buttons-expert .v-btn {
    padding: 5px !important;
}

@media (min-width: 991px) {
    .expert-one-content {
        padding-top: 150px;
    }
    .list-expert-one {
        display: block;
        overflow: auto;
        border-bottom: 0;
    }
    .list-expert-one a {
        white-space: normal;
        padding-top: 5px;
        padding-bottom: 5px;
    }
    .buttons-expert {
        position: static;
        display: block;
        .v-btn {
            margin-bottom: 10px;
        }
    }
}

.section-block {
    padding-top: 120px;
}

.sections-block {
    margin-top: -100px;
}
</style>
