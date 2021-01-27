<template lang="html">
    <div>

        <Navbar></Navbar>

        <v-card class="mx-auto" width="500" v-if="!authenticated">
            <h3>Video Chat</h3>
            <v-form
                ref="form"
                lazy-validation
                >
                <v-text-field
                    v-model="username"
                    :counter="10"
                    label="Name"
                    required
                    ></v-text-field>

                <v-btn
                    color="success"
                    class="mr-4"
                    @click="submitUsername(username)"
                    >
                    Enter
                </v-btn>
            </v-form>
        </v-card>

        <v-card class="mx-auto" v-else>
            <VideoChat :username="username" room="cmsldmclsd"/>
        </v-card>
    </div>
</template>

<script>
export default {
    name: 'video-chat',
    data() {
        return {
            username: "",
            authenticated: false
        }
    },
    created(){
        console.log('twillio');
    },
    methods: {
        getToken(){

        },
        submitUsername(username) {
            if(!username) {
                return alert('please provide a username');
            }
            this.authenticated = true;
        }
    }
}
</script>

<style lang="css" scoped>
.mx-auto{
    padding: 15px;
}
</style>
