<template>
  <div class="chatdrawer">
    <v-card width="360" height="100%">
      <v-card-title dense class="text-center">
        Chat
      </v-card-title>
      <v-divider></v-divider>
      <Chat />
      <!-- <v-list>
        <v-list-item v-for="(item, i) in 5" :key="i">
          <v-list-item-content>
            <v-list-item-title>
              Nicolai Marana <span>All:</span>
            </v-list-item-title>
            <v-list-item-subtitle>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat minima qui exercitationem iusto? Rerum, qui?
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Cristina Buba <span>All:</span>
            </v-list-item-title>
            <v-list-item-subtitle>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat minima qui exercitationem iusto? Rerum, qui?
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-content>
            <v-list-item-title>
              Me <span>All:</span>
            </v-list-item-title>
            <v-list-item-subtitle>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Repellat minima qui exercitationem iusto? Rerum, qui?
            </v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
      <v-divider></v-divider>
      <v-card-actions dense class="pl-4">
        <v-card-text>
          For: <span>All</span>
        </v-card-text>
        <v-text-field
          v-model="textarea"
          label="Your message..."
        >
        </v-text-field>
      </v-card-actions> -->
    </v-card>
  </div>
</template>

<script>
import Chat from "@/components/chat/Chat";

export default {
  data: ()=>({
    textarea: ""
  })
}
</script>

<style lang="scss" scoped>
  .v-list-item {

    &__subtitle {
      overflow: auto;
      white-space:normal;
    }

    &__title span {
      color: rgb(6, 108, 225)
    }
  }
  .v-list {
    height: 100%;
    overflow: scroll;
  }
  .v-list::-webkit-scrollbar {
    display: none;
  }

  /* Hide scrollbar for IE, Edge and Firefox */
  .v-list {
    -ms-overflow-style: none;  /* IE and Edge */
    scrollbar-width: none;  /* Firefox */
  }
  .v-card {
    display: flex;
    flex-direction: column;
    height: 100%;
    max-height: 100vh;

    &__actions {
      display: block;
      .v-textarea {
        display: block;
        width: 100%;
        height: 60px;
      }
    }
    &__text span {
      color: rgb(6, 108, 225)
    }

  }
</style>
