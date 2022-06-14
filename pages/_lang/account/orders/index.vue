<template>
  <main>
    <div class="container account-area">
      <div class="row">
        <div class="col-md-3 pad">
          <sidebar></sidebar>
        </div>
        <div class="col-md-9 account-area">
          <div class="row cabinet-content">
            <div class="col-md-12 display-1 text-center">
              My Orders
            </div>
            <v-card class="width-full" v-if="orders.length">
              <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
              </v-card-title>
              <v-data-table
                  :headers="headers"
                  :items="orders"
                  :search="search"
                  class="elevation-1"
                  item-key="name"
                  v-model="selected"
              >
                <template v-slot:[`item`]="{ item, index }">
                  <tr>
                    <td>{{ item._id }}</td>
                    <td class="text-center">
                      <v-chip class="status-chip" color="#2980b9" text-color="white">
                        {{ item.status }}
                      </v-chip>
                    </td>
                    <td class="text-center">
                      <v-chip class="status-chip" color="#27ae60" text-color="white">
                        {{ item.paymentMethod }}
                      </v-chip>
                    </td>
                    <td>{{ item.amount }} EUR</td>
                    <td>{{ $parseDate(item.date) }}</td>
                    <td>
                      <NuxtLink :to="`/${language.lang}/account/orders/${item._id}`">details
                      </NuxtLink>
                    </td>
                  </tr>
                </template>
              </v-data-table>
            </v-card>
            <p v-else class="text-center">You not have orders. </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import {mapGetters, mapActions} from "vuex";
import sidebar from '~/components/front/partials/Nav-cabinet'
import cartApi from '@/api/cartApi'

export default {
  middleware: ['user'],
  components: {sidebar},
  computed: mapGetters({
    language: 'getLanguage'
  }),
  mounted() {
    cartApi.getOrders({userId: this.$auth.user._id}, response => this.orders = response)
  },
  data: () => ({
    orders: [],
    selected: [],
    search: '',
    headers: [
      {text: 'ID', value: 'id'},
      {text: 'Status', value: 'status'},
      {text: 'Payment', value: 'payment'},
      {text: 'Amount', value: 'amount'},
      {text: 'Date', value: 'date'},
      {text: 'Details', value: 'details'},
    ],
  }),
}
</script>

<style scoped>
.account-area {
  margin-top: 80px;
}

.width-full {
  width: 100%;
}

.status-chip {
  font-size: 12px !important;
  height: 22px !important;
  text-transform: lowercase;
}

@media (max-width: 991px) {
  .account-area {
    margin-top: 20px;
  }

  .display-1 {
    font-size: 1.5rem !important;
  }
}

</style>