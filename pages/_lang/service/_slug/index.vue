<template>
  <main class="services-page">
    <section class="services" v-if="service">
      <v-container>
        <v-row>
          <v-col cols="12">
            <div class="display-1 text-center c-title">
              {{ this.service.translation.name }}
            </div>
          </v-col>
          <v-col
              v-for="(item, i) in this.service.children"
              :key="i"
              class="col-lg-4 col-md-6 col-12 d-flex child-flex"
          >
            <v-card exact nuxt :to="`/${language.lang}/service/${service.alias}/${item.alias}`">
              <v-img
                  v-if="item.banner"
                  :src="`${envAPI}/images/blogCategories/og/${item.banner}`"
                  aspect-ratio="1"
                  class="grey lighten-2"
              >
              </v-img>
              <v-img v-else src="" aspect-ratio="1" class="grey lighten-2"></v-img>
              <v-card-title class="title">
                {{ item.translation.name }}
              </v-card-title>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </section>
    <appointment-form></appointment-form>
  </main>
</template>

<script>

import {mapActions, mapGetters} from 'vuex'
import appointmentForm from "@/components/front/forms/appointmentForm.vue"

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
    service: null,
    title: '',
    description: '',
  }),
  computed: mapGetters({
    services: 'getServices',
    language: 'getLanguage',
    envAPI: 'getEnvAPI',
    trans: 'getTranslations',
  }),
  watch: {
    async services() {
      this.service = await this.services.find((serv) => serv.alias == this.$route.params.slug)
    }
  },
  async mounted() {
    this.service = await this.services.find((serv) => serv.alias == this.$route.params.slug)
    if (Object.keys(this.service).length === 0) {
      this.$router.push("/")
    }
    this.title = this.service.translation.seo_title
    this.description = this.service.translation.seo_description
    this.setChatBotmessage(this.trans.General.botMessageTemplate1 + " " + this.service.translation.bot_message + '? ' + this.trans.General.botMessageTemplate2)
  },
  methods: {
    ...mapActions({
      setChatBotmessage: 'chat/setChatBotmessage'
    }),
  }
}
</script>

<style lang="scss" scoped>

.services-page {
  margin-top: 70px;
  background-color: $custom_blue;
}

.c-title {
  color: #FFF !important;
}
</style>
