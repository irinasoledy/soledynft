<template lang="html">
    <main class="about-content">
        <div class="container">
            <div v-html="page.translation.body" v-if="page"></div>
        </div>
    </main>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    data: () => ({
        page: null
    }),
    async mounted(){
        this.page = await this.pages.find(page => page.alias === this.$route.params.page)
        if (Object.keys(this.page).length === 0) {
            this.$router.push("/")
        }
    },
    computed: mapGetters({
        pages: 'getPages'
    })
}
</script>
