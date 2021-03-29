<template>
    <v-list nav light>
        <v-list-item-group>
            <v-list-item href="tel:+37378563423">
                <v-list-item-icon>
                    <v-icon color="primary">mdi-phone</v-icon>
                </v-list-item-icon>
                <v-list-item-title>+37378563423</v-list-item-title>
            </v-list-item>
            <v-list-item href="mailto:info@likemedia.com">
                <v-list-item-icon>
                    <v-icon color="primary">mdi-email</v-icon>
                </v-list-item-icon>
                <v-list-item-title color="primary">
                    info@likemedia.com
                </v-list-item-title>
            </v-list-item>
        </v-list-item-group>
        <v-list-item-group class="d-flex justify-space-around my-7">
            <v-btn color="secondary">
                <v-icon>mdi-instagram</v-icon>
            </v-btn>
            <v-btn color="secondary" ma-0>
                <v-icon>mdi-email</v-icon>
            </v-btn>
            <v-btn color="secondary" ma-0>
                <v-icon>mdi-facebook</v-icon>
            </v-btn>
        </v-list-item-group>
    </v-list>
</template>

<script>
export default {
    name: "headerContactsWidget"
}
</script>
