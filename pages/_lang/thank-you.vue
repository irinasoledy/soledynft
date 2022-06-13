<template>
    <main class="thank-you-area" v-if="order">
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

            <v-row v-if="order">
                <v-simple-table class="full-width">
                    <template v-slot:default>
                <thead>
                <tr>
                    <th class="text-center">ID</th>
                    <th class="text-center"></th>
                    <th class="text-center">Product</th>
                    <th class="text-center">Qty</th>
                    <th class="text-center">Unit Price</th>
                    <th class="text-center">Price</th>
                </tr>
                </thead>
                <tbody>
                    <tr v-for="(cartsProduct, index) in order.cart.products" :key="cartsProduct.id">
                        <td>{{ index + 1 }}</td>
                        <td class="cart-image">
                            <nuxt-link :to="`/${language.lang}/categories/${cartsProduct.product.category.alias}/${cartsProduct.product.alias}`">
                                <img :src="`https://back.soledynft.shop/images/products/sm/${cartsProduct.product.main_image.src}`" alt="">
                            </nuxt-link>
                        </td>
                        <td class="str-col" v-if="cartsProduct.product.translation">
                            <nuxt-link :to="`/${language.lang}/categories/${cartsProduct.product.category.alias}/${cartsProduct.product.alias}`">
                                {{ cartsProduct.product.translation.name }}
                            </nuxt-link>
                        </td>
                        <td class="text-center qty-area str-col">
                            <span>{{ cartsProduct.qty }}</span>
                        </td>
                        <td class="str-col">{{ cartsProduct.product.personal_price.price }} EUR</td>
                        <td class="str-col">{{ cartsProduct.product.personal_price.price * cartsProduct.qty }} EUR</td>
                    </tr>

                    <tr v-for="(cartsSubproduct, index) in order.cart.subproducts" :key="cartsSubproduct.id">
                        <td>{{ cartsProducts.length + index + 1 }}</td>
                        <td class="cart-image">
                            <nuxt-link :to="`/${language.lang}/categories/${cartsSubproduct.subproduct.product.category.alias}/${cartsSubproduct.subproduct.product.alias}`">
                                <img :src="`https://back.soledynft.shop/images/products/sm/${cartsSubproduct.subproduct.product.main_image.src}`" alt="">
                            </nuxt-link>
                        </td>
                        <td class="str-col" v-if="cartsSubproduct.subproduct.product.translation">
                            <nuxt-link :to="`/${language.lang}/categories/${cartsSubproduct.subproduct.product.category.alias}/${cartsSubproduct.subproduct.product.alias}`">
                                {{ cartsSubproduct.subproduct.product.translation.name }}
                                <p><small><b>Size: {{ cartsSubproduct.subproduct.parameter_value.translation.name }}</b></small> </p>
                            </nuxt-link>
                        </td>
                        <td class="text-center qty-area str-col">
                            <span>{{ cartsSubproduct.qty }}</span>
                        </td>
                        <td class="str-col">{{ cartsSubproduct.subproduct.product.personal_price.price }} EUR</td>
                        <td class="str-col">{{ cartsSubproduct.subproduct.product.personal_price.price * cartsSubproduct.qty }} EUR</td>
                    </tr>
                </tbody>
            </template>
        </v-simple-table>
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
import cartApi from '@/api/cartApi'

export default {
    data() {
        return {
            order: null,
        }
    },
    computed: mapGetters({
        language: 'getLanguage',
    }),
    mounted() {

        cartApi.getOrder(this.$route.query.order, res => {
            this.order = res
            console.log(res.cart.products);
        })
    }
}
</script>

<style scoped>
.thank-you-area {
    min-height: 500px;
    margin-top: 150px;
}
.full-width {
    width: 100% !important;
}
.cart-image img {
    max-width: 50px;
}
</style>


                           label="Email"
                                type="email"
                                v-model="formData.email"
                                :rules="rules.emailRules"
                                required
                            ></v-text-field>
                            <v-text-field
                                label="Phone"
                                type="number"
                                v-model="formData.phone"
                                :rules="rules.phoneRules"
                                required
                            ></v-text-field>
                            <v-text-field
                                label="Login"
                                v-model="formData.login"
                                :rules="rules.loginRules"
                                required
                            ></v-text-field>
                            <v-text-field
                                label="Password"
                                type="password"
                                v-model="formData.password"
                                :rules="rules.passwordRules"
                            ></v-text-field>
                            <v-text-field
                                label="Confirm Password"
                                type="password"
                                v-model="formData.confirmPassword"
                                :rules="rules.confirmPasswordRules"
                                required
                            ></v-text-field>
                            <v-btn color="primary" large class="mt-3 mb-3" @click="submit">
                                Save & Edit
                            </v-btn>
                        </v-card-text>
                    </v-form>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>
    </v-sheet>
</template>

<script>

import { mapGetters, mapActions } from "vuex"

export default {
    layout: "crm",
    middleware: ['admin'],
    data(){
        return {
        valid: true,
        roles: [
            'employee',
            'redactor',
            'root'
        ],
        formData: {
            name: '',
            login: '',
            email: '',
            phone: '',
            password: '',
            confirmPassword: '',
            role: 'employee'
        },
        rules: {
            loginRules: [
                v => !!v || 'Login is required',
                v => (v && v.length <= 10) || 'Login must be less than 10 characters',
            ],
            nameRules: [
                v => !!v || 'Name is required',
            ],
            emailRules: [
                v => !!v || 'E-mail is required',
                v => /.+@.+\..+/.test(v) || 'E-mail must be valid',
            ],
            phoneRules: [
                v => !!v || 'Phone is required',
            ],
            passwordRules: [
                v => !!v || 'Password is required',
            ],
            confirmPasswordRules: [
                (value) => !!value || 'Type confirm password',
                (value) =>
                value === this.formData.password || 'The password confirmation does not match.',
            ],
            agreementRules: [
                (value) => !!value || 'At least one item should be selected',
            ]
        }
    }},
    mounted() {
        this.formData.role = this.$route.query.type
    },
    computed: mapGetters({
        employees: 'admin/getEmployees'
    }),
    methods: {
        ...mapActions({
            createEmployee: 'admin/createEmployee'
        }),
        submit(){
            this.formData.role = 'employee'
            if (this.$refs.form.validate()) {
                this.createEmployee(this.formData).then(response => {
                    const lastEmployee = this.employees[0]
                    this.$socket.emit('refreshUsersData')
                    this.$router.push(`/crm/employees/edit/operators/${lastEmployee._id}`)
                })
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.display-1 {
   color: $custom_blue !important;
   font-weight: 700 !important;
}

.about-content {
   p {
       color: $custom_red !important
   }
   .banner {
       height: 70vh;
       position: relative;
       &__content {
           position: absolute;
           top: 0;
           left: 0;
           width: 100%;
           height: 100%;
           z-index: 3;
           display: flex;
           justify-content: flex-start;
           flex-direction: column;
           padding: 0 30px;
           padding-top: 50px;
       }
       .v-card__title {
           text-align: left;
       }
       .v-card__text {
           text-align: left !important;
       }
       .v-btn {
           margin-left: 16px;
           max-width: 150px;
       }
       .v-image {
           width: 100%;
           height: 100%;
           object-fit: cover;
           object-position: center;
           position: absolute;
           z-index: 1;
           top: 0;
           left: 0;
       }
       &:after {
           content: "";
           position: absolute;
           left: 0;
           right: 0;
           width: 100%;
           height: 100%;
           background-color: rgba($color: $custom_blue, $alpha: 0.7);
           z-index: 2;
       }
   }
   .avatar-relative {
       position: relative;
       top: -80px;
       z-index: 4;
       max-width: 400px;
       min-width: 350px;
       margin-left: auto;
       margin-right: auto;
   }
}

.avatar-image {
   padding-top: 80px;
   .heading {
       font-size: 25px;
       color: $custom_blue;
       font-weight: bold;
   }
   .description button {
       text-decoration: underline;
   }
   .infoCust {
       .description {
           margin-top: 10px;
       }
       button {
           font-weight: normal;
           color: inherit;
       }
   }
}

.avatar-image .v-image {
   position: absolute;
   width: 160px;
   height: 160px;
   top: -79px;
   left: calc(50% - 80px);
   border-radius: 50% !important;
}

.avatar-image .edit {
   position: absolute;
   top: 30px;
   left: 200px
}

@media (min-width: 991px) {
   .grid-desk {
       display: flex;
   }
   .profile-edit {
       order: 1;
       margin-right: 20px;
       position: relative;
       z-index: 2;
   }
   .avatar-relative {
       order: 2;
   }
}
</style>

/components/front/partials/nav-cabinet'
import cartApi from '@/api/cartApi'

export default {
    components: {sidebar},
    middleware: ['user'],
    data: () => ({
        orderId: '',
        order: null,
        orderServices: null
    }),
    computed: mapGetters({
        allServices: 'getAllServices'
    }),
    mounted() {
        this.orderId = this.$route.params.id
        this.getOrder()
    },
    methods: {
        getOrder() {
            cartApi.getOrder(this.orderId, response => {
                this.order = response
                this.getOrderServices()
            })
        },
        getOrderServices() {
            this.orderServices = this.order.services.map(item => {
                const arr = {
                    id: item._id,
                    qty: item.qty,
                    service: '',
                }
                arr.service = this.allServices.find(service => service.id == item.serviceId)
                return arr
            })
        }
    }
}
</script>

<style>
.account-area {
    margin-top: 80px;
    margin-bottom: 50px;
}
@media (max-width: 991px) {
    .account-area {
        margin-top: 20px;
    }
    .display-1{
        font-size: 1.5rem !important;
    }
}
</style>