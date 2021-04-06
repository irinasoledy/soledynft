<template>
    <div>
        <div class="wrap">
            <div class="mes" :class="{ owner }">
                <div class="message-date">
                    {{ getTimeAgo(message.date) }}
                </div>
                <small>
                    <strong v-if="message.sendBy == 'client'">{{ message.client.name }}</strong>
                    <strong v-else>{{ message.employee.name }}</strong>
                </small>
                <p>{{ message.message }}</p>

                <!-- <div v-if="owner">
                    <b v-if="!message.readed"><v-icon>mdi-check</v-icon></b>
                    <b v-else><v-icon>mdi-check-all</v-icon></b>
                </div> -->

            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['message', 'owner'],
    methods: {
        dateToYMD(date) {
            let strArray=['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let mins = date.getMinutes();
            let h = date.getHours();
            let d = date.getDate();
            let m = strArray[date.getMonth()];
            let y = date.getFullYear();

            return h + ':' + mins + ' ' + (d <= 9 ? '0' + d : d) + '/' + m + '/' + y;
        },
        getTimeAgo(date){
            return this.dateToYMD(new Date(date))
        },
    }
}
</script>

<style type="scss">
    .system {
      margin-bottom: 1rem;
      p {
        margin-bottom: 1rem;
      }
    }
    .wrap {
      display: flex;
      flex-direction: column;
    }
    .mes {
      padding: 5px;
      width: 85%;
      margin: 0;
      box-shadow: 0 1px 0 0 rgba(50, 50, 50, 0.3);
      border-radius: 4px;
      background: #1976d2;
      position: relative;
      margin-bottom: 1rem;
      p {
        margin-bottom: 0;
      }
    }
    .mes b{
        position: absolute;
        left: -15px;
        width: 10px;
        height: 10px;
        display: block;
        top: 20px;
    }
    .mes b i{
        font-size: 14px !important;
        color: $custom_blue;
    }
    .mes .readed i{
        color: $custom_red;
    }
    .owner {
      background: #ffffff;
      color: #000000;
      align-self: flex-end;
    }
    .message-date{
        font-size: 10px;
        position: absolute;
        right: 5px;
        top: 8px;
    }
</style>
