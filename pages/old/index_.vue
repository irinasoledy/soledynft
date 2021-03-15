<template>
  <div>
    <v-card class="mx-auto top-card" color="#26c6da" dark max-width="600">
      <v-alert v-if="message" dense border="left" type="warning">
        {{ message }}
      </v-alert>

      <div v-if="!userType">
        <v-card-title class="text-center">
          <p class="title font-weight-light text-center full-width">
            Get started as:
          </p>
        </v-card-title>
        <v-card-text class="text-center">
          <v-btn @click="setUserType('client')">Client</v-btn>
          or
          <v-btn @click="setUserType('employee')">Employee</v-btn>
        </v-card-text>
      </div>
      <div v-else>
        <v-card-title class="text-center">
          <v-btn @click="setUserType(false)"> < back</v-btn>
          <p class="title font-weight-light text-center full-width">
            Continue as {{ userType }}...
          </p>
        </v-card-title>
        <v-card-text v-if="userType === 'employee'">
          <v-text-field
            v-model="name"
            :counter="20"
            label="Your full name"
            required
          ></v-text-field>
          <v-btn v-if="name" class="mr-4" @click="createRoom">
            create and connect to room
          </v-btn>
        </v-card-text>
        <v-card-actions
          class="text-center"
          v-if="rooms.length == 0 && userType === 'client'"
        >
          no employee is online
        </v-card-actions>
        <v-card-actions
          v-for="room in rooms"
          :key="room.id"
          v-if="userType === 'client'"
        >
          <v-list-item class="grow">
            <v-list-item-avatar color="grey darken-3">
              <v-img
                class="elevation-6"
                alt=""
                src="https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
              ></v-img>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ room.employee.name }}</v-list-item-title>
            </v-list-item-content>
            <v-row align="center" justify="end">
              <v-icon
                class="mr-1 call-icon"
                @click="joinRoom(room._id, room.employee)"
              >
                mdi-phone
              </v-icon>
            </v-row>
          </v-list-item>
        </v-card-actions>
      </div>
    </v-card>
  </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data: () => ({
    userType: false,
    name: "",
    message: false
  }),
  computed: mapGetters({
    rooms: "chat/getRooms",
    room: "chat/getRoom",
    employee: "chat/getEmployee",
    client: "chat/getClient",
    user: "chat/getUser"
  }),
  mounted: function() {
    const { message } = this.$route.query;
    if (message === "noUser") {
      this.message = "Choose the client or emplooy option";
    } else if (message === "leftChat") {
      this.message = "You are out of chat";
    }
    this.getActiveRoomList();
  },
  methods: {
    ...mapActions({
      createNewRoom: "chat/createNewRoom",
      getActiveRoomList: "chat/getActiveRoomList",
      joinExistingRoom: "chat/joinExistingRoom",
      setClientAsUser: "chat/setClientAsUser"
    }),
    async joinRoom(roomId, employee) {
      this.$socket.emit(
        "joinExistingRoom",
        { roomId: roomId, userId: this.user._id },
        async response => {
          await this.setClientAsUser(employee);
          this.$router.push("/chat");
        }
      );
    },
    async createRoom() {
      await this.createNewRoom(this.name);
      setTimeout(() => {
        const store = this.$store.state.chat;
        const data = {
          name: store.employee,
          room: store.room
        };
        this.$socket.emit("employeeJoined", data, response => {
          this.$router.push("/chat");
        });
      }, 1000);
    },
    setUserType(type) {
      this.userType = type;
      this.message = false;
      if (type === "client") {
        this.getActiveRoomList();
      }
    }
  }
};
</script>

<style>
.call-icon {
  cursor: pointer;
  margin-left: 10px;
}
.text-center {
  width: 100%;
}
.top-card {
  margin-top: 100px;
}
</style>
