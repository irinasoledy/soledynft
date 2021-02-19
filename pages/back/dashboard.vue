<template>
    <v-container grid-list-xl fluid>
        <h4>Wellcome {{ authUser.name }}!</h4>
    </v-container>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    layout: "dashboard",
    middleware: ['admin'],
    computed : mapGetters({
        authUser : 'admin/getAuthUser'
    })
}
</script>
