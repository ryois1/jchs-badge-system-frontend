<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="dark">
    <b-navbar-brand><b-img src="/JCLogo.png" width="30" alt="Jefferson County District Crest"></b-img> JCHS Badge System</b-navbar-brand>
    <b-collapse is-nav>
      <b-navbar-nav class="ml-auto">
        <b-button v-if="isNotKeypad()" variant="primary" href="/keypad">Forgot your badge?</b-button>
        <b-button v-if="isKeypad()" variant="primary" href="/scan">Back to barcode scanner</b-button>
        <h3 class="text-white" v-if="isExpress()">This station is barcode only</h3>
      </b-navbar-nav>
    </b-collapse>
  </b-navbar>
</div>
</template>
<script>
export default {
    methods: {
        isNotKeypad() {
            return this.$router.history.current["path"] == "/scan";
        },
        isKeypad() {
            return this.$router.history.current["path"] == "/keypad";
        },
        isExpress() {
            return this.$router.history.current["path"] == "/express";
        }
    },
    name: "navbar",
};
</script>
<style scoped>
.navbar.navbar-dark.bg-dark{
    background-color: #000000!important;
}
.name{
    color: #ffffff!important;
}
</style>