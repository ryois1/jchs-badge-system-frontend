<template>
<div>
</div>
</template>
<script>
export default {
    name: "heartbeat",
    methods: {
        doHeartbeat: function () {
            const vm = this.$parent;
            const station_id = vm.STATION_ID;
            const station_type = vm.STATION_TYPE;
            const station_name = vm.STATION_NAME;
            const station_version = vm.FRONTEND_VERSION;
            let heartbeat_data = new FormData();
            heartbeat_data.append('station_id', station_id);
            heartbeat_data.append('station_type', station_type);
            heartbeat_data.append('station_name', station_name);
            heartbeat_data.append('station_version', station_version);
            var axios = require("axios");
            axios({
                method: 'post',
                url: `${this.$parent.API_BASE_URL}/api/heartbeatv2`,
                data: heartbeat_data,
                headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                if(response.data.error){
                    console.log(response.data.errorMsg);
                }
                if(!response.data.error){
                    if(response.data.STATION_UPDATE){
                        location.reload();
                    }
                    vm.API_VERSION = response.data.API_VERSION;
                    vm.STATION_IP = response.data.STATION_IP;
                    return;
                }
            })
            .catch(function (response) {
            console.log(response);
            });
        },
     },
    created() {
        this.doHeartbeat();
    },
    mounted: function () {
        this.$nextTick(function () {
            window.setInterval(() => {
                this.doHeartbeat();
            },5000);
        })
    }
};
</script>