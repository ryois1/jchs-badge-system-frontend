<template>
<div :key="$route.fullPath" @contextmenu="handler($event)" id="jchs-badge-system-client-app">
    <loader v-show="showLoader" object="#ffffff" color1="#ffffff" color2="#17fd3d" size="3" speed="1" bg="#141414" objectbg="#000000" opacity="85" name="spinning"></loader>
    <globalNav :key="$route.fullPath"></globalNav>
    <router-view :key="$route.fullPath"></router-view>
    <heartbeat :key="$route.fullPath" v-if="ifNotSetup()"></heartbeat>
    <globalFooter :key="$route.fullPath" v-if="ifNotSetup()"></globalFooter>
</div>
</template>
<script>
import globalNav from "./components/global/navbar.vue";
import heartbeat from "./components/global/heartbeat.vue";
import globalFooter from "./components/global/footer.vue";
export default {
  name: "jchs-badge-system",
  data: function () {
    return {
      STATION_NAME: null,
      STATION_ID: null,
      STATION_TYPE: null,
      API_BASE_URL: "https://jchs-badge-system.cf",
      API_VERSION: "???",
      FRONTEND_VERSION: "1.0.11",
      STATION_IP: "???",
      showLoader: true,
      STATION_ONLINE: null,
    }
  },
  methods: {
    handler: function(e) {
      e.preventDefault();
    },
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
    globalFooter,
  },
  created() {
    const vm = this;
    const retrievedStationName = vm.getStoredStationName();
    vm.STATION_NAME = retrievedStationName;
    const retrievedStationID = vm.getStoredStationID();
    vm.STATION_ID = retrievedStationID;
    const retrievedStationType = vm.getStoredStationType();
    vm.STATION_TYPE = retrievedStationType;
  },
  mounted(){
    const vm = this;
    setTimeout(() => vm.showLoader = false, 500);
  },
  watch: {
    STATION_ONLINE: function() {
      if(!this.STATION_ONLINE){
        if(this.$router.history.current["path"] != "/offline"){
          this.$router.push({ path: '/offline' });
        }
      }else{
        if(this.$router.history.current["path"] == "/offline"){
          this.$router.push({ path: '/' });
        }
      }
    }
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
  height: 100vh;
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
    height: 100vh;
}
</style>