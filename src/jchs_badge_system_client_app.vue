<template>
<div id="jchs-badge-system-client-app">
    <globalNav></globalNav>
    <router-view></router-view>
    <heartbeat v-if="ifNotSetup()"></heartbeat>
    <gloablFooter v-if="ifNotSetup()"></gloablFooter>
</div>
</template>

<script>
import globalNav from "./components/global/navbar.vue";
import heartbeat from "./components/global/heartbeat.vue";
import gloablFooter from "./components/global/footer.vue";
export default {
  name: "jchs-badge-system",
  data: function () {
    return {
      STATION_NAME: null,
      STATION_ID: null,
      STATION_TYPE: null,
      API_BASE_URL: "https://jchs-badge-system.cf",
      API_VERSION: "???",
      FRONTEND_VERSION: "1.0.1",
      STATION_IP: "???",
    }
  },
  methods: {
    ifNotSetup() {
      return this.$router.history.current["path"] != "/setup";
    },
    getStoredStationName() {
      const vm = this;
      const StoredStationName = localStorage.getItem('STATION_NAME')
      if (StoredStationName) {
        console.log(`Station Name: ${StoredStationName}`);
        return StoredStationName;
      } else {
        if(vm.$router.history.current["path"] != "/setup"){
          vm.$router.push({ path: 'setup' });
        }
      }
    },
    getStoredStationID() {
      const vm = this;
      const StoredStationID = localStorage.getItem('STATION_ID')
      if (StoredStationID) {
        console.log(`Station ID: ${StoredStationID}`);
        return StoredStationID;
      } else {
        if(vm.$router.history.current["path"] != "/setup"){
          vm.$router.push({ path: 'setup' });
        }
      }
    },
    getStoredStationType() {
      const vm = this;
      const StoredStationType = localStorage.getItem('STATION_TYPE')
      if (StoredStationType) {
        console.log(`Station Type: ${StoredStationType}`);
        return StoredStationType;
      } else {
        if(vm.$router.history.current["path"] != "/setup"){
          vm.$router.push({ path: 'setup' });
        }
      }
    }
  },
  components: {
    globalNav,
    heartbeat,
    gloablFooter,
  },
  created() {
    const vm = this;
    const retrievedStationName = vm.getStoredStationName();
    vm.STATION_NAME = retrievedStationName;
    const retrievedStationID = vm.getStoredStationID();
    vm.STATION_ID = retrievedStationID;
    const retrievedStationType = vm.getStoredStationType();
    vm.STATION_TYPE = retrievedStationType;
  }
}; 
</script>
<style>
#jchs-badge-system-client-app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
  overflow: hidden;
}
.branding-ready {
    background-color: #2E3191;
    overflow: hidden;
}
.branding-not-ready {
    background-color: #BE1E2D;
    overflow: hidden;
}
.branding-success {
    background-color: #006624;
    overflow: hidden;
}
html, body{
    overflow: hidden;
}
</style>
