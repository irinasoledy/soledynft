<template>
    <v-sheet class="my-10 py-10 px-0 py-md-10 px-md-10  text-center cust-count">
        <h6 class="text-h6">Încărcați contul</h6>
        <div class="d-flex justify-space-between flex-wrap">
            <v-img
                max-width="130"
                v-for="(item, i) in img"
                :key="i"
                :src="item">
            </v-img>
        </div>
    </v-sheet>
</template>

<script>
export default {
    name: "count",
    data: () => ({
        img: [
            "https://genesis-stars.com/local/assets/img/ico_pay/visa-master-ico.svg",
            "https://genesis-stars.com/local/assets/img/ico_pay/privat-ico.svg",
            "https://genesis-stars.com/local/assets/img/ico_pay/mir-ico.svg",
            "https://genesis-stars.com/local/assets/img/ico_pay/webmoney-ico.svg",
            "https://genesis-stars.com/local/assets/img/ico_pay/qiwi-ico.svg",
            "https://genesis-stars.com/local/assets/img/ico_pay/yandex-ico.svg"
        ]
    })
}
</script>

<style scoped>
    .cust-count {
        position: relative;
        z-index: 1;
        box-sizing: border-box;
        overflow: hidden;
    }
    .cust-count:after {
        content: "";
        position: absolute;
        z-index: -1;
        width: 150vw;
        height: 100%;
        top: 0;
        left: -50vw;
        background-color: rgba(0, 0, 0, 0.3);
    }
</style>

   .infoChat {
        max-height: 80% !important;
        .v-sheet {
            min-height: 100%;
        }
        .v-list-item {
            background-color: rgba(0, 0, 0, 0.1);
            border-bottom: 1px solid #ffff;
            border-radius: 9px;
            padding: 0;
        }
        .v-btn {
            width: 100%;
        }
        .emoticons {
            background-color: rgba(0, 0, 0, 0.1);
            border-radius: 9px;
            display: flex;
            justify-content: space-around;
            font-size: 30px;
            .emoticon {
                transition: transform .3s ease;
            }
            .emoticon:hover {
                transform: scale(1.1);
            }
        }
    }

    .chatdrawer {
        position: absolute;
    }

    .infoChat .menuItem {
        display: flex;
        margin-bottom: 15px;
        span:first-child {
            width: 40%;
            opacity: 0.6;
        }
        span:last-child {
            width: 60%;
        }
    }

    .v-navigation-drawer--bottom.v-navigation-drawer--is-mobile {
        max-height: 90%;
    }

    .full-height {
        height: calc(100vh - 151px);
    }
    .chatWarning {
        position: absolute;
        text-align: center;
        color: #FFF;
        width: 100%;
        font-size: 10px;
        margin-top: -10px;
        z-index: 9;
        left: 0 !important
    }
    .end-btn{
        margin-top: 5px;
    }
</style>


