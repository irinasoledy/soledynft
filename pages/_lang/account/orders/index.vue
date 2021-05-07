<template>
    <main>
        <div class="container account-area">
            <div class="row">
                <div class="col-auto pad">
                    <sidebar></sidebar>
                </div>
                <div class="col account-area">
                    <div class="row cabinet-content">
                        <div class="col-lg-10 col-md-12 col-12 display-1 text-center">
                           My Orders
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </main>
</template>

<script>

import sidebar from '@/components/front/partials/nav-cabinet'

export default {
    middleware: ['user'],
    components: {
        sidebar
    },
    data: () => ({
        date: new Date().toISOString().substr(0, 10),
        dateMenu: false,
        radioGroup: 1
    }),
}
</script>

<style scoped>
.account-area {
    margin-top: 80px;
}

.cabinet-content {

.radiogroup {
    flex-direction: row;
}

}
</style>