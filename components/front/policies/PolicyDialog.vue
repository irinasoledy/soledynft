<template lang="html">
<div>
    <v-dialog
        v-model="dialog"
        width="900"
        class="policy-dialog"
        >
        <template v-slot:activator="{ on, attrs }">
            <p
                class="policy-accept-link"
                v-bind="attrs"
                v-on="on">{{ trans.Policies.cookieNotificationBtn2 }}
            </p>
        </template>
        <v-card class="dialog-wrapp">
            <v-tabs vertical>
                <v-tab class="tab-item">
                    <small>{{ trans.Policies.cookieNotificationOption1 }}</small>
                </v-tab>
                <v-tab class="tab-item">
                    <small>{{ trans.Policies.cookieNotificationOption2 }}</small>
                </v-tab>
                <v-tab class="tab-item">
                    <small>{{ trans.Policies.cookieNotificationOption3 }}</small>
                </v-tab>
                <v-tab class="tab-item">
                    <small>{{ trans.Policies.cookieNotificationOption4 }}</small>
                </v-tab>
                <v-tab class="tab-item">
                    <small>{{ trans.Policies.cookiePopupTab5Title }}</small>
                </v-tab>

                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <h4 class="mt-0">{{ trans.Policies.cookiePopupTab1Title }}</h4>
                            <p class="mb-5 mt-5">
                                {{ trans.Policies.cookiePopupTab1Text1 }}
                            </p>
                            <p>
                                <v-switch
                                    :label="policies.agreementUsing ? 'Active' : 'Inactive'"
                                    v-model="policies.agreementUsing">
                                </v-switch>
                            </p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <h4 class="mt-0">{{ trans.Policies.cookiePopupTab2Title }}</h4>
                            <p class="mb-5 mt-5">
                                {{ trans.Policies.cookiePopupTab2Text1 }}
                            </p>
                            <p class="mb-5 mt-5">
                                {{ trans.Policies.cookiePopupTab2Text2 }}
                            </p>
                            <p class="mb-5 mt-5">
                                {{ trans.Policies.cookiePopupTab2Text3 }}
                            </p>
                            <p>
                                <v-switch
                                    :label="policies.agreementAnalyzing ? 'Active' : 'Inactive'"
                                    v-model="policies.agreementAnalyzing">
                                </v-switch>
                            </p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <h4>{{ trans.Policies.cookiePopupTab3Title }}</h4>
                            <p class="mb-5 mt-5">
                                {{ trans.Policies.cookiePopupTab3Text1 }}
                            </p>
                            <p>
                                <v-switch
                                    :label="policies.agreementContact ? 'Active' : 'Inactive'"
                                    v-model="policies.agreementContact">
                                </v-switch>
                            </p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <h4>{{ trans.Policies.cookiePopupTab4Title }}</h4>
                            <p class="mb-5 mt-5">
                                {{ trans.Policies.cookiePopupTab4Text1 }}
                            </p>
                            <p>
                                <v-switch
                                    :label="policies.agreementProtect ? 'Active' : 'Inactive'"
                                    v-model="policies.agreementProtect">
                                </v-switch>
                            </p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <h4>{{ trans.Policies.cookiePopupTab5Title }}</h4>
                            <p class="mb-5 mt-5">{{ trans.Policies.cookiePopupTab5Text1 }}</p>
                            <p class="mb-5">{{ trans.Policies.cookiePopupTab5Text2 }}</p>
                            <p class="mb-5">{{ trans.Policies.cookiePopupTab5Text3 }}</p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="savePolicy"
                    >
                    Accept
                </v-btn>
                <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                    >
                    Close
                </v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</div>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        dialog: false,
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
    }),
    methods: {
        ...mapActions({
            savePolicyOptions: 'chat/savePolicyOptions',
            switchPolicy: 'chat/switchPolicy',
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
    }
}
</script>

<style>
.tab-item{
    word-wrap: break-word;
}
.dialog-wrapp{
    padding: 20px;
}
.v-window-item{
    min-height: 270px;
}
.v-slide-group__content{
    white-space: normal;
}
.v-tab{
    text-align: left;
    justify-content: left;
}
.policy-dialog p{
    margin-bottom: 20px;
}
@media (max-width: 991px) {
    .v-tabs--vertical{
        display: block;
    }
}
.policy-accept-link{
    margin-top: 20px;
    font-size: 14px;
    text-decoration: underline;
}
</style>

