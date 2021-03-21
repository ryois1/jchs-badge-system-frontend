<template>
<div>
<b-jumbotron>
<b-container class="bv-example-row text-center">
  <b-row>
    <b-col></b-col>
    <b-col>
        <h1>Station is Offline</h1>
    </b-col>
    <b-col></b-col>
  </b-row>
    <b-row>
    <b-col></b-col>
    <b-col>
        <h3>Trying to reconnect</h3>
        <div class="d-flex justify-content-center mb-3">
            <b-spinner style="width: 3rem; height: 3rem;" label="Loading..."></b-spinner>
        </div>
    </b-col>
    <b-col></b-col>
  </b-row>
</b-container>
</b-jumbotron>
</div>
</template>
<script>
export default {
    name: "offline",
    created() {
        document.body.classList.remove('branding-ready');
        document.body.classList.remove('branding-not-ready');
        document.body.classList.remove('branding-success');
    },
};
</script>
<style scoped>

</style>