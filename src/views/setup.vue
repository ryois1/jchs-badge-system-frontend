<template>
<div>
    <div class="text-center"><br><br>
        <h1>{{STATUS_TEXT}}</h1>
        <div class="form-group">
            <form @submit.prevent="processForm" class="col s12" autocomplete="off">
                <div id="form" class="container">
                    <div class="row">
                        <div class="col-sm">
                            <div class="form-group">
                                <label id="label" for="station_name">Station Name:</label>
                                <input id="station_name" v-model="station_name" class="form-control" tabindex="1" required autofocus type="text">
                            </div>
                        </div>
                        <div class="col-sm">
                            <label id="label2" for="station_type">Station Type:</label>
                            <select id="station_type" v-model="station_type" tabindex="2" required aria-required="true" class="custom-select">
                                <option selected="true" disabled>Please Select a Type</option>
                                <option value="normal">Normal</option>
                                <option value="express">Express</option>
                            </select>
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-lg-12">
                            <button tabindex="3" type="submit" id="submit" class="btn btn-primary btn-lg float-right">Submit</button>
                        </div>
                    </div>
                </div>
            </form>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: "scan",
    data: function () {
        return {
            STATUS_TEXT: 'Setup New Station - Station Details',
            station_id: null,
            station_name: null,
       }
    },
    methods: {
        processForm: function() {
            const vm = this;
            const station_type = this.station_type;
            const station_name = this.station_name;
            let setup_data = new FormData();
            setup_data.append('station_name', station_name);
            setup_data.append('station_type', station_type);
            var axios = require("axios");
            axios({
                method: 'post',
                url: `${this.$parent.API_BASE_URL}/api/setupStation`,
                data: setup_data,
                headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                if(response.data.error){
                    vm.STATUS_TEXT = response.data.errorMsg;
                    console.error(response.data.errorMsg);
                }
                if(!response.data.error){
                    vm.STATUS_TEXT = "Successfully setup this station...redirecting";
                    localStorage.setItem('STATION_ID', response.data.station_id);
                    localStorage.setItem('STATION_NAME', response.data.station_name);
                    localStorage.setItem('STATION_TYPE', response.data.station_type);
                    if(response.data.station_type == "normal"){
                        window.location.href = '/scan';
                    }
                    if(response.data.station_type == "express"){
                        window.location.href = '/express';
                    }
                }
            })
            .catch(function (response) {
                console.error(response);
            });
        }
    },
};
</script>
<style scoped>
.large-text {
    font-size: 8rem !important;
}
.smaller-text{
    font-size: 4rem !important;
}
.ui-hidden-accessible {
    position: absolute !important;
    height: 1px;
    width: 1px;
    overflow: hidden;
    clip: rect(1px,1px,1px,1px);
}
</style>