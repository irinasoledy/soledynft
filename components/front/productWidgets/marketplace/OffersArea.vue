<template>
  <v-simple-table class="offers-area">
    <template v-slot:default>
      <thead>
      <tr>
        <th class="text-left">
          Price
        </th>
        <th class="text-left">
          ID Wallet
        </th>
        <th class="text-left">
          Accepted
        </th>
        <th class="text-left">
          Time
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="offer in offers"
          :key="offer.id"
      >
        <td>{{ offer.price_decimals }} NEAR</td>
        <td>{{ offer.account_id }}</td>
        <td v-if="offer.accepted"> <v-icon>mdi-check-all</v-icon> </td>
        <td v-else> <v-icon>mdi-minus</v-icon> </td>
        <td>{{ offer.created_at }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "OffersArea",
  props: ['offers'],
}
</script>

<style scoped>

</style>