<template>
    <div>
        <div class="wrap">
            <div class="mes" :class="{ owner }" v-if="!message.callAlert">
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
            <div v-else>
                <i class="initiated-by">Initiated by {{ message.sender.name }}</i>
                <div v-if="message.callStatus === 'missed'" class="call-message missed">
                    <p>
                        <v-icon color="#FFF">mdi-phone-missed</v-icon>
                        <span class="call-message-body">{{ message.message }}</span>
                        <small>{{ getTimeAgo(message.date) }}</small>
                    </p>
                </div>
                <div v-if="message.callStatus === 'rejected'" class="call-message rejected">
                    <p>
                        <v-icon color="#FFF">mdi-phone-hangup</v-icon>
                        <span class="call-message-body">{{ message.message }}</span>
                        <small>{{ getTimeAgo(message.date) }}</small>
                    </p>
                </div>

                <div v-if="message.callStatus === 'accepted'" class="call-message accepted">
                    <p>
                        <v-icon color="#FFF"> mdi-phone-in-talk</v-icon>
                        <span class="call-message-body">{{ message.message }}</span>
                        <small>{{ getTimeAgo(message.date) }}</small>
                    </p>
                </div>

            </div>
        </div>
    </div>
</template>

<script>
export default {
    props: ['message', 'owner'],
    methods: {
        dateToYMD(date) {
            let strArray = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
            let mins = date.getMinutes();
            let h = date.getHours();
            let d = date.getDate();
            let m = strArray[date.getMonth()];
            let y = date.getFullYear();

            return h + ':' + mins + ' ' + (d <= 9 ? '0' + d : d) + '/' + m + '/' + y;
        },
        getTimeAgo(date) {
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
    color: #FFF;
    margin-bottom: 1rem;

p {
    margin-bottom: 0;
}

}
.mes b {
    position: absolute;
    left: -15px;
    width: 10px;
    height: 10px;
    display: block;
    top: 20px;
}

.mes b i {
    font-size: 14px !important;
    color: $ custom_blue;
}

.mes .readed i {
    color: $ custom_red;
}

.owner {
    background: #ffffff;
    color: #000000;
    align-self: flex-end;
}

.message-date {
    font-size: 10px;
    position: absolute;
    right: 5px;
    top: 8px;
}

.call-message {
    border-radius: 5px;
    padding-top: 15px;
    padding-bottom: 1px;
    text-align: center;
    margin: 10px 40px;
    /* background: #e74c3c; */
    color: #FFF;
    position: relative;
}

.missed {
    background: #e74c3c;
}

.rejected {
    background: #2c3e50;
}

.accepted {
    background: #27ae60;
}

.call-message span {
    margin: 0 20px;
}

.call-message small {
    position: absolute;
    font-size: 10px;
    top: 0;
    width: 90px;
    right: 0;
}

.call-message i {
    position: absolute !important;
    top: 15px;
    left: 10px;
}

.call-message-body {
    font-size: 12px;
}
.initiated-by{
    font-size: 10px;
    display: block;
    text-align: center;
    margin-bottom: -10px;
}
</style>
