<template>
    <v-container grid-list-xl fluid>
        <v-layout row wrap>
            <v-flex lg12 sm12 xs12>
                <message-list></message-list>
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'

export default {
    layout: "crm",
    middleware: ['admin'],
};
</script>

<style scoped>
    .subheading {
        font-weight: 500;
        font-size: 18px !important;
    }
    .caption {
        font-weight: 400;
        font-size: 16px !important;
    }
    td, th {
        font-size: 14px !important;
    }
    .v-input--selection-controls {
        margin-top: 0 !important;
        padding-top: 0 !important;
    }
</style>
