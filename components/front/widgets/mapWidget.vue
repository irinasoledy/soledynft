<template>
    <section class="map-contact">
        <div class="container">
            <div class="row">
                <div class="col-lg-5 col-md-6 col-12">
                    <v-card class="hours-plan">
                        <h5>{{ trans.ContactsAndForms.graficLucruTitle }}</h5>
                        <ul>
                            <li><span>{{ trans.ContactsAndForms.monday }}</span><span>{{ trans.ContactsAndForms.mondayFridayHours }}</span></li>
                            <li><span>{{ trans.ContactsAndForms.tuesday }}</span><span>{{ trans.ContactsAndForms.mondayFridayHours }}</span></li>
                            <li><span>{{ trans.ContactsAndForms.wednesday }}</span><span>{{ trans.ContactsAndForms.mondayFridayHours }}</span></li>
                            <li><span>{{ trans.ContactsAndForms.thursday }}</span><span>{{ trans.ContactsAndForms.mondayFridayHours }}</span></li>
                            <li><span>{{ trans.ContactsAndForms.friday }}</span><span>{{ trans.ContactsAndForms.mondayFridayHours }}</span></li>
                            <li><span>{{ trans.ContactsAndForms.weekEnd }}</span><span>{{ trans.ContactsAndForms.closed }}</span></li>
                        </ul>
                        <h5>{{ trans.ContactsAndForms.formBookAppointmentTitle }}</h5>
                        <v-btn
                            color="secondary"
                            dark
                            @click="$nuxt.$emit('open-appointment-form')"
                            >
                            <v-icon left>mdi-book-open</v-icon>
                            {{ trans.ContactsAndForms.formBookAppointmentTitle }}
                        </v-btn>
                        <appointment-form></appointment-form>
                    </v-card>
                </div>
            </div>
        </div>
        <div class="mapouter">
            <div class="gmap_canvas">
                <!-- <iframe
                    id="gmap_canvas"
                    src="https://maps.google.com/maps?q=bucuresti&t=&z=13&ie=UTF8&iwloc=&output=embed"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    ></iframe> -->
                    <iframe
                    id="gmap_canvas"
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2848.6235063103986!2d26.12519901551033!3d44.44088460915647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40b1ff2d03b39c1b%3A0x56a71dbef3948821!2zSW50cmFyZWEgVmxhZGltaXIgU3RyZWludSAxMiwgQnVjdXJlyJl0aSAwMzAxNjcsINCg0YPQvNGL0L3QuNGP!5e0!3m2!1sru!2s!4v1626191173319!5m2!1sru!2s"
                    frameborder="0"
                    scrolling="no"
                    marginheight="0"
                    marginwidth="0"
                    ></iframe>

                <a href="https://www.embedgooglemap.net"></a>
            </div>
            <style>
                .mapouter {
                    text-align: right;
                    height: 100%;
                    width: 100%;
                }
                .gmap_canvas {
                    overflow: hidden;
                    background: none !important;
                    height: 100%;
                    width: 100%;
                }
            </style>
        </div>
    </section>
</template>

<script>

import { mapGetters, mapActions } from 'vuex'
import appointmentForm from "~/components/front/forms/AppointmentForm.vue"

export default {
    components: { appointmentForm },
    data: () => ({
        dialog: false
    }),
    computed: mapGetters({
        trans: 'getTranslations'
    })
}
</script>

<style lang="scss">
.map-contact {
    padding: 0;
    position: relative;
    z-index: 1;
    // padding-bottom: 0 !important;
    .col-12 {
        padding: 0;
    }
    .hours-plan {
        background: $custom_blue;
        padding: 80px 15px;
        position: relative;
        z-index: 2;
        img {
            margin-bottom: 30px;
        }
        h5 {
            font-size: 20px;
            color: $custom_yellow;
            line-height: 1.1;
            margin-bottom: 20px;
        }
        li,
        p {
            font-size: 16px;
            color: #ffff;
            line-height: 1.1;
        }
        p {
            margin-bottom: 10px;
        }
        li {
            display: flex;
            justify-content: space-between;
            padding: 10px 0;
            border-bottom: 1px solid rgba($color: rgb(133, 133, 133), $alpha: 0.85);
            span:last-child {
                color: rgba($color: rgb(193, 193, 193), $alpha: 0.85);
            }
        }
        ul {
            margin-bottom: 40px;
            padding-left: 0;
        }
        .button {
            span {
                color: #fff;
            }
            #arrow {
                fill: #fff;
            }
        }
    }
    .mapouter {
        top: 0;
        right: 0;
        width: 100vw;
        height: 100%;
        min-height: 500px;
        z-index: 1;
        filter: grayscale(100%);
    }
    iframe {
        width: 100%;
        height: 100%;
        min-height: 500px;
    }
}

@media (min-width: 991px) {
    .map-contact {
        padding: 80px 0;
        .hours-plan {
            padding: 40px;
        }
        .mapouter {
            position: absolute;
            width: 100vw;
            height: 70vh;
        }
    }
}
</style>
