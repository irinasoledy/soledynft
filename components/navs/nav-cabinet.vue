<template>
<v-list nav light class="pt-15 navCabinet">
          <v-list-item two-line>
            <v-list-item-avatar height="80" width="80">
              <img src="https://randomuser.me/api/portraits/women/81.jpg">
            </v-list-item-avatar>

            <v-list-item-content>
              <v-list-item-title>Jane Smith</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
          <v-list-item-group>
            <v-list-item color="primary" exact nuxt to="/cabinet/personal-info">
              <v-list-item-icon>
                <v-icon color="primary">mdi-cog-box</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Profilul meu și setări</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon >mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item color="primary" exact nuxt to="/cabinet/photo">
              <v-list-item-icon>
                <v-icon color="primary">mdi-camera</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Pozele mele</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon >mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item color="primary" exact nuxt to="/cabinet/subscribes">
              <v-list-item-icon>
                <v-icon color="primary">mdi-format-list-bulleted</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Eu urmăresc</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon >mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item color="primary" exact nuxt to="/cabinet/orders">
              <v-list-item-icon>
                <v-icon color="primary">mdi-cash</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Comenzile mele</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon >mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item color="primary" exact nuxt to="/cabinet/invoices">
              <v-list-item-icon>
                <v-icon color="primary">mdi-receipt</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Invoice</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon >mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item color="primary" exact nuxt to="/faq">
              <v-list-item-icon>
                <v-icon color="primary">mdi-help-box</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Ajutor</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon >mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
            <v-list-item color="primary">
              <v-list-item-icon>
                <v-icon color="primary">mdi-logout</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title>Ieși</v-list-item-title>
              </v-list-item-content>
              <v-list-item-icon>
                <v-icon >mdi-chevron-right</v-icon>
              </v-list-item-icon>
            </v-list-item>
          </v-list-item-group>
        </v-list>
</template>

<script>

export default {
    name: "nav-cabinet"
}
</script>

<style lang="scss">
  .navCabinet {
    display: none;
    max-width: 400px;
    padding-right: 30px;
    
    .pad {
      padding: 0;
    }

    .v-list-item {
      &__title,
      &__icon {
        font-size: 16px !important;
      }
    }
  }

  @media (min-width: 992px) {
    .navCabinet {
      display: block;
      
      .pad {
        padding: 0 15px;
      }
    }
  }
</style>