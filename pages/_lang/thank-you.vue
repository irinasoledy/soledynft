<template>
    <main class="thank-you-area">
        <v-container class="text-center">
            <v-row>
                <v-col>
                    <h2>Thank You</h2>
                </v-col>
            </v-row>
            <v-row>
                <v-col>
                    <h3>For your order</h3>
                </v-col>
            </v-row>
            <v-divider></v-divider>
            <v-row>
                <v-col><br>
                    <p>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquam aliquid atque autem dolore ex
                        excepturi maiores molestias nemo nulla obcaecati pariatur quasi qui quod reiciendis rerum sit
                        veniam vitae, voluptas.</p>
                </v-col>
            </v-row>
            <v-row>
                <v-col v-if="order">
                   <strong> Amount : {{ order.amount }} EUR</strong>
                </v-col>
            </v-row>
            <v-row>
                <v-col><br>
                    <v-btn color="primary" :to="`/${language.lang}/`">
                        <v-icon>mdi-home</v-icon>
                        go back home
                    </v-btn>
                </v-col>
                <v-col><br>
                    <v-btn color="primary" :to="`/${language.lang}/account/orders`">
                        <v-icon>mdi-format-list-bulleted</v-icon>
                        go to history orders
                    </v-btn>
                </v-col>
            </v-row>
        </v-container>
    </main>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    computed: mapGetters({
        language: 'getLanguage',
        cart: 'cart/getCart',
        order: 'cart/getOrder',
    })
}
</script>

<style scoped>
.thank-you-area {
    min-height: 500px;
    margin-top: 150px;
}
</style>