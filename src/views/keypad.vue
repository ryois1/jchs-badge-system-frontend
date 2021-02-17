<template>
<div>
    <div class="text-center"><br><br>
        <h1 id="status">{{STATUS_TEXT}}</h1>
        <h2 class="text-white">{{RESULT_NAME}}</h2>
        <h2 class="text-white">{{RESULT_CLASS}}</h2>
        <div class="form-group">
            <form @submit.prevent="processForm" class="col s12" autocomplete="off">
                <div id="form" class="container">
                    <div class="row">
                        <div class="col-sm">
                            <div class="form-group">
                                <label id="label" for="studentid">Student ID:</label>
                                <input v-model="student_id" tabindex="1" class="form-control" minlength="7" maxlength="7" required autofocus type="text" pattern="\d*" name="studentid" rows="5" id="studentid">
                            </div>
                        </div>
                        <div class="col-sm">
                            <label id="label2" for="classid">Class:</label>
                            <select tabindex="2" required aria-required="true" id="class_code" class="custom-select" v-model="class_id">
                                <option v-for="(item, index) in CLASSES" :key='index' v-bind:value="item.class_code">
                                    {{ item.class_name }}
                                </option>
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
            STATUS_TEXT: 'Please input your student ID with the keypad.',
            RESULT_NAME: null,
            RESULT_CLASS: null,
            station_id: this.$parent.STATION_ID,
            station_name: this.$parent.STATION_NAME,
            station_type: this.$parent.STATION_TYPE,
            entry_method: 'manual',
            student_id: '',
            class_id: '',
            CLASSES: [],
       }
    },
    methods: {
        processForm: function() {
            const vm = this;
            const station_id = this.station_id;
            const station_type = this.station_type;
            const entry_method = this.entry_method;
            const entry = this.class_id + this.student_id;
            let scan_data = new FormData();
            scan_data.append('station-id', station_id);
            scan_data.append('entryMethod', entry_method);
            scan_data.append('studentid', entry);
            scan_data.append('station_type', station_type);
            var axios = require("axios");
            axios({
                method: 'post',
                url: `${this.$parent.API_BASE_URL}/api/manual_entryv2`,
                data: scan_data,
                headers: {'Content-Type': 'multipart/form-data' }
            })
            .then(function (response) {
                vm.student_id = '';
                if(response.data.error){
                    document.body.classList.add('branding-not-ready');
                    vm.STATUS_TEXT = null;
                    vm.RESULT_NAME = response.data.errorMsg;
                    console.error(response.data.errorMsg);
                    setTimeout(() => {  vm.STATUS_TEXT = 'Please input your student ID with the keypad.'; document.body.classList.remove('branding-not-ready');vm.RESULT_NAME = null; vm.RESULT_CLASS = null;}, 2000);
                }
                if(!response.data.error && response.data.authorized){
                    document.body.classList.add('branding-success');
                    vm.STATUS_TEXT = null;
                    vm.RESULT_NAME = `Hello ${response.data.name}`;
                    vm.RESULT_CLASS = `Class name: ${response.data.classname}`;
                    setTimeout(() => {  vm.STATUS_TEXT = 'Please input your student ID with the keypad.'; document.body.classList.remove('branding-success'); vm.RESULT_NAME = null; vm.RESULT_CLASS = null; vm.$router.push({ path: 'scan' });}, 2000);
                }
            })
            .catch(function (response) {
                console.error(response);
            });
        }
    },
  created() {
    document.body.classList.remove('branding-ready');
    var axios = require("axios");
    const vm = this;
    axios
      .get(`${this.$parent.API_BASE_URL}/api/listClasses`)
      .then(function (response) {
          vm.CLASSES = response.data;
      })
      .catch(function (error) {
        console.log(error.message);
      });
  },
};
</script>