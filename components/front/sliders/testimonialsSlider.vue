<template>
    <agile class="c-slider" :options="options">
        <div class="slide">
            <v-card class="c-card">
                <v-card-title align="center" justify="center">
                    <v-avatar color="indigo">
                        <img :src="$banner('Testemonial-1')" alt="">
                    </v-avatar>
                    <span class="testimonial-author">{{ trans.General.testemonial1Name }}</span>
                </v-card-title>
                <v-card-text>"{{ trans.General.testemonial1Text }}"</v-card-text>
            </v-card>
        </div>
        <div class="slide">
            <v-card class="c-card">
                <v-card-title>
                    <v-avatar color="indigo">
                        <img :src="$banner('Testemonial-2')" alt="">
                    </v-avatar>
                    <span class="testimonial-author">{{ trans.General.testemonial2Name }}</span>
                </v-card-title>
                <v-card-text>"{{ trans.General.testemonial2Text }}"</v-card-text>
            </v-card>
        </div>
        <div class="slide">
            <v-card class="c-card">
                <v-card-title>
                    <v-avatar color="indigo">
                        <img :src="$banner('Testemonial-3')" alt="">
                    </v-avatar>
                    <span class="testimonial-author">{{ trans.General.testemonial3Name }}</span>
                </v-card-title>
                <v-card-text>"{{ trans.General.testemonial3Text }}"</v-card-text>
            </v-card>
        </div>
        <div class="slide">
            <v-card class="c-card">
                <v-card-title>
                    <v-avatar color="indigo">
                        <img :src="$banner('Testemonial-4')" alt="">
                    </v-avatar>
                    <span class="testimonial-author">{{ trans.General.testemonial4Name }}</span>
                </v-card-title>
                <v-card-text>"{{ trans.General.testemonial4Text }}"</v-card-text>
            </v-card>
        </div>
    </agile>
</template>

<script>

import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        options: {
            slidesToShow: 1,
            navButtons: false,
            dots: true,
            responsive: [{
                breakpoint: 600,
                settings: { slidesToShow: 2 }
            },
            {
                breakpoint: 900,
                settings: { slidesToShow: 3 }
            }]
        }
    }),
    computed: mapGetters({
        trans: 'getTranslations'
    })
}
</script>

<style lang="scss">
.c-slider {
    margin: 0 -15px;
    .agile__list {
        padding: 20px 0 !important;
    }
    .slide,
    .c-card {
        height: 100%;
    }
    .c-card {
        margin: 15px;
    }
    .agile__actions {
        margin-top: 20px;
    }
    .agile__dot {
        margin: 0 10px;
        button {
            background-color: rgb(147, 143, 143);
            border: none;
            border-radius: 50%;
            cursor: pointer;
            display: block;
            height: 10px;
            font-size: 0;
            line-height: 0;
            margin: 0;
            padding: 0;
            transition-duration: .3s;
            width: 10px;
        }
        &:hover button {
            background-color: rgb(36, 35, 35)
        }
    }
    .agile__dot--current button {
        background-color: rgb(36, 35, 35)
    }
}

.testimonial-author {
    margin-left: 20px;
}
</style>
