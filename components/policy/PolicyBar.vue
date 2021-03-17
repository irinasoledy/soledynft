<template lang="html">
    <v-container>
        <p>
            Prin apăsarea "Accept" ești de acord să permiți colectarea de informații prin cookie-uri sau tehnologii similare pentru:
        </p>
        <ul class="policies-list">
            <li>
                <v-switch label="a oferi cea mai bună experiență de utilizare a site-ului" v-model="policy1"
                ></v-switch>
            </li>
            <li>
                <v-switch label="a oferi posibilitatea analizei datelor de navigare pe site" v-model="policy2"
                ></v-switch>
            </li>
            <li>
                <v-switch label="să fiu contactat prin intermediul Chatu-ului si Videochat-ului plasate pe Site" v-model="policy3"
                ></v-switch>
            </li>
            <li>
                <v-switch label="a oferi posibilitatea protecției datelor personale a utilizatorilor" v-model="policy4"
                ></v-switch>
            </li>
        </ul>

        <v-btn x-small class="info">
            Administreaza preferitele
        </v-btn>

        <v-btn x-small class="primary">
            Accept
        </v-btn>
    </v-container>
</template>

<script>
export default {
    data: () => ({
        policy1: true,
        policy2: true,
        policy3: true,
        policy4: true,
    })
}
</script>

<style lang="css">
.v-input--selection-controls{
    margin: 0;
    padding: 0;
}
.policies-list{
    list-style: none;
}
</style>
