<template lang="html">
    <v-container>
        <v-row>
            <v-col lg="9">
                <p>
                    {{ trans.Policies.cookieNotificationTitle }}
                    <!-- Prin apăsarea "Accept" ești de acord să permiți colectarea de informații prin cookie-uri sau tehnologii similare pentru: -->
                </p>
                <!-- <ul class="policies-list">
                    <li>
                        <v-switch label="a oferi cea mai bună experiență de utilizare a site-ului" v-model="policy1"
                        ></v-switch>
                    </li>
                    <li>
                        <v-switch label="a oferi posibilitatea analizei datelor de navigare pe site" v-model="policy2"
                        ></v-switch>
                    </li>
                    <li>
                        <v-switch label="să fiu contactat prin intermediul Chatu-ului si Videochat-ului plasate pe Site" v-model="policy3"
                        ></v-switch>
                    </li>
                    <li>
                        <v-switch label="a oferi posibilitatea protecției datelor personale a utilizatorilor" v-model="policy4"
                        ></v-switch>
                    </li>
                </ul> -->
                <!-- <PolicyDialog />
                <v-btn width="45%" class="primary custom-btn">
                    Accept
                </v-btn> -->
            </v-col>
            <v-col>
                <PolicyDialog />
                <v-btn width="100%" class="primary custom-btn">
                    {{ trans.Policies.cookieNotificationBtn1 }}
                </v-btn>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>

import PolicyDialog from './PolicyDialog'
import { mapActions, mapGetters } from 'vuex'

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
        trans: 'getTranslations'
    }),
    components: {
        PolicyDialog,
    }
}
</script>

<style lang="css">
.v-input--selection-controls{
    margin: 0;
    padding: 0;
}
.policies-list{
    list-style: none;
}
.custom-btn{
    color: #FFF !important;
    padding: 10px;
    margin-top: 20px;
}
</style>
