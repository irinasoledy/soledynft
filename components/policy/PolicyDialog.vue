<template lang="html">
<div>
    <v-dialog
        v-model="dialog"
        width="900"
        >
        <template v-slot:activator="{ on, attrs }">
            <v-btn width="100%" class="info custom-btn" v-bind="attrs" v-on="on">
                Administreaza preferitele
                <!-- {{ trans.Policies.cookieNotificationBtn1 }} -->
            </v-btn>
        </template>
        <v-card>
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
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <h4>{{ trans.Policies.cookiePopupTab1Title }}</h4>
                            <p class="mb-0">
                                {{ trans.Policies.cookiePopupTab1Text1 }}
                            </p>
                            <p><v-switch @click="savePolicy" v-model="policies.agreementUsing"></v-switch></p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <h4 class="mt-0">{{ trans.Policies.cookiePopupTab2Title }}</h4>
                            <p class="mb-0">
                                {{ trans.Policies.cookiePopupTab2Text1 }}
                            </p>
                            <p class="mb-0">
                                {{ trans.Policies.cookiePopupTab2Text2 }}
                            </p>
                            <p class="mb-0">
                                {{ trans.Policies.cookiePopupTab2Text3 }}
                            </p>
                            <p><v-switch @click="savePolicy" v-model="policies.agreementAnalyzing"></v-switch></p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <h4>{{ trans.Policies.cookiePopupTab3Title }}</h4>
                            <p class="mb-0">
                                {{ trans.Policies.cookiePopupTab3Text1 }}
                            </p>
                            <p><v-switch @click="savePolicy" v-model="policies.agreementContact"></v-switch></p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
                <v-tab-item>
                    <v-card flat>
                        <v-card-text>
                            <h4>{{ trans.Policies.cookiePopupTab4Title }}</h4>
                            <p class="mb-0">
                                {{ trans.Policies.cookiePopupTab4Text1 }}
                            </p>
                            <p><v-switch @click="savePolicy" v-model="policies.agreementProtect"></v-switch></p>
                        </v-card-text>
                    </v-card>
                </v-tab-item>
            </v-tabs>

            <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn
                    color="primary"
                    text
                    @click="dialog = false"
                    >
                    Cloose
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
            savePolicyOptions: 'chat/savePolicyOptions'
        }),
        savePolicy(){
            const data = {
                policies: this.policies,
                userId: this.user._id
            }
            this.savePolicyOptions(data)
        }
    }
}
</script>

<style>
.tab-item{
    word-wrap: break-word;
}
</style>
