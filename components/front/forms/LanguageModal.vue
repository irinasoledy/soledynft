<template>
  <v-form>
    <v-card>
      <v-card-title class="headline text-center">
        Change Language
      </v-card-title>
      <v-card-text class="pt-8 pb-0">
        <v-select
          :items="['Romania', 'Moldova', 'Polonia', 'Rusia']"
          label="Livrare catre"
          color="primary"
          required
          outlined
          filled
          value="Moldova"
        >
        </v-select>
        <v-select
          :items="['Romana', 'Engleza', 'Rusa']"
          label="Limba"
          required
          color="primary"
          outlined
          value="Engleza"
        >
        </v-select>
        <v-select
          :items="['RON', 'MDL', 'USD', 'RUB']"
          label="Valuta"
          color="primary"
          outlined
          required
          value="MDL"
        >
        </v-select>
      </v-card-text>

      <v-divider></v-divider>

      <v-card-actions class="py-4 px-4">
        <v-spacer></v-spacer>
        <v-btn
          color="title"
          text
          @click="closeLanguageModal"
        >
          Close
        </v-btn>
        <v-btn
          color="primary"
          outlined
          @click="closeLanguageModal"
        >
          Save
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-form>
</template>

<script>
export default {
  methods: {
    closeLanguageModal () {
      this.$emit("closeLanguageModal")
    }
  }
}
</script>

<style>

</style>
