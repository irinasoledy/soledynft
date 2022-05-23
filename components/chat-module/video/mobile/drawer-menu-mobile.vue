<template>
    <v-card light>
      <v-card-text>
        <v-list>
          <v-list-item>
            <v-btn color="secondary" text>
              Disconnect Audio
            </v-btn>

          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn text class="d-flex justify-space-between" @click.stop="drawerSettings = true">
                Security
                <v-icon>
                  mdi-security
                </v-icon>
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title>
              <v-btn text class="d-flex justify-space-between" @click="$nuxt.$emit('openChat')">
                Chat
                <v-icon>
                  mdi-chat
                </v-icon>
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title  >

              <v-btn text class="d-flex justify-space-between" @click.stop="drawerMeeting= !drawerMeeting">
                Meeting Settings
                <v-icon>
                  mdi-cog
                </v-icon>
              </v-btn>
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-title  >
              <v-btn text class="d-flex justify-space-between" @click.stop="drawerShare= !drawerShare">
                Share Screen
                <v-icon>
                  mdi-monitor-share
                </v-icon>
              </v-btn>
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-card-text>
      <v-card-text class="py-0">
        <div class="emoticons pa-4">
          <span class="emoticon">&#x1f600</span>
          <span class="emoticon">&#x2764</span>
          <span class="emoticon">&#x2620</span>
          <span class="emoticon">&#x1f608</span>
          <span class="emoticon">&#x1f917</span>
        </div>
      </v-card-text>
      <v-divider class="mb-2 mt-6"></v-divider>
      <v-card-text class="text-center" >
        <v-btn @click.stop="drawerMenu = false" outlined color="primary">
          Cancel
        </v-btn>
      </v-card-text>
    </v-card>
</template>

<script>
export default {
}
</script>

<style lang="css">
</style>

