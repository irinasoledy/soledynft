<template>
    <section class="experts">
        <v-container>
            <v-row>
                <v-col cols="12">
                    <div class="display-1 text-center c-title">
                        {{ trans.HP.hpDiscussLive }}
                    </div>
                    <p class="text-center text">
                        {{ trans.HP.hpWeArePround }}
                    </p>
                </v-col>
                <v-col
                    v-for="(item, i) in experts"
                    :key="i"
                    class="col-lg-4 col-md-6 col-12 d-flex child-flex"
                    >
                    <v-card>
                        <v-img
                            :src="`/avatars/${item.avatar}`"
                            aspect-ratio="1"
                            class="grey lighten-2"
                            >
                        </v-img>
                        <v-card-title class="title justify-center">
                            {{item.name}}
                        </v-card-title>
                        <v-card-subtitle class="text-center">
                            {{item.type}}
                        </v-card-subtitle>
                        <v-card-actions
                            class="pb-5 justify-center"
                            >
                            <!-- <v-btn
                                color="secondary"
                                >
                                <v-icon left>mdi-phone</v-icon>
                                {{ trans.Team.specialistBtnChat }}
                            </v-btn>
                            <v-btn
                                color="info"
                                >
                                <v-icon left>mdi-chat</v-icon>
                                {{ trans.Team.companyMainAddress }}
                            </v-btn> -->
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </section>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
export default {
    computed: mapGetters({
        trans: 'getTranslations',
        experts: 'content/getExperts'
    }),
    mounted(){
        this.getExpertsList()
    },
    methods: {
        ...mapActions({
            getExpertsList: 'content/getExpertsList'
        })
    }
}
</script>
