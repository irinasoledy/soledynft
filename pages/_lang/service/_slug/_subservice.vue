<template>
<div class="container">
    <div class="row expert-one-content" v-if="service">
        <div class="col-12 butons-service" id="serviceBtn">
            <v-btn
                @click="toggleDisplayExperts()"
                width="100%"
                color="primary"
                >
                {{ trans.Services.liveDiscussionBtn }}
            </v-btn>
            <div class="expert-one-experts" v-if="mobileExpertsDisplay">
                <v-card  v-if="employeeList.length > 0" :key="i" v-for="(item, i) in employeeList" >
                    <v-sheet class="pa-3 d-flex align-start">
                        <v-avatar>
                            <v-img
                                :src="`/avatars/${item.employee.avatar}`"
                                aspect-ratio="1"
                                class="grey lighten-2"
                                >
                            </v-img>
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

        <div class="col-12">
            <h3 class="display-1 text-left">
                {{ service.translation.name }}
            </h3>
        </div>

        <div class="col-md row">
            <div class="col-lg-3 col-md-4 side-block-wrap">
                <div class="side-block" id="sidebar">
                    <a v-for="anchor in service.blogs"
                        :key="anchor.id"
                        class="v-list-item v-list-item--link theme--light item-anchor"
                        :href="`#section${anchor.id}`"
                        @click.prevent="scrollTo(anchor.id)"
                        role="listitem"
                        tabindex="0">
                        {{ anchor.translation.name }}
                    </a>
                </div>
            </div>

            <div class="col-md sections-block">
                <div
                    v-for="anchor in service.blogs"
                    :key="anchor.id"
                    :id="`section${anchor.id}`"
                    class="section-block"
                    >
                    <h3 class="title">{{ anchor.translation.name }}</h3>
                    <div v-html="anchor.translation.body"></div>
                </div>

            </div>
        </div>

        <div class="col-lg-3 col-md-4 col-sm-12">
            <div class="expert-one-experts" id="experts">
                <div class="title mb-2" v-if="employeeList.length > 0">
                    {{ trans.Team.expertSectionTitle }}
                </div>

                <v-card  v-if="employeeList.length > 0" :key="i" v-for="(item, i) in employeeList" >
                    <v-sheet class="pa-3 d-flex align-start">
                        <v-avatar>
                            <v-img
                                :src="`/avatars/${item.employee.avatar}`"
                                aspect-ratio="1"
                                class="grey lighten-2"
                                >
                            </v-img>
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
import contentApi from '@/api/contentApi.js'

export default {
    data: () => ({
        dialog: false,
        service : null,
        employeeList: [],
        roomId: '',
        mobileExpertsDisplay: false,
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
        this.service = await this.allServices.find((serv) => serv.alias == this.$route.params.subservice)
        this.getEmployees()
        window.addEventListener('scroll', this.handleScroll);

        // const anchors = document.getElementsByClassName('item-anchor')[0];
        // console.log(anchors, anchors[0]);
        // const firstAnchors = anchors[0];
        // firstAnchors.classList.add("active")
    },
    methods: {
        ...mapActions({
            'setDefaultChangedEmployee' : 'setDefaultChangedEmployee',
            'setDefaultReject' : 'call/setDefaultReject',
            'setDefaultResponse' : 'call/setDefaultResponse',
            'setClientAsUser' : 'chat/setClientAsUser',
            'setUser' : 'chat/setUser',
        }),
        handleScroll(){
            const sidebar = document.getElementById('sidebar')
            const experts = document.getElementById('experts')
            const serviceBtn = document.getElementById('serviceBtn')

            if (window.scrollY > 85) {
                sidebar.classList.add("fixed")
                experts.classList.add("fixed")
                // serviceBtn.classList.add("fixed-btn")
            }else{
                sidebar.classList.remove("fixed")
                experts.classList.remove("fixed")
                // serviceBtn.classList.remove("fixed-btn")
            }

            if (window.scrollY > 35) {
                serviceBtn.classList.add("fixed-btn")
            }else{
                serviceBtn.classList.remove("fixed-btn")
            }
        },
        scrollTo(id){
            const element = document.getElementById('section' + id)
            const offsetTop = element.offsetTop - 150
            window.scrollTo(0, offsetTop)
        },
        toggleDisplayExperts(){
            this.mobileExpertsDisplay = !this.mobileExpertsDisplay
        },
        async getEmployees(){
            await contentApi.getEmployeesByService(this.service.id, response => {
                this.employeeList = response
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
    .butons-service{
        display: none;
    }

}
@media (max-width: 991px) {
    .side-block-wrap{
        display: none;
    }
    .expert-one-content{
        padding-top: 70px;
    }
    .v-application .display-1{
        font-size: 2rem !important;
    }
    .butons-service{
        display: block;
        max-width: 99%;
    }
}
.section-block {
    margin-bottom: 20px;
}
.section-block:last-child {
    margin-bottom: 0;
}
.side-block{
    border-left: 3px solid $custom_blue;
    min-width: 200px;
}
.fixed-btn{
    position: fixed;
    // margin-top: -80px;
    // background-color: #FFF;
    // padding: 30px;
    width: 100%;
    margin-top: -20px;
    // box-shadow: 0 3px 4px rgb(0 0 0 / 20%);
}
.fixed{
    position: fixed;
    margin-top: -80px;
    background-color: #FFF;
}
.v-application ul{
    padding-left: 20px !important;
}
.active{
    // color: $custom_blue;
}
</style>
