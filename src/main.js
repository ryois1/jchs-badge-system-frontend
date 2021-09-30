import Vue from 'vue';
import { BootstrapVue } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import jchs_badge_system_client_app from './jchs_badge_system_client_app.vue';

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);

new Vue({
  router,
  render: h => h(jchs_badge_system_client_app),
}).$mount('#app')
