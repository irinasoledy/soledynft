<template lang="html">
    <v-container v-if="policy">
        <v-row>
            <v-col lg="9" cols="12">
                <p>
                    {{ trans.Policies.cookieNotificationTitle }}
                </p>
                <ul class="policies-list">
                    <li>
                        <v-switch
                            :label="trans.Policies.cookieNotificationOption1"
                            v-model="policies.agreementUsing"
                        ></v-switch>
                    </li>
                    <li>
                        <v-switch
                            :label="trans.Policies.cookieNotificationOption2"
                            v-model="policies.agreementAnalyzing"
                        ></v-switch>
                    </li>
                    <li>
                        <v-switch
                            :label="trans.Policies.cookieNotificationOption3"
                            v-model="policies.agreementContact"
                        ></v-switch>
                    </li>
                    <li>
                        <v-switch
                            :label="trans.Policies.cookieNotificationOption4"
                            v-model="policies.agreementProtect"
                        ></v-switch>
                    </li>
                </ul>
                <v-row class="align-center justify-center">
                    <v-col lg="6">
                        <v-btn
                            width="100%"
                            class="secondary custom-btn"
                            @click="savePolicy"
                            >
                            {{ trans.Policies.cookieNotificationBtn1 }}
                        </v-btn>
                    </v-col>
                    <v-col lg="6" >
                        <PolicyDialog />
                    </v-col>
                </v-row>

            </v-col>
            <v-col></v-col>
        </v-row>
    </v-container>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'
import PolicyDialog from './PolicyDialog'

export default {
    data: () => ({
        policies: {
            agreementUsing : true,
            agreementAnalyzing : true,
            agreementContact : true,
            agreementProtect : true,
        },
    }),
    computed: mapGetters({
        trans: 'getTranslations',
        user: 'chat/getUser',
        policy: 'chat/getPolicy',
    }),
    methods: {
        ...mapActions({
            savePolicyOptions: 'chat/savePolicyOptions',
            switchPolicy: 'chat/switchPolicy'
        }),
        savePolicy(){
            const data = {
                policies: this.policies,
                userId: this.user._id
            }
            this.switchPolicy()
            this.dialog = false
            this.savePolicyOptions(data)
        }
    },
    components: {
        PolicyDialog,
    }
}
</script>

<style lang="css">
    .v-application ul, .v-application ol{
        padding-left: 0;
    }
    .v-input--selection-controls{
        margin: 0;
    }
    .policies-list{
        list-style: none;
        padding-left: 0;
    }
    .policies-list li{
        margin-left: 0;
    }
    .custom-btn{
        color: #FFF !important;
        padding: 10px;
        margin-top: 10px;
    }
    .v-input__slot{
        margin-bottom: 0;
    }
    .v-messages{
        min-height: 3px !important;
    }
    .v-input--selection-controls .v-input__slot > .v-label, .v-input--selection-controls .v-radio > .v-label{
        font-size: 14px;
    }
</style>
