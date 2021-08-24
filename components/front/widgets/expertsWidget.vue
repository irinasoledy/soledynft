<template>
    <v-row align="center" justify="center">
        <v-col class="col-12">
            <h4 class=" p-subtitle">{{ $trans('General', 'freeConsultationMsg') }}</h4>
        </v-col>
        <v-row align="center" justify="center">
            <v-col class="col-lg-3 col-md-6 col-12 d-flex child-flex" v-for="(item, i) in experts" :key="i">
                <v-card class="prof">
                    <v-card-text class="prof__image">
                        <v-img
                            :src="`/avatars/${item.avatar}`"
                            aspect-ratio="1"
                            class="grey lighten-2"
                            >
                        </v-img>
                        <v-chip v-if="item.online === true" color="green" class="prof__indicator">Online</v-chip>
                    </v-card-text>
                    <v-card-actions class="text-center">
                        <h4>{{item.name}}</h4>
                    </v-card-actions>
                    <v-card-actions>
                        <v-btn
                            outlined
                            v-if="item.status"
                            color="primary"
                            @click="openVideoCall(item)"
                            >
                            <v-icon left>mdi-phone</v-icon>
                            Call
                        </v-btn>
                        <v-btn
                            outlined
                            color="primary"
                            @click="openDialog(item)"
                            >
                            <v-icon left>mdi-chat</v-icon>
                            Chat
                        </v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-row>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    computed: mapGetters({
        refreshUserData : 'dialog/getRefreshUserData',
        trans: 'getTranslations',
        experts: 'getExperts',
        changedEmployee : 'getChangedEmployee',
    }),
    watch: {
        async refreshUserData() { // To test this method...
            await this.getExpertsList()
        },
        async changedEmployee() {
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
    .v-badge {
        position: absolute;
        z-index: 4;
        top: 20px;
        left: 10px;
    }
    .p-title {
        text-align: left;
        color: $main-color;
        font-family: $font-titles;
        font-size: 25px;
        letter-spacing: -0.11px;
        text-align: center;
        text-transform: uppercase;
        line-height: 1.3;
    }
    .p-subtitle {
        text-align: center;
        font-size: 20px;
        color: $olive-color;
        letter-spacing: -0.11px;
        font-family: $font-titles;
    }
    .prof {
        padding-bottom: 15px;
    &__iamge {
        position: relative;
    }
    &__indicator {
        position: absolute;
        top: 35px;
        left: 35px;
    }
    .v-card__actions {
        display: flex;
        justify-content: center;
    }
    .v-btn {
        border-radius: 9px !important;
    }
    }
    .v-input--selection-controls {
        margin-top: 5px;
    }
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
