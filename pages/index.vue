<template>
  <v-card
    class="mx-left"
    width="300"
  >
    <v-toolbar
      color="teal"
      dark
    >
      <v-app-bar-nav-icon></v-app-bar-nav-icon>
        <v-btn
            class="ma-2"
            color="secondary"
            to="/"
            >
            Logo
        </v-btn>

      <v-spacer></v-spacer>

      <v-btn icon>
        <v-icon>mdi-dots-vertical</v-icon>
      </v-btn>
    </v-toolbar>

    <v-list>
      <v-list-group
        v-for="item in items"
        :key="item.title"
        v-model="item.active"
        :prepend-icon="item.action"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title">

            </v-list-item-title>
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="child in item.items"
          :key="child.title"
        >

        <NuxtLink :to="child.href">
            <p class="font-weight-medium">
                {{ child.title }}
            </p>
        </NuxtLink>

        </v-list-item>
      </v-list-group>
    </v-list>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      items: [
        {
            action: 'mdi-chat',
            items: [{ title: 'Test socket.io', href: '/chat'}],
            title: 'Chat',
        },
        {
            action: 'mdi-video',
            items: [{ title: 'Start', href: '/video-chat' }],
            title: 'Video Chat',
        },
        {
            action: 'mdi-chat',
            items: [{ title: 'Start socket chat', href: '/socket' }],
            title: 'Socket Chat',
        },
      ],
    }),
  }
</script>
