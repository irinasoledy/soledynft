<template>

</template>

<script>

import {mapGetters, mapActions} from 'vuex'

export default {
    props: ['type', 'user'],
    computed: mapGetters({
        serverPing: 'getServerPing',
    }),
    watch: {
        serverPing() {
            this.setUserOnline({userId: this.user._id, type: this.type})
        }
    },
    methods: {
        ...mapActions({
            setUserOnline: 'setUserOnline',
        }),
    }
}
</script>
