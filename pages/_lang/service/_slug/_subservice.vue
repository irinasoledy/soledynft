<template>
    <main>
        <v-container>
            <v-row class="row expert-one-content" v-if="service">
                <div class="col-12 butons-service" id="serviceBtn">
                    <v-btn
                        class="costum-btn-service"
                        @click="scrollExpertsBlock"
                        width="100%"
                    >
                        {{ trans.Services.liveDiscussionBtn }}
                        <v-icon>
                            mdi-sort
                        </v-icon>
                    </v-btn>
                </div>

                <div class="col-12">
                    <h3 class="display-1 text-left">
                        {{ service.translation.name }}
                    </h3>
                </div>

                <div class="col-lg-3 col-md-3 side-block-wrap">
                    <div class="side-block" id="sidebar">

                        <cart-btn v-if="$auth.loggedIn" :user="$auth.user" :service="service"/>

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
                    <div class="text-center">
                        <v-btn color="secondary medium-width" @click="$nuxt.$emit('open-appointment-form')">
                            {{ trans.Services.liveDiscussionBtn }}
                        </v-btn>
                    </div>
                </div>

                <div class="col-lg-3 col-md-4 col-sm-12 experts-wrapp">
                    <div class="expert-one-experts" id="experts">
                        <div class="title mb-2" v-if="employeeList.length > 0">
                            {{ trans.Team.expertSectionTitle }}
                        </div>

                        <v-card
                            v-if="employeeList.length > 0"
                            v-for="(item, i) in employeeList"
                            :key="i"
                            align="center" justify="center"
                        >
                            <v-badge
                                v-if="item.employee.status === true"
                                bordered
                                bottom
                                color="#27ae60"
                                content="ONLINE"
                                offset-x="10"
                                offset-y="10"
                            >
                            </v-badge>
                            <v-avatar size="115" color="primary" class="mx-auto">
                                <img :src="`/avatars/${item.employee.avatar}`">
                            </v-avatar>

                            <v-card-title class="title justify-center operator-title">
                                {{ item.employee.name }}
                            </v-card-title>
                            <v-card-subtitle class="text-center operator-position">
                                {{ trans.Team[item.employee.position] }}
                            </v-card-subtitle>
                            <v-card-actions class="pb-5 justify-center operator-btns">
                                <v-btn
                                    v-if="item.employee.status"
                                    color="secondary"
                                    @click="openVideoCall(item.employee)"
                                >
                                    <v-icon left>mdi-phone</v-icon>
                                    {{ trans.Team.specialistBtnChat }}
                                </v-btn>
                                <v-btn
                                    color="info"
                                    @click="openDialog(item.employee)"
                                >
                                    <v-icon left>mdi-chat</v-icon>
                                    {{ trans.Team.companyMainAddress }}
                                </v-btn>
                            </v-card-actions>
                        </v-card>
                    </div>
                </div>
            </v-row>
        </v-container>
        <appointment-form></appointment-form>
    </main>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import contentApi from '@/api/contentApi.js'
import cartBtn from "@/components/front/cart/cartBtn"

export default {
    layout: "default",
    components: { cartBtn },
    head() {
        return {
            title: this.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.description
                }
            ]
        }
    },
    data: () => ({
        title: '',
        description: '',
        dialog: false,
        service: null,
        employeeList: [],
        mobileExpertsDisplay: false,
    }),
    watch: {
        refreshUserData() { // To test this method...
            this.getEmployees()
        },
        changedEmployee() {
            this.getEmployees()
        },
        reject() {
            this.dialog = false
            this.setDefaultReject()
        },
        response() {
            this.$socket.emit("joinRoomAsClient", {roomId: this.roomId, client: this.user}, async response => {
                await this.setUser(this.user)
                this.$router.push("/conference")
            });
            this.setDefaultResponse()
        }
    },
    computed: mapGetters({
        refreshUserData: 'dialog/getRefreshUserData',
        services: 'getServices',
        allServices: 'getAllServices',
        language: 'getLanguage',
        changedEmployee: 'getChangedEmployee',
        reject: 'call/getReject',
        response: 'call/getResponse',
        roomId: 'call/getRoomId',
        user: 'chat/getUser',
        trans: 'getTranslations'
    }),
    async mounted() {
        this.service = await this.allServices.find((serv) => serv.alias == this.$route.params.subservice)
        this.getEmployees()
        window.addEventListener('scroll', this.handleScroll);
        this.title = this.service.translation.seo_title
        this.description = this.service.translation.seo_description
    },
    methods: {
        ...mapActions({
            setDefaultChangedEmployee: 'setDefaultChangedEmployee',
            setDefaultReject: 'call/setDefaultReject',
            setDefaultResponse: 'call/setDefaultResponse',
            setClientAsUser: 'chat/setClientAsUser',
            setUser: 'chat/setUser',
            setInterlocutor: 'dialog/setInterlocutor',
            initCall: 'dialog/initCall',
        }),
        openVideoCall(user) {
            this.initCall(user)
        },
        openDialog(user) {
            this.setInterlocutor(null)
            this.setInterlocutor(user)
        },
        handleScroll() {
            const sidebar = document.getElementById('sidebar')
            const experts = document.getElementById('experts')
            const serviceBtn = document.getElementById('serviceBtn')

            if (sidebar) {
                if (!this.$mobileDetect.mobile()) {
                    if (window.scrollY > 85) {
                        sidebar.classList.add("fixed")
                        experts.classList.add("fixed")
                    } else {
                        sidebar.classList.remove("fixed")
                        experts.classList.remove("fixed")
                    }
                }

                if (window.scrollY > 35) {
                    serviceBtn.classList.add("fixed-btn")
                } else {
                    serviceBtn.classList.remove("fixed-btn")
                }
            }
        },
        scrollTo(id) {
            const element = document.getElementById('section' + id)
            const offsetTop = element.offsetTop - 150
            window.scrollTo(0, offsetTop)
        },
        scrollExpertsBlock() {
            const element = document.getElementById('experts')
            const offsetTop = element.offsetTop - 175
            window.scrollTo(0, offsetTop)
        },
        async getEmployees() {
            await contentApi.getEmployeesByService(this.service.id, response => {
                this.employeeList = response
            })
        },
        call(employee) {
            this.roomId = employee._id
            this.dialog = true
            this.$socket.emit('call', this.roomId)
        }
    }
}
</script>

<style lang="scss">
.experts-wrapp {
    .v-badge {
        position: absolute;
        z-index: 9;
        top: 20px;
        left: 10px;
    }
}

#experts .v-card {
    margin-bottom: 30px;
    // max-width: 300px !important;
    // overflow-y: scroll;
}

#experts .v-btn {
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
    .butons-service {
        display: none;
    }

}

@media (max-width: 991px) {
    .side-block-wrap {
        display: none;
    }
    .expert-one-content {
        padding-top: 62px;
    }
    .v-application .display-1 {
        font-size: 2rem !important;
    }
    .butons-service {
        display: block;
        max-width: 99%;
        background-color: #FFF;
        padding: 20px;
        box-shadow: 0 3px 4px rgb(0 0 0 / 20%)
    }
    .costum-btn-service {
        color: $custom_blue !important;
        border: 1px solid $custom_blue;
        box-shadow: none;
        background-color: #FFF !important;
    }
    .expert-one-experts {
        width: 100% !important;
    }
}

.section-block {
    margin-bottom: 20px;
}

.section-block:last-child {
    margin-bottom: 0;
}

.side-block {
    border-left: 3px solid $custom_blue;
    min-width: 200px;
}

.fixed-btn {
    position: fixed;
    width: 100%;
    margin-top: -6px;
    z-index: 4;
    left: .5%;
}

.fixed {
    position: fixed;
    margin-top: -80px;
    background-color: #FFF;
}

.expert-one-experts {
    max-height: 85vh;
    overflow: scroll;
    width: 300px;
}

.v-application ul {
    padding-left: 20px !important;
}

.medium-width {
    min-width: 90% !important;
}

.operator-title {
    line-height: 1;
    margin-top: -10px;
}

.operator-position {
    line-height: 1;
    margin-top: -10px;
}

.operator-btns {
    line-height: 1;
    margin-top: -18px;
}
.add-to-cart-btn {
    margin-left: 15px;
}
</style>
