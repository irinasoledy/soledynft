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
          Time
        </th>
        <th class="text-left">
          Activity
        </th>
      </tr>
      </thead>
      <tbody>
      <tr
          v-for="item in desserts"
          :key="item.name"
      >
        <td>{{ item.price }} NEAR</td>
        <td>{{ item.id }}</td>
        <td>{{ item.time }}</td>
        <td>{{ item.activity }}</td>
      </tr>
      </tbody>
    </template>
  </v-simple-table>
</template>

<script>
export default {
  name: "OffersArea",
  data() {
    return {
      desserts: [
        {
          price: '2',
          id: 'test.testnet',
          time: 'Mon Jun 27 2022 17:22:07 ',
          activity: 3,
        },
        {
          price: '3',
          id: 'test20132lorem.testnet',
          time: 'Mon Jun 27 2022 17:22:07 ',
          activity: 3,
        },
        {
          price: '10',
          id: 'iovitatudor.testnet',
          time: 'Mon Jun 27 2022 17:22:07 ',
          activity: 1,
        },

      ]
    }
  }
}
</script>

<style scoped>

</style>