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
    layout: "default",
    head() {
        return {
            title: this.title,
            meta: [
                {
                    hid: 'description',
                    name: 'description',
                    content: this.description
                }
            ]
        }
    },
    data: () => ({
        title: '',
        description: '',
        page: null
    }),
    watch: {
        async pages() {
            this.page = await this.pages.find(page => page.alias === this.$route.params.page)
        }
    },
    async mounted(){
        this.page = await this.pages.find(page => page.alias === this.$route.params.page)
        if (Object.keys(this.page).length === 0) {
            this.$router.push("/")
        }
        this.title = this.page.translation.seo_title || this.trans.PageNames.defaultPageSeoTitle,
        this.description = this.page.translation.seo_description || this.trans.PageNames.defaultPageSeoDesc
    },
    computed: mapGetters({
        pages: 'getPages',
        trans: 'getTranslations',
    })
}
</script>
