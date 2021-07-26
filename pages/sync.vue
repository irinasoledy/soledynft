<template lang="html">

</template>

<script>
import SyncClient from 'twilio-sync'
import chatApi from '@/api/chatApi'

export default {
    async mounted() {
        await chatApi.getTwillioToken('user', response => {
            var syncClient = new SyncClient(response.token);
            console.log(syncClient);

            // Open a Document by unique name and update its value
            syncClient.document('MyDocument')
              .then(function(document) {
                  console.log('vlmdfl');
                // Listen to updates on the Document
                document.on('updated', function(event) {
                  console.log('Received Document update event. New value:', event.value);
                });

                // Update the Document value
                var newValue = { temperature: 23 };
                return document.set(newValue);
              })
              .then(function(updateResult) {
                console.log('The Document was successfully updated', updateResult)
              })
              .catch(function(error) {
                console.error('Unexpected error', error)
              });
            // const this.accessToken = response.token
        })
        // console.log(SyncClient);

    }
}
</script>

<style lang="css" scoped>
</style>
