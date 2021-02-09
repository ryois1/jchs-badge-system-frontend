<template>
<div>
    <div class="text-center text-white"><br><br>
        <h1 class="large-text" id="status">{{STATUS_TEXT}}</h1>
        <h2 class="smaller-text">{{RESULT_NAME}}</h2>
        <h2 class="smaller-text">{{RESULT_CLASS}}</h2>
        <div class="form-group">
            <form @submit.prevent="processForm" class="col s12" autocomplete="off">
                <input ref="barcode" v-on:blur="handleBlur" class="ui-hidden-accessible" v-model="barcode_data" minlength="9" maxlength="9" tabindex="1" required autofocus type="text" pattern="\d*" rows="5" id="studentid">
                <button style="visibility: hidden;" type="submit" name="action"></button>
            </form>
        </div>
    </div>
</div>
</template>
<script>
export default {
    name: "express",
    data: function () {
        return {
            STATUS_TEXT: 'Please scan your badge.',
            RESULT_NAME: null,
            RESULT_CLASS: null,
            station_id: this.$parent.STATION_ID,
            station_name: this.$parent.STATION_NAME,
            station_type: this.$parent.STATION_TYPE,
            entry_method: 'badge',
            barcode_data: ''
       }
    },
    methods: {
        focusInput: function () {
            this.$refs.barcode.focus();
        },
        handleBlur: function() {
            this.focusInput();
        },
        processForm: function() {
            const vm = this;
            const station_id = this.station_id;
            const entry_method = this.entry_method;
            const barcode_data = this.barcode_data;
            const station_type = this.station_type;
            const station_name = this.station_name;
            let scan_data = new FormData();
            scan_data.append('entry_method', entry_method);
            scan_data.append('barcode_data', barcode_data);
            scan_data.append('station_id', station_id);
            scan_data.append('station_type', station_type);
            scan_data.append('station_name', station_name);
            var axios = require("axios");
            axios({
                method: 'post',
                url: `${this.$parent.API_BASE_URL}/api/scan_badgev2`,
                data: scan_data,
                headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                document.body.classList.remove('branding-ready');
                vm.barcode_data = '';
                if(response.data.error){
                    document.body.classList.add('branding-not-ready');
                    vm.STATUS_TEXT = response.data.errorMsg;
                    console.error(response.data.errorMsg);
                    setTimeout(() => {  vm.STATUS_TEXT = 'Please scan your badge.'; vm.RESULT_NAME = null; vm.RESULT_CLASS = null; document.body.classList.remove('branding-not-ready'); document.body.classList.add('branding-ready');}, 2000);
                }
                if(!response.data.error && response.data.authorized){
                    document.body.classList.add('branding-success');
                    vm.STATUS_TEXT = null;
                    vm.RESULT_NAME = `Hello ${response.data.name}`;
                    vm.RESULT_CLASS = `Class name: ${response.data.classname}`;
                    setTimeout(() => {  vm.STATUS_TEXT = 'Please scan your badge.'; vm.RESULT_NAME = null; vm.RESULT_CLASS = null; document.body.classList.remove('branding-success'); document.body.classList.add('branding-ready');}, 2000);
                }
            })
            .catch(function (response) {
                console.error(response);
            });
        }
    },
    created() {
        document.body.classList.add('branding-ready');
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