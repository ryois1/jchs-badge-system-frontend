import Vue from 'vue';
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import router from './router';
import axios from 'axios';
import VueAxios from 'vue-axios';
import * as Sentry from "@sentry/vue";
import { Integrations } from "@sentry/tracing";
import jchs_badge_system_client_app from './jchs_badge_system_client_app.vue';
import loader from "vue-ui-preloader";

Vue.use(VueAxios, axios);
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
Vue.use(loader);

Sentry.init({
  Vue,
  dsn: "https://d86eebde430543ac90e2dec845a9cdca@o358606.ingest.sentry.io/5626989",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});
new Vue({
  router,
  loader:loader,
  render: h => h(jchs_badge_system_client_app),
}).$mount('#app')