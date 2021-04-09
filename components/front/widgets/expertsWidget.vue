<template>
    <section class="experts">
        <v-container color="primary">
            <v-row>
                <v-col cols="12 experts-heading">
                    <div class="display-1 text-center c-title">
                        {{ trans.HP.hpDiscussLive }}
                    </div>
                    <p class="text-center text">
                        {{ trans.HP.hpWeArePround }}
                    </p>
                </v-col>
                <v-col
                    v-for="(item, i) in experts"
                    :key="i"
                    class="col-lg-4 col-md-6 col-12 d-flex child-flex"
                    >
                    <v-card>
                        <v-img
                            :src="`/avatars/${item.avatar}`"
                            aspect-ratio="1"
                            class="grey lighten-2"
                            >
                        </v-img>
                        <v-card-title class="title justify-center">
                            {{item.name}}
                        </v-card-title>
                        <v-card-subtitle class="text-center">
                            {{item.type}}
                        </v-card-subtitle>
                        <v-card-actions
                            class="pb-5 justify-center"
                            >
                            <v-btn
                                color="secondary"
                                @click="openVideoCall(item)"
                                >
                                <v-icon left>mdi-phone</v-icon>
                                {{ trans.Team.specialistBtnChat }}
                            </v-btn>
                            <v-btn
                                color="info"
                                @click="openDialog(item)"
                                >
                                <v-icon left>mdi-chat</v-icon>
                                {{ trans.Team.companyMainAddress }}
                            </v-btn>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    computed: mapGetters({
        refreshUserData : 'dialog/getRefreshUserData',
        trans: 'getTranslations',
        experts: 'getExperts'
    }),
    watch: {
        async refreshUserData() { // To test this method...
            await this.getExpertsList()
        },
    },
    mounted(){
        this.getExpertsList()
    },
    methods: {
        ...mapActions({
            getExpertsList: 'getExpertsList',
            setInterlocutor : 'dialog/setInterlocutor',
            initCall : 'dialog/initCall',
        }),
        openDialog(user) {
            this.setInterlocutor(null)
            this.setInterlocutor(user)
        },
        openVideoCall(user) {
            this.initCall(user)
        }
    }
}
</script>

<style scoped lang="scss">
    .experts{
        background-color: $custom_blue;
    }
    .experts-heading .display-1{
        color: #FFF !important
    }
    .experts-heading{
        color: #FFF !important;
    }
    .experts-heading p{
        max-width: 500px;
        margin: 20px auto;
    }
</style>
